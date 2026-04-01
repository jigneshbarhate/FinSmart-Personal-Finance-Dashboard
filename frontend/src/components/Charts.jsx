import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export const FinancialCharts = ({ transactions }) => {
  // Compute data for charts based on transactions
  const { monthlyData, categoryData, savingsTrend } = useMemo(() => {
    const monthlyMap = {};
    const categoryMap = {};
    const savingsMap = {};
    let cumulativeSavings = 0;

    // Sort ascending for chronological processing
    const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedTx.forEach(tx => {
      const date = new Date(tx.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      // 1. Monthly Data
      if (!monthlyMap[monthYear]) {
        monthlyMap[monthYear] = { name: monthYear, income: 0, expense: 0 };
      }
      
      const amount = Number(tx.amount) || 0;
      if (tx.type === 'income') {
        monthlyMap[monthYear].income += amount;
        cumulativeSavings += amount;
      } else {
        monthlyMap[monthYear].expense += amount;
        cumulativeSavings -= amount;
        
        // 2. Category Data (expenses only)
        categoryMap[tx.category] = (categoryMap[tx.category] || 0) + amount;
      }

      // 3. Savings Trend
      savingsMap[monthYear] = cumulativeSavings;
    });

    return {
      monthlyData: Object.values(monthlyMap),
      categoryData: Object.entries(categoryMap).map(([name, value]) => ({ name, value })),
      savingsTrend: Object.entries(savingsMap).map(([name, savings]) => ({ name, savings }))
    };
  }, [transactions]);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500 min-h-[300px]">
        Not enough data for charts. Add some transactions!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Bar Chart - Monthly Income vs Expense */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
            <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Expense Categories */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-h-[300px] flex flex-col">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Expense Breakdown</h3>
        <div className="flex-1 flex items-center justify-center">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend className="text-xs" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-sm">No expenses recorded yet.</p>
          )}
        </div>
      </div>

      {/* Line Chart - Savings Trend */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Cumulative Savings</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={savingsTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Line type="monotone" dataKey="savings" name="Net Savings" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialCharts;
