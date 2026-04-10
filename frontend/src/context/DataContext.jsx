import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../api/axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [budgetSummary, setBudgetSummary] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Derived state
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Helper to fetch data
  const fetchData = useCallback(async () => {
    if (!user) {
      setTransactions([]);
      setBudgetSummary(null);
      setNotifications([]);
      return;
    }
    
    setLoading(true);
    try {
      // Create current month string YYYY-MM
      const now = new Date();
      const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      
      const [txRes, budgetRes, notifRes] = await Promise.all([
        api.get('/transactions'),
        api.get(`/budget?month=${monthStr}`),
        api.get('/notifications')
      ]);
      
      setTransactions(txRes.data);
      setBudgetSummary(budgetRes.data);
      setNotifications(notifRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load financial data');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Actions
  const addTransaction = async (txData) => {
    try {
      const { data } = await api.post('/transactions', txData);
      setTransactions([data, ...transactions]);
      // Refetch budget to update summary safely
      fetchData();
      toast.success('Transaction added');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add transaction');
      return false;
    }
  };

  const updateTransaction = async (id, txData) => {
    try {
      const { data } = await api.put(`/transactions/${id}`, txData);
      setTransactions(transactions.map((tx) => (tx._id === id ? data : tx)));
      fetchData();
      toast.success('Transaction updated');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update transaction');
      return false;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(transactions.filter((tx) => tx._id !== id));
      fetchData();
      toast.success('Transaction deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete transaction');
    }
  };

  const updateBudget = async (monthlyBudget) => {
    try {
      const now = new Date();
      const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const { data } = await api.post('/budget', { monthlyBudget, month: monthStr });
      fetchData();
      toast.success('Budget updated');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update budget');
      return false;
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read');
      setNotifications(notifications.map(n => ({...n, isRead: true})));
    } catch (error) {
      console.error('Failed to mark notifications as read', error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        transactions,
        budgetSummary,
        loading,
        fetchData,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        updateBudget,
        notifications,
        unreadCount,
        markAllAsRead
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
