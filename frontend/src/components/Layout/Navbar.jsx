import { Link } from 'react-router-dom';
import { Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 relative p-1.5 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              FinSmart
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
            <Link to="/transactions" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Transactions</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
         <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 shadow-lg absolute w-full left-0">
          <div className="flex flex-col space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium p-2 rounded-lg hover:bg-gray-50">Home</Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium p-2 rounded-lg hover:bg-gray-50">Dashboard</Link>
            <Link to="/transactions" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium p-2 rounded-lg hover:bg-gray-50">Transactions</Link>
            <div className="h-px bg-gray-100 my-2"></div>
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-center text-gray-800 font-medium p-2 rounded-lg border border-gray-200">Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="text-center bg-blue-600 text-white font-medium p-2 rounded-lg shadow-md">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
