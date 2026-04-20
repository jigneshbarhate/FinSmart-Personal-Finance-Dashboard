import React, { useContext, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import Chatbot from '../components/Chatbot/Chatbot';
import { AuthContext } from '../context/AuthContext';

export function DashboardLayout() {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      <div className="flex flex-1 flex-col w-full min-w-0">
        <Navbar toggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
      <Chatbot />
    </div>
  );
}

export default DashboardLayout;
