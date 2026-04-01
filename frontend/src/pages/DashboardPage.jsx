import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import TransactionItem from '../components/TransactionItem';
import FinancialCharts from '../components/Charts';
import BudgetWidget from '../components/BudgetWidget';
import { DataContext } from '../context/DataContext';
import { Wallet, TrendingUp, TrendingDown, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { transactions, budgetSummary, loading } = useContext(DataContext);

  if (loading || !budgetSummary) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <span className="ml-3 text-lg font-medium text-navy tracking-tight">Loading Dashboard...</span>
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 4);
  const { totalIncome = 0, totalExpense = 0, savings = 0 } = budgetSummary;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back! Here's your financial overview for the current month.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-navy text-white hover:shadow-lg transition-shadow border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Net Savings</CardTitle>
            <Wallet size={16} className="text-gray-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${savings >= 0 ? savings.toFixed(2) : `(${Math.abs(savings).toFixed(2)})`}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp size={16} className="text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">${totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown size={16} className="text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">${totalExpense.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Render Dynamic Budget Tracking Widget */}
      <BudgetWidget />

      {/* Render Dynamic Financial Charts */}
      <div>
         <h2 className="text-xl font-bold tracking-tight text-navy mb-4">Financial Insights</h2>
         <FinancialCharts transactions={transactions} />
      </div>

      {/* Render Recent Transactions Feed */}
      <Card className="md:col-span-3 hover:shadow-md transition-shadow overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-white border-b border-gray-100">
          <CardTitle>Recent Transactions</CardTitle>
          <Link to="/transactions" className="text-sm text-primary font-medium flex items-center hover:underline group">
            View all <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </CardHeader>
        <CardContent className="p-0 bg-white">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx) => (
              <TransactionItem key={tx._id || tx.id} transaction={tx} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm border-t border-gray-50">
                No recent transactions found. Go to 'Transactions' to map your activities.
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
