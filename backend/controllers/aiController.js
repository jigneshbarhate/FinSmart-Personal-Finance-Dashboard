import { GoogleGenAI } from '@google/genai';
import Transaction from '../models/Transaction.js';

// @desc    Get AI insights
// @route   POST /api/ai/chat
const getAiInsights = async (req, res) => {
  const { query } = req.body;
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return res.status(500).json({ message: 'Google Gemini API key not configured. The AI assistant currently requires a valid API key in the .env file.' });
  }

  try {
    const transactions = await Transaction.find({ user: req.user._id });
    
    // Convert to simplified format to decrease context window
    const simplifiedTransactions = transactions.map(t => ({
      amount: t.amount, type: t.type, category: t.category, date: t.date 
    }));
    
    const context = `
      You are FinSmart, a helpful AI personal financial assistant built by the developers of this FinSmart application. 
      You are integrated into the FinSmart dashboard as a chatbot.
      Here is the user's recent transaction data in JSON format: ${JSON.stringify(simplifiedTransactions)}.
      Based on this data, answer the following user query constructively. Keep your answer brief, concise, and helpful. Use markdown list formatting for readability if applicable.
    `;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: context }] },
        { role: 'user', parts: [{ text: query }] }
      ],
    });

    res.json({ message: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ message: 'Error communicating with AI service' });
  }
};

export { getAiInsights };
