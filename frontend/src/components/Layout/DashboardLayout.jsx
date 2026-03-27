import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Chatbot from '../Chatbot/Chatbot';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50/50">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto w-full relative">
        {/* Mobile Header logic could go here, but for now just use Outlet */}
        <main className="p-4 md:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8 z-10">
          <Outlet />
        </main>
        <Chatbot />
      </div>
    </div>
  );
};

export default DashboardLayout;
