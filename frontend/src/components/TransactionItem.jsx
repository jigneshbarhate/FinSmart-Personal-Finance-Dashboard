import React from 'react';
import { cn } from './Button';
import { ArrowUpRight, ArrowDownLeft, Receipt } from 'lucide-react';

export function TransactionItem({ transaction, className }) {
  const isCredit = transaction.type === 'Credit';
  
  return (
    <div className={cn("flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors", className)}>
      <div className="flex items-center space-x-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
          isCredit ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
        )}>
          {isCredit ? <ArrowUpRight size={20} className="stroke-[2.5]" /> : <ArrowDownLeft size={20} className="stroke-[2.5]" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">{transaction.category}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
            <span className="inline-flex items-center">
              <Receipt size={12} className="mr-1" />
              {transaction.type}
            </span>
            <span>•</span>
            <span>{new Date(transaction.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
      <div className={cn(
        "text-base font-bold tabular-nums tracking-tight",
        isCredit ? "text-primary" : "text-navy"
      )}>
        {isCredit ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  );
}

export default TransactionItem;
