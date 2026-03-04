import { Settings, Bell } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-8 fixed top-0 right-0 left-[250px] z-10">
      <div></div> {/* Left space */}
      <div className="flex items-center space-x-5">
        
        {/* Settings Icon with Circle Border */}
        <button className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <Settings className="w-5 h-5" strokeWidth={1.5} />
        </button>
        
        {/* Notification Icon with Circle Border */}
        <button className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <Bell className="w-5 h-5" strokeWidth={1.5} />
        </button>
        
        {/* Profile Image */}
        <div className="w-[42px] h-[42px] rounded-full overflow-hidden border border-gray-200 cursor-pointer ml-2">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
        </div>
        
      </div>
    </header>
  );
}