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

      {/* Clean minimal footer */}
      <footer className="w-full bg-slate-900 py-4 px-8 text-center text-slate-500 text-[10px]">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <p>© 2026 Urban Air Quality Intelligence Platform. Decision Support System.</p>
        </div>
      </footer>
    </div>
  );
}
