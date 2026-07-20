import { NavLink } from 'react-router-dom';
import { useUser } from '../../App';
import { 
  FiGrid, FiMap, FiPieChart, FiCalendar, FiAlertTriangle, 
  FiMessageSquare, FiTrendingUp, FiHeart, FiShield, FiUser 
} from 'react-icons/fi';

export default function Sidebar() {
  const { role } = useUser();

  const adminLinks = [
    { to: "/admin", label: "Dashboard Home", icon: FiGrid, end: true },
    { to: "/admin/map", label: "Interactive GIS Map", icon: FiMap },
    { to: "/admin/attribution", label: "Source Attribution & AI", icon: FiPieChart },
    { to: "/admin/forecast", label: "AQI Forecast & Action", icon: FiCalendar },
    { to: "/admin/priority", label: "Priority Dashboard", icon: FiAlertTriangle }
  ];

  const citizenLinks = [
    { to: "/citizen", label: "Citizen Hub", icon: FiUser, end: true },
    { to: "/citizen/map", label: "Regional AQI Map", icon: FiMap },
    { to: "/citizen/report", label: "Report Pollution & Vote", icon: FiMessageSquare },
    { to: "/citizen/climate", label: "Climate Change Analysis", icon: FiTrendingUp },
    { to: "/citizen/health", label: "Health Profile & AI Assistant", icon: FiHeart }
  ];

  const links = role === 'admin' ? adminLinks : citizenLinks;

  return (
    <aside className="w-full md:w-64 bg-white border-r border-maroon-100 flex flex-col justify-between shrink-0 p-4">
      <div className="space-y-6">
        {/* Role Identity Display card */}
        <div className={`p-4 rounded-2xl border transition-all ${
          role === 'admin' 
            ? 'bg-maroon-50/50 border-maroon-100 text-maroon-900' 
            : 'bg-emerald-50/40 border-emerald-100 text-emerald-900'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl text-white ${
              role === 'admin' ? 'bg-maroon-800' : 'bg-emerald-600'
            }`}>
              {role === 'admin' ? <FiShield className="w-4 h-4" /> : <FiUser className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Access Layer</p>
              <h2 className="text-sm font-bold m-0 p-0 font-sans leading-none mt-1">
                {role === 'admin' ? "City Administrator" : "Citizen Portal"}
              </h2>
            </div>
          </div>
        </div>

        {/* Navigation Link list */}
        <nav className="flex flex-col gap-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    isActive 
                      ? 'bg-maroon-50 border-maroon-100/70 text-maroon-800 font-semibold shadow-sm' 
                      : 'border-transparent text-slate-600 hover:text-maroon-800 hover:bg-maroon-50/40 hover:border-maroon-50/30'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Government Smart City Notice */}
      <div className="mt-8 pt-4 border-t border-gray-100 text-[10px] text-gray-400 space-y-1.5 hidden md:block">
        <p className="font-semibold text-slate-500 uppercase tracking-wide">National Informatics Centre</p>
        <p className="leading-relaxed">This dashboard hosts spatial datasets aligned with national environment directives. Data feeds are powered by Central Pollution Control Board (CPCB).</p>
        <div className="flex gap-2 font-medium text-slate-500 mt-2">
          <a href="#/privacy" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#/terms" className="hover:underline">T&C</a>
        </div>
      </div>
    </aside>
  );
}
