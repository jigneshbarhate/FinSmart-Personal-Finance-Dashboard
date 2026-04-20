import Transaction from '../models/Transaction.js';

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const netSavings = totalIncome - totalExpense;

    res.json({ totalIncome, totalExpense, netSavings, recentTransactions: transactions.slice(0, 5) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getSummary };
