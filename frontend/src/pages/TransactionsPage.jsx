import React, { useState } from 'react';
import { Card } from '../components/Card';
import Input from '../components/Input';
import { Search, Filter } from 'lucide-react';
import { mockTransactions } from '../utils/mockData';
import { cn } from '../components/Button';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredData = mockTransactions.filter(tx => {
    const matchesSearch = tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || tx.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-navy">Transactions</h1>
        <p className="text-gray-500 text-sm">View and manage your recent activity.</p>
      </div>

      <Card className="p-0 overflow-hidden border-0 shadow-sm">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          <div className="w-full sm:max-w-xs relative text-gray-500">
             <Input 
               placeholder="Search category..." 
               leftIcon={<Search size={16} />}
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <div className="w-full sm:w-auto flex items-center space-x-2">
            <div className="relative inline-flex items-center text-gray-500 w-full sm:w-auto">
              <Filter size={16} className="absolute left-3 z-10" />
              <select 
                className="h-10 pl-9 pr-8 w-full appearance-none rounded-lg border border-gray-200 bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Credit">Credits Only</option>
                <option value="Debit">Debits Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50/50 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? filteredData.map((tx) => {
                const isCredit = tx.type === 'Credit';
                return (
                  <tr key={tx.id} className="bg-white border-b border-gray-50 hover:bg-gray-50/80 transition-colors last:border-0">
                    <td className="px-6 py-4 font-medium text-navy">
                      {tx.category}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
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
                         isCredit ? "text-primary" : "text-navy"
                       )}>
                         {isCredit ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                       </span>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center text-gray-400">
                    <div className="mx-auto flex flex-col items-center">
                      <Search size={32} className="mb-2 opacity-20" />
                      <p>No transactions found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
