import { useState, useEffect } from 'react';
import { getPriorityRegions, getComplaints, voteComplaint, getAlerts } from '../../services/api';
import { FiAlertTriangle, FiMessageSquare, FiTrendingUp, FiBell, FiPlus, FiCheck } from 'react-icons/fi';
import { getAqiCategory, mockAlerts } from '../../services/mockData';

export default function PriorityDashboard() {
  const [priorityRegions, setPriorityRegions] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Alert Dispatch form state
  const [newAlertType, setNewAlertType] = useState('Severe Pollution Warning');
  const [newAlertLevel, setNewAlertLevel] = useState('WARNING');
  const [newAlertMessage, setNewAlertMessage] = useState('');
  const [newAlertScope, setNewAlertScope] = useState('');
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const regions = await getPriorityRegions();
        const comps = await getComplaints();
        setPriorityRegions(regions);
        setComplaints(comps);
      } catch (err) {
        console.error("Failed to load priority data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    setComplaints(prev =>
      prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
    );
  };

  const handleDispatchAlert = (e) => {
    e.preventDefault();
    if (!newAlertMessage.trim() || !newAlertScope.trim()) return;

    const newAlert = {
      id: `alert-${Date.now()}`,
      level: newAlertLevel,
      type: newAlertType,
      message: newAlertMessage,
      time: "Just now",
      scope: newAlertScope
    };

    mockAlerts.unshift(newAlert);
    setNewAlertMessage('');
    setNewAlertScope('');
    setDispatchSuccess(true);

    setTimeout(() => {
      setDispatchSuccess(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-maroon-800 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Loading Intervention Rank Tables...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Strategic Intervention</span>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
          Priority Dashboard & Alerts Center
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Deduce regions requiring immediate action based on pollution, citizen complaints, and voting weight.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Priority Rankings and Complaints (Col 1-2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Priority Rankings Table */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
              <FiTrendingUp className="text-maroon-800" />
              Urgent Regional Intervention Ranks
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-semibold text-slate-600 text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold">
                    <th className="py-2.5">Rank</th>
                    <th className="py-2.5">Location</th>
                    <th className="py-2.5">AQI</th>
                    <th className="py-2.5">Votes</th>
                    <th className="py-2.5 font-bold">Priority Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {priorityRegions.map((region) => {
                    const cat = getAqiCategory(region.aqi);
                    return (
                      <tr key={region.rank} className="hover:bg-gray-50/50">
                        <td className="py-3 font-bold text-slate-800">#{region.rank}</td>
                        <td className="py-3">
                          <p className="font-bold text-slate-700">{region.location}</p>
                          <p className="text-[10px] text-gray-400">{region.district} | {region.populationDensity.toLocaleString()} cap/km²</p>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cat.color}`}>
                            {region.aqi} {cat.label}
                          </span>
                        </td>
                        <td className="py-3 font-mono">{region.votesCount} upvotes</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-maroon-800 font-mono text-sm">{region.score}%</span>
                            <div className="h-1.5 w-16 bg-gray-100 border rounded-full overflow-hidden">
                              <div className="h-full bg-maroon-800" style={{ width: `${region.score}%` }}></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Citizen Complaints review board */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
              <FiMessageSquare className="text-maroon-800 animate-pulse" />
              Citizen Complaints Dispatcher
            </h3>

            <div className="space-y-4">
              {complaints.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl border border-gray-100 hover:border-maroon-100/40 bg-gray-50/40 flex flex-col md:flex-row gap-4 justify-between transition-all">
                  
                  {/* Text details */}
                  <div className="space-y-1.5 text-xs max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full font-bold text-[9px] bg-maroon-50 border border-maroon-100 text-maroon-800 uppercase">
                        {c.category}
                      </span>
                      <span className="text-gray-400 font-mono">{c.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm leading-snug">{c.location}</h4>
                    <p className="text-slate-600 leading-relaxed">{c.description}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Status: <span className="text-slate-700">{c.status}</span> ({c.votes} support votes)
                    </p>
                  </div>

                  {/* Actions column */}
                  <div className="flex flex-row md:flex-col justify-end md:justify-center items-end gap-2 shrink-0 border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
                    <button
                      onClick={() => handleUpdateStatus(c.id, "Pending Investigation")}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[10px] transition-all border ${
                        c.status.includes("Pending") 
                          ? 'bg-maroon-800 border-maroon-900 text-white shadow-sm' 
                          : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      Investigate
                    </button>
                    
                    <button
                      onClick={() => handleUpdateStatus(c.id, "Inspected & Warning Issued")}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[10px] transition-all border ${
                        c.status.includes("Inspected") 
                          ? 'bg-amber-600 border-amber-700 text-white shadow-sm' 
                          : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      Issue Warning
                    </button>
                    
                    <button
                      onClick={() => handleUpdateStatus(c.id, "Mitigated")}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[10px] transition-all border ${
                        c.status.includes("Mitigated") 
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm' 
                          : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      Close Issue
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Alerts Center composer (Col 3) */}
        <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4 h-max">
          <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
            <FiBell className="text-maroon-800" />
            Alert Dispatch Center
          </h3>

          <form onSubmit={handleDispatchAlert} className="space-y-4 text-xs font-semibold text-slate-600">
            {dispatchSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center gap-1.5 font-bold animate-pulse">
                <FiPlus /> Alert broadcasted successfully to all devices.
              </div>
            )}

            {/* Alert Type */}
            <div className="space-y-1">
              <label>Alert Type / Topic</label>
              <select
                value={newAlertType}
                onChange={(e) => setNewAlertType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none font-semibold text-slate-700 focus:ring-1 focus:ring-maroon-500"
              >
                <option>Severe Pollution Warning</option>
                <option>Industrial Safety Advisory</option>
                <option>Traffic Health Alert</option>
                <option>General Public Announcement</option>
              </select>
            </div>

            {/* Severity level */}
            <div className="space-y-1">
              <label>Incident Severity Level</label>
              <select
                value={newAlertLevel}
                onChange={(e) => setNewAlertLevel(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none font-semibold text-slate-700 focus:ring-1 focus:ring-maroon-500"
              >
                <option value="CRITICAL">CRITICAL (Red Banner)</option>
                <option value="WARNING">WARNING (Orange Banner)</option>
                <option value="INFO">INFORMATIONAL (Blue Banner)</option>
              </select>
            </div>

            {/* Area scope */}
            <div className="space-y-1">
              <label>Target Region Scope</label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Vihar, East Delhi or Outer Ring Road"
                value={newAlertScope}
                onChange={(e) => setNewAlertScope(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2.5 outline-none font-medium text-slate-700 transition-all text-xs"
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label>Broadcast Message Details</label>
              <textarea
                required
                rows={4}
                placeholder="Describe weather warnings, precautions, or mitigative restrictions enforced..."
                value={newAlertMessage}
                onChange={(e) => setNewAlertMessage(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2 outline-none font-medium text-slate-700 transition-all text-xs"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-maroon-800 hover:bg-maroon-900 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiBell />
              Broadcast Public Alert
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
