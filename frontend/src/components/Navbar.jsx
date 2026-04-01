import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Menu, Bell, User, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { DataContext } from '../context/DataContext';

export function Navbar({ toggleSidebar }) {
  const { notifications, unreadCount, markAllAsRead } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      markAllAsRead();
    }
  };

  const getIcon = (type) => {
    if (type === 'success') return <CheckCircle2 size={16} className="text-emerald-500" />;
    if (type === 'warning') return <AlertTriangle size={16} className="text-red-500" />;
    return <Info size={16} className="text-blue-500" />;
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 shadow-sm md:px-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-gray-500 hover:text-navy focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1.5 transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
             <Wallet className="h-6 w-6 text-primary" />
          </div>
          <span className="hidden text-xl font-bold tracking-tight text-navy md:block">FinSmart</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="relative" ref={dropdownRef}>
          <button onClick={handleToggle} className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-full relative">
            <Bell size={20} className="stroke-[2.5]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring-2 ring-white text-[9px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {isOpen && (
             <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 transform opacity-100 scale-100 transition-all origin-top-right">
               <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100">
                 <h3 className="font-semibold text-navy text-sm">Notifications</h3>
               </div>
               <div className="max-h-80 overflow-y-auto">
                 {notifications && notifications.length > 0 ? (
                   notifications.map((notif) => (
                     <div key={notif._id} className={`px-4 py-3 border-b border-gray-50 flex gap-3 hover:bg-slate-50 transition-colors ${!notif.isRead ? 'bg-blue-50/30' : ''}`}>
                       <div className="mt-0.5">
                         {getIcon(notif.type)}
                       </div>
                       <div>
                         <p className="text-sm text-gray-700 leading-snug">{notif.message}</p>
                         <p className="text-xs text-gray-400 mt-1">
                           {new Date(notif.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                         </p>
                       </div>
                     </div>
                   ))
                 ) : (
                   <div className="px-4 py-8 text-center text-sm text-gray-500">
                     You have no new notifications.
                   </div>
                 )}
               </div>
             </div>
          )}
        </div>
        <Link to="/profile">
          <button className="h-8 w-8 overflow-hidden rounded-full bg-navy flex items-center justify-center ring-2 ring-transparent transition-all hover:ring-primary/30 shadow-md">
             <User size={16} className="text-white" />
          </button>
        </Link>
      </div>
    </header>
  );
}
