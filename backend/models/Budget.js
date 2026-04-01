import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  monthlyBudget: { type: Number, required: true },
  month: { type: String, required: true } // format: 'YYYY-MM'
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
