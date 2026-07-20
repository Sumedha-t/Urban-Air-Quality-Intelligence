import { useState } from 'react';
import { useUser } from '../../App';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiMapPin, FiShield, FiUser, FiLogOut, FiRefreshCw } from 'react-icons/fi';
import { mockAlerts } from '../../services/mockData';

export default function Header() {
  const { role, setRole, logout, currentLocationId, setCurrentLocationId, locations, activeLocation } = useUser();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleRoleToggle = (newRole) => {
    setRole(newRole);
    setShowProfileDropdown(false);
    navigate(newRole === 'admin' ? '/admin' : '/citizen');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-maroon-100 card-shadow px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand Emblem Logo Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-maroon-50 border border-maroon-200 text-maroon-800 font-serif font-bold text-lg shadow-sm">
          🇮🇳
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-wider uppercase font-semibold text-maroon-700 bg-maroon-50 px-1.5 py-0.5 rounded border border-maroon-100">
              GoI Smart City Portal
            </span>
            <span className="text-[10px] text-gray-500 font-mono">Decision Support</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight m-0 p-0 font-sans mt-0.5">
            Urban Air Quality <span className="text-maroon-800">Intelligence Platform</span>
          </h1>
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        {/* Active Location Dropdown Selector */}
        <div className="flex items-center gap-2 bg-cream-100 border border-maroon-200/40 rounded-xl px-3 py-1.5 text-sm">
          <FiMapPin className="text-maroon-700 animate-bounce" />
          <span className="font-semibold text-slate-700 hidden sm:inline">Active Site:</span>
          <select
            value={currentLocationId}
            onChange={(e) => setCurrentLocationId(e.target.value)}
            className="bg-transparent font-medium text-maroon-900 outline-none cursor-pointer pr-1"
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Alerts and Profile Widgets */}
        <div className="flex items-center gap-2">
          {/* Notifications Centre */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileDropdown(false);
              }}
              className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-slate-600 hover:text-maroon-800 hover:bg-maroon-50 transition-all relative"
            >
              <FiBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-maroon-700 text-[9px] font-bold text-white">
                {mockAlerts.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-maroon-100 shadow-xl py-3 px-4 z-50 animate-fade-in">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                  <h3 className="font-semibold text-slate-800 text-sm">Active Severe Alerts</h3>
                  <span className="text-xs text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded-full font-bold">
                    {mockAlerts.length} Live
                  </span>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="text-xs border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                          alert.level === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                          alert.level === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {alert.level}
                        </span>
                        <span className="text-gray-400 font-mono text-[9px]">{alert.time}</span>
                      </div>
                      <p className="font-medium text-slate-700 mb-0.5">{alert.type}</p>
                      <p className="text-gray-500 leading-tight">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile and Switcher dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 hover:bg-maroon-50 border border-gray-100 hover:border-maroon-200 transition-all text-left"
            >
              <div className="h-8 w-8 rounded-full bg-maroon-800 text-white flex items-center justify-center">
                {role === 'admin' ? <FiShield className="w-4 h-4" /> : <FiUser className="w-4 h-4" />}
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-slate-800">
                  {role === 'admin' ? "Admn. Officer" : "Citizen User"}
                </p>
                <p className="text-[9px] text-gray-500">Ministry Portal</p>
              </div>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-maroon-100 shadow-xl py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Switch Access Layer</p>
                </div>
                
                <button
                  onClick={() => handleRoleToggle('admin')}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-all ${
                    role === 'admin' ? 'bg-maroon-50 text-maroon-800 font-semibold' : 'text-slate-600 hover:bg-gray-50'
                  }`}
                >
                  <FiShield className="w-4 h-4 text-maroon-700" />
                  City Administrator
                </button>
                
                <button
                  onClick={() => handleRoleToggle('citizen')}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-all ${
                    role === 'citizen' ? 'bg-maroon-50 text-maroon-800 font-semibold' : 'text-slate-600 hover:bg-gray-50'
                  }`}
                >
                  <FiUser className="w-4 h-4 text-maroon-700" />
                  Citizen Portal
                </button>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition-all font-medium"
                >
                  <FiLogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
