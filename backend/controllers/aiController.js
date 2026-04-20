import Transaction from '../models/Transaction.js';
import ChatMessage from '../models/ChatMessage.js';

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
const getChatHistory = async (req, res) => {
  try {
    const history = await ChatMessage.find({ userId: req.user._id }).sort({ createdAt: 1 });
    res.json(history);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Failed to load chat history' });
  }
};

// @desc    Get AI insights
// @route   POST /api/chat
const getAiInsights = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: 'Query is required.' });
  }

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return res.status(500).json({ message: 'Google Gemini API key not configured.' });
  }

  try {
    // Save user message to history
    await ChatMessage.create({
      userId: req.user._id,
      role: 'user',
      content: query
    });

    const transactions = await Transaction.find({ userId: req.user._id });

    let totalIncome = 0;
    let totalExpense = 0;
    const categoriesMap = {};
    const monthlyTrendsMap = {};

    transactions.forEach(t => {
      const amount = Number(t.amount);
      if (t.type === 'income') {
        totalIncome += amount;
      } else {
        totalExpense += amount;
        categoriesMap[t.category] = (categoriesMap[t.category] || 0) + amount;
      }
      
      const date = new Date(t.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyTrendsMap[monthYear]) {
        monthlyTrendsMap[monthYear] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        monthlyTrendsMap[monthYear].income += amount;
      } else {
        monthlyTrendsMap[monthYear].expense += amount;
      }
    });

    const categories = Object.keys(categoriesMap).map(category => ({
      category,
      amount: categoriesMap[category]
    }));

    const monthlyTrends = Object.keys(monthlyTrendsMap)
      .sort((a, b) => a.localeCompare(b))
      .map(month => ({
        month,
        income: monthlyTrendsMap[month].income,
        expense: monthlyTrendsMap[month].expense
      }));

    const userData = {
      totalIncome,
      totalExpense,
      categories,
      monthlyTrends
    };

    const promptText = `You are a financial assistant. Analyze the user's financial data and provide insights.

User Data:
${JSON.stringify(userData, null, 2)}

User Question:
${query}

Provide a clear, helpful, and actionable response.`;

    // Try primary model, fall back to lite on overload
    const tryGemini = async (model) => {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });
    };

    let geminiResponse = await tryGemini('gemini-2.5-flash');

    // If primary model is overloaded, retry with lite variant
    if (geminiResponse.status === 503) {
      console.warn('gemini-2.5-flash overloaded, falling back to gemini-2.5-flash-lite...');
      geminiResponse = await tryGemini('gemini-2.5-flash-lite');
    }

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error('Gemini API Error Response:', errorData);
      const userMessage = geminiResponse.status === 503
        ? "The AI is currently busy. Please try again in a moment."
        : "I'm having trouble fetching your data. Please try again.";
      return res.status(500).json({ message: userMessage });
    }

    const responseData = await geminiResponse.json();
    
    let answer = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!answer) {
      answer = "I'm having trouble analyzing your financial data right now. Please try again.";
    }

    // Save AI response to history
    await ChatMessage.create({
      userId: req.user._id,
      role: 'ai',
      content: answer
    });

    res.json({ message: answer });

  } catch (error) {
    console.error('AI Proxy Route Error:', error);
    res.status(500).json({ message: "I'm having trouble fetching your data. Please try again." });
  }
};

export { getAiInsights, getChatHistory };
