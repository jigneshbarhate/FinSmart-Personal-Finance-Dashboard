import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

const BudgetWidget = () => {
  const { budgetSummary, updateBudget } = useContext(DataContext);
  const [editing, setEditing] = useState(false);
  const [newBudget, setNewBudget] = useState('');

  if (!budgetSummary) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
        <span className="text-gray-400">Loading Budget...</span>
      </div>
    );
  }

  const { monthlyBudget, totalExpense } = budgetSummary;
  
  const percentage = monthlyBudget > 0 ? (totalExpense / monthlyBudget) * 100 : 0;
  const isOverBudget = percentage > 100;

  const handleSaveBudget = (e) => {
    e.preventDefault();
    if (newBudget > 0) {
      updateBudget(Number(newBudget));
      setEditing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-navy">Monthly Budget</h3>
          <p className="text-sm text-gray-500">Track your spending limit.</p>
        </div>
        {!editing ? (
          <button 
            onClick={() => { setEditing(true); setNewBudget(monthlyBudget || ''); }} 
            className="text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            Edit Limit
          </button>
        ) : (
          <button onClick={() => setEditing(false)} className="text-xs font-medium text-gray-500 hover:text-gray-700">Cancel</button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSaveBudget} className="flex gap-2">
          <input 
            type="number" 
            value={newBudget} 
            onChange={(e) => setNewBudget(e.target.value)} 
            placeholder="e.g. 5000"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            autoFocus
          />
          <button type="submit" className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            Save
          </button>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-3xl font-extrabold text-navy">${totalExpense.toFixed(2)}</span>
              <span className="text-gray-400 ml-1 text-sm font-medium">/ ${monthlyBudget.toFixed(2)}</span>
            </div>
            <span className={`text-sm font-bold ${isOverBudget ? 'text-red-600' : 'text-emerald-600'}`}>
              {percentage.toFixed(1)}% Used
            </span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-3 mb-1 overflow-hidden">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ease-out ${isOverBudget ? 'bg-red-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          {isOverBudget && (
            <p className="text-xs text-red-500 mt-2 font-medium">You have exceeded your monthly budget!</p>
          )}
        </>
      )}
    </div>
  );
};

export default BudgetWidget;
