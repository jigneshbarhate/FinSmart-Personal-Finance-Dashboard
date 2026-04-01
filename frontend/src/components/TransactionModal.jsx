import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TRANSACTION_CATEGORIES = [
  'Food & Dining', 'Housing', 'Transportation', 'Utilities',
  'Healthcare', 'Entertainment', 'Shopping', 'Salary', 'Investment', 'Other'
];

export const TransactionModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: 'Food & Dining',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Re-populate data when opening modal with initialData (editing mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount,
        type: initialData.type,
        category: initialData.category || 'Other',
        notes: initialData.notes || '',
        date: new Date(initialData.date).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        amount: '',
        type: 'expense',
        category: 'Food & Dining',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold tracking-tight text-navy">
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex gap-4 p-1 bg-gray-100/80 rounded-lg">
            <label className="flex-1 cursor-pointer">
              <input type="radio" name="type" value="expense" checked={formData.type === 'expense'} onChange={handleChange} className="sr-only" />
              <div className={`text-center py-2 text-sm font-semibold rounded-md transition-colors ${formData.type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                Expense
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input type="radio" name="type" value="income" checked={formData.type === 'income'} onChange={handleChange} className="sr-only" />
              <div className={`text-center py-2 text-sm font-semibold rounded-md transition-colors ${formData.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                Income
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input type="number" name="amount" required step="0.01" value={formData.amount} onChange={handleChange} placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                {TRANSACTION_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="Dinner at Joe's" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors cursor-pointer">
              {initialData ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
