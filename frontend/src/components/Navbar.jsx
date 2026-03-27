import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Menu, Bell, User } from 'lucide-react';

export function Navbar({ toggleSidebar }) {
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
        <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-primary/5 rounded-full relative">
          <Bell size={20} className="stroke-[2.5]" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <button className="h-8 w-8 overflow-hidden rounded-full bg-navy-light flex items-center justify-center ring-2 ring-transparent transition-all hover:ring-primary/30">
           <User size={16} className="text-white" />
        </button>
      </div>
    </header>
  );
}
