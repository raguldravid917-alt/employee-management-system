import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Sidebar />
      <Topbar />
      <main className="pl-64 pt-16 h-screen overflow-auto bg-gray-50/30">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}