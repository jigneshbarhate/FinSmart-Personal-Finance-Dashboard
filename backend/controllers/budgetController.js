import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';

// @desc    Set or update monthly budget
// @route   POST /api/budget
// @access  Private
export const setBudget = async (req, res, next) => {
  try {
    const { monthlyBudget, month } = req.body;

    if (!monthlyBudget || !month) {
      res.status(400);
      return next(new Error('Please provide monthlyBudget and month (YYYY-MM)'));
    }

    // Check if budget for the month exists for user
    let budget = await Budget.findOne({ userId: req.user._id, month });

    if (budget) {
      budget.monthlyBudget = monthlyBudget;
      await budget.save();
    } else {
      budget = await Budget.create({
        userId: req.user._id,
        monthlyBudget,
        month,
      });
    }

    res.status(200).json(budget);
  } catch (error) {
    next(error);
  }
};

// @desc    Get budget summary
// @route   GET /api/budget?month=YYYY-MM
// @access  Private
export const getBudgetSummary = async (req, res, next) => {
  try {
    const { month } = req.query;

    if (!month) {
      res.status(400);
      return next(new Error('Please provide month query parameter (YYYY-MM)'));
    }

    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setUTCMonth(endDate.getUTCMonth() + 1);

    // Get Budget
    const budget = await Budget.findOne({ userId: req.user._id, month });
    const monthlyBudget = budget ? budget.monthlyBudget : 0;

    // MongoDB Aggregation to get Total Income and Total Expense
    const summary = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user._id),
          date: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    summary.forEach(item => {
      if (item._id === 'income') totalIncome = item.totalAmount;
      if (item._id === 'expense') totalExpense = item.totalAmount;
    });

    const savings = totalIncome - totalExpense;

    res.status(200).json({
      month,
      monthlyBudget,
      totalIncome,
      totalExpense,
      savings,
    });
  } catch (error) {
    next(error);
  }
};
