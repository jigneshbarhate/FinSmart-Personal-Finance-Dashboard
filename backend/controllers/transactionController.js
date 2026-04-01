import Transaction from '../models/Transaction.js';
import Notification from '../models/Notification.js';
import Budget from '../models/Budget.js';

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
// Filters support: ?category=food&type=expense&month=2023-10
export const getTransactions = async (req, res, next) => {
  try {
    const { category, type, month } = req.query;
    
    // Base query for the logged-in user
    let query = { userId: req.user._id };

    // Apply category filter
    if (category) {
      query.category = category;
    }

    // Apply type filter
    if (type) {
      query.type = type;
    }

    // Apply month filter
    if (month) {
      // Month should come in YYYY-MM format
      const startDate = new Date(`${month}-01T00:00:00.000Z`);
      const endDate = new Date(startDate);
      endDate.setUTCMonth(endDate.getUTCMonth() + 1);

      query.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
export const getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      return next(new Error('Transaction not found'));
    }

    // Check for user ownership
    if (transaction.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      return next(new Error('User not authorized for this transaction'));
    }

    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a transaction
// @route   POST /api/transactions
// @access  Private
export const addTransaction = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category) {
      res.status(400);
      return next(new Error('Please include amount, type, and category'));
    }

    const transaction = await Transaction.create({
      amount,
      type,
      category,
      date: date || new Date(),
      notes,
      userId: req.user._id,
    });

    // --- AUTOMATED NOTIFICATION ENGINE ---
    try {
      if (type === 'expense') {
        const now = date ? new Date(date) : new Date();
        const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        
        const currentBudget = await Budget.findOne({ userId: req.user._id, month: monthStr });
        if (currentBudget && currentBudget.monthlyBudget > 0) {
          const startDate = new Date(`${monthStr}-01T00:00:00.000Z`);
          const endDate = new Date(startDate);
          endDate.setUTCMonth(endDate.getUTCMonth() + 1);

          const currentExpenses = await Transaction.aggregate([
            { $match: { userId: req.user._id, type: 'expense', date: { $gte: startDate, $lt: endDate } } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
          ]);

          const totalExp = currentExpenses[0] ? currentExpenses[0].total : 0;
          const limit = currentBudget.monthlyBudget;
          
          if (totalExp >= limit) {
             await Notification.create({
               userId: req.user._id,
               message: `⚠️ Alert: You have exceeded your monthly budget of $${limit}!`,
               type: 'warning'
             });
          } else if ((totalExp / limit) >= 0.90) {
             await Notification.create({
               userId: req.user._id,
               message: `⚠️ Warning: You have used over 90% of your monthly budget.`,
               type: 'warning'
             });
          }
        }
      } else if (type === 'income') {
        await Notification.create({
          userId: req.user._id,
          message: `🎉 Great job! You just recorded $${amount} of incoming funds.`,
          type: 'success'
        });
      }
    } catch (notifErr) {
      console.error('Failed to trigger notification:', notifErr);
    }
    // --- END NOTIFICATION ENGINE ---

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      return next(new Error('Transaction not found'));
    }

    // Check for user ownership
    if (transaction.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      return next(new Error('User not authorized for this transaction'));
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTransaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      return next(new Error('Transaction not found'));
    }

    // Check for user ownership
    if (transaction.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      return next(new Error('User not authorized for this transaction'));
    }

    await transaction.deleteOne();

    res.json({ id: req.params.id, message: 'Transaction deleted' });
  } catch (error) {
    next(error);
  }
};
