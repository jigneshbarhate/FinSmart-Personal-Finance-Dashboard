import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { mockSummary, mockTransactions } from '../utils/mockData';
import TransactionItem from '../components/TransactionItem';
import { Wallet, TrendingUp, TrendingDown, ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const recentTransactions = mockTransactions.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, John! Here's your financial overview.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-navy text-white hover:shadow-lg transition-shadow border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Balance</CardTitle>
            <Wallet size={16} className="text-gray-300" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${mockSummary.totalBalance.toFixed(2)}</div>
            <p className="text-xs text-primary mt-1 flex items-center font-medium">
              <TrendingUp size={12} className="mr-1 stroke-[3]" /> +2.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp size={16} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">${mockSummary.monthlyIncome.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Expected $5,500.00</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown size={16} className="text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">${mockSummary.monthlyExpenses.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Safe zone limits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 flex flex-col hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Cash Flow</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px] flex items-center justify-center border border-dashed border-gray-200 rounded-xl m-6 mt-0 bg-gray-50/50">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto text-gray-300 mb-3 stroke-[1.5]" />
              <p className="text-gray-500 font-medium">Chart visualization placeholder</p>
              <p className="text-xs text-gray-400">Add Recharts or Chart.js here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Link to="/transactions" className="text-sm text-primary font-medium flex items-center hover:underline group">
              View all <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
             {recentTransactions.map((tx) => (
                <TransactionItem key={tx.id} transaction={tx} />
             ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
