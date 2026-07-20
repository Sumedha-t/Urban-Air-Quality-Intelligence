import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fcfcfb]">
      {/* Persistent Header */}
      <Header />

      {/* Workspace Flex Wrapper */}
      <div className="flex flex-col md:flex-row flex-1 w-full max-w-[1600px] mx-auto">
        {/* Sidebar Panel */}
        <Sidebar />

        {/* Scrollable Main Content panel */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto space-y-6 fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* National Portal footer block */}
      <footer className="w-full bg-slate-900 border-t border-slate-800 py-6 px-8 text-center text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Ministry of Environment, Forest & Climate Change. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#/admin" className="hover:text-white hover:underline transition-colors">CPCB Portal</a>
            <a href="#/admin" className="hover:text-white hover:underline transition-colors">Digital India</a>
            <a href="#/admin" className="hover:text-white hover:underline transition-colors">National Clean Air Programme (NCAP)</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
