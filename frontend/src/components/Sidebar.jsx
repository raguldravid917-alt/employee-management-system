import { LayoutGrid, Users, Calendar, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="w-[250px] h-screen bg-[#F8F9FB] border-r border-gray-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="h-[70px] flex items-center px-6 border-b border-gray-200 bg-white">
        <h1 className="text-[#007BFF] font-bold text-[22px] tracking-wider">RS-TECH</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link to="#" className="flex items-center px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-[15px] font-medium rounded-lg transition-colors">
          <LayoutGrid className="w-[20px] h-[20px] mr-3" strokeWidth={2} /> Dashboard
        </Link>
        <Link to="/" className={`flex items-center px-4 py-3 text-[15px] font-medium rounded-lg transition-colors ${isActive('/') ? 'bg-[#007BFF] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
          <Users className="w-[20px] h-[20px] mr-3" strokeWidth={2} /> Employee
        </Link>
        <Link to="#" className="flex items-center px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-[15px] font-medium rounded-lg transition-colors">
          <Calendar className="w-[20px] h-[20px] mr-3" strokeWidth={2} /> Calendar
        </Link>
        <Link to="#" className="flex items-center px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-[15px] font-medium rounded-lg transition-colors">
          <MessageSquare className="w-[20px] h-[20px] mr-3" strokeWidth={2} /> Messages
        </Link>
      </nav>
    </div>
  );
}