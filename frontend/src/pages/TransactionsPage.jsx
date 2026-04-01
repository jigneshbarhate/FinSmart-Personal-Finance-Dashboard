import React, { useState, useContext } from 'react';
import { Card } from '../components/Card';
import Input from '../components/Input';
import { Search, Filter, Plus, Pencil, Trash2 } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import { TransactionModal } from '../components/TransactionModal';
import { cn } from '../components/Button';

export default function TransactionsPage() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useContext(DataContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Filter existing fetched array dynamically locally
  const filteredData = transactions.filter(tx => {
    const matchesSearch = tx.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (tx.notes && tx.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const normalizedType = tx.type.toLowerCase();
    const normalizedFilter = filterType.toLowerCase();
    const matchesFilter = filterType === 'All' || normalizedType === normalizedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tx) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleModalSubmit = async (formData) => {
    // Determine payload based on API schema (amount, type, category, date, notes)
    const payload = {
      ...formData,
      amount: Number(formData.amount)
    };

    let success = false;
    if (editingTransaction) {
      success = await updateTransaction(editingTransaction._id, payload);
    } else {
      success = await addTransaction(payload);
    }

    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">Transactions</h1>
          <p className="text-gray-500 text-sm">View and manage your financial activity.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" /> Add Transaction
        </button>
      </div>

      <Card className="p-0 overflow-hidden border border-gray-100 shadow-sm">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          <div className="w-full sm:max-w-xs relative text-gray-500">
             <Input 
               placeholder="Search category or notes..." 
               leftIcon={<Search size={16} />}
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <div className="w-full sm:w-auto flex items-center space-x-2">
            <div className="relative inline-flex items-center text-gray-500 w-full sm:w-auto">
              <Filter size={16} className="absolute left-3 z-10" />
              <select 
                className="h-10 pl-9 pr-8 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="income">Credits Only</option>
                <option value="expense">Debits Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white min-h-[400px]">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-500 bg-gray-50 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? filteredData.map((tx) => {
                const isCredit = tx.type === 'income';
                return (
                  <tr key={tx._id} className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0 group">
                    <td className="px-6 py-4 font-medium text-navy">
                      {tx.category}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-gray-400 max-w-[200px] truncate">
                      {tx.notes || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-semibold border",
                        isCredit ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"
                      )}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className={cn(
                         "font-bold tabular-nums",
                         isCredit ? "text-emerald-600" : "text-navy"
                       )}>
                         {isCredit ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => handleOpenEdit(tx)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition" title="Edit">
                           <Pencil size={16} />
                         </button>
                         <button onClick={() => handleDelete(tx._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition" title="Delete">
                           <Trash2 size={16} />
                         </button>
                       </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-gray-400">
                    <div className="mx-auto flex flex-col items-center">
                      <Search size={32} className="mb-2 opacity-20" />
                      <p>No transactions found matching your criteria.</p>
                      <button onClick={handleOpenAdd} className="mt-4 text-blue-600 hover:underline">Create One</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Render the unified Add/Edit Modal */}
      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingTransaction}
      />
    </div>
  );
}
