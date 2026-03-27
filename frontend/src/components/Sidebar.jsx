import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, User as UserIcon, X, LogOut, Wallet } from 'lucide-react';
import { cn } from './Button';

export function Sidebar({ isOpen, closeSidebar }) {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Transactions', path: '/transactions', icon: ListOrdered },
    { label: 'Profile', path: '/profile', icon: UserIcon },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-navy/20 backdrop-blur-sm transition-opacity md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
        aria-hidden="true"
      />
      
      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out md:static md:translate-x-0 flex flex-col shadow-xl md:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 md:hidden border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-navy">FinSmart</span>
          </div>
          <button 
            onClick={closeSidebar} 
            className="p-1.5 rounded-md text-gray-500 hover:text-navy hover:bg-gray-100 transition-colors"
          >
             <X size={20} />
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto mt-4 px-3 space-y-1">
          <div className="mb-4 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main Menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) => cn(
                  "flex items-center space-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary hover:bg-primary/20 shadow-sm" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-navy"
                )}
              >
                <item.icon size={20} className={cn("stroke-[2.5]")} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
           <NavLink 
             to="/"
             onClick={closeSidebar}
             className="flex items-center space-x-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors group"
           >
             <LogOut size={20} className="stroke-[2.5] group-hover:text-red-500" />
             <span>Log out</span>
           </NavLink>
        </div>
      </aside>
    </>
  );
}
