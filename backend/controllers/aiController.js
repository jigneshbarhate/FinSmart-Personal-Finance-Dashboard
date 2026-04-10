import Transaction from '../models/Transaction.js';

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

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: promptText }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error Response:', errorData);
      return res.status(500).json({ message: 'I’m having trouble fetching your data. Please try again.' });
    }

    const data = await response.json();
    
    let answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!answer) {
       answer = "I'm having trouble analyzing your financial data right now. Please try again.";
    }

    res.json({ message: answer });

  } catch (error) {
    console.error('AI Proxy Route Error:', error);
    res.status(500).json({ message: 'I’m having trouble fetching your data. Please try again.' });
  }
};

export { getAiInsights };
