import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getForecast, getRecommendations, getAqiAffectingAttributes } from '../../services/api';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FiTrendingUp, FiCpu, FiCheckCircle, FiPlus, FiAlertCircle } from 'react-icons/fi';
import { getAqiCategory } from '../../services/mockData';

export default function Forecast() {
  const { activeLocation } = useUser();
  const [forecastCombined, setForecastCombined] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [influencingFactors, setInfluencingFactors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states for Admin Policy Creator
  const [newPolicyName, setNewPolicyName] = useState('');
  const [newPolicyTarget, setNewPolicyTarget] = useState('Traffic Emissions');
  const [newPolicyReduction, setNewPolicyReduction] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fore = await getForecast(activeLocation.id);
        const rec = await getRecommendations(activeLocation.id);
        const factors = await getAqiAffectingAttributes(activeLocation.id);
        
        setForecastCombined(fore.combined || []);
        setRecommendations(rec);
        setInfluencingFactors(factors);
      } catch (err) {
        console.error("Failed to load forecast parameters", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeLocation]);

  // Handle mitigation checkbox triggers
  const handleToggleMitigation = (id) => {
    setRecommendations(prev =>
      prev.map(r => r.id === id ? { ...r, active: !r.active } : r)
    );
  };

  // Add custom admin policy
  const handleAddPolicy = (e) => {
    e.preventDefault();
    if (!newPolicyName.trim()) return;

    const newPolicy = {
      id: `custom-rec-${Date.now()}`,
      measure: newPolicyName,
      target: newPolicyTarget,
      impact: `Reduces overall AQI by estimated ${newPolicyReduction} points`,
      difficulty: "Admin Regulation Enforced",
      timeframe: "Next 6 hours",
      active: true,
      reductionVal: newPolicyReduction
    };

    setRecommendations(prev => [newPolicy, ...prev]);
    setNewPolicyName('');
  };

  // Calculate cumulative AQI drop based on active recommendations
  const totalImpact = recommendations
    .filter(r => r.active)
    .reduce((acc, r) => {
      if (r.reductionVal) return acc + r.reductionVal;
      const match = r.impact.match(/(\d+)-(\d+)|(\d+)/);
      if (match) {
        const val = match[2] ? parseInt(match[2]) : parseInt(match[1] || match[3]);
        return acc + val;
      }
      return acc + 10;
    }, 0);

  // Dynamically map forecast values offset by total active mitigations
  const mitigatedData = forecastCombined.map((d) => {
    const originalAqi = d.aqi;
    // Apply mitigations only to future hours
    const adjustedAqi = d.isFuture ? Math.max(45, originalAqi - totalImpact) : originalAqi;

    return {
      ...d,
      // Recharts lines split by isFuture
      historicAqi: d.isFuture ? null : adjustedAqi,
      futureAqi: d.isFuture ? adjustedAqi : null,
      // Connect curves smoothly by ensuring current hour is available in both series
      // Find boundary node (Time === "Now" or transition)
      boundaryAqi: d.time === "Now" ? adjustedAqi : null
    };
  });

  // Ensure historical series and forecast series are connected in Recharts
  const boundaryIndex = mitigatedData.findIndex(d => d.time === "Now" || d.isFuture === false && mitigatedData[d.time + 1]?.isFuture === true);
  if (boundaryIndex !== -1) {
    const boundaryVal = mitigatedData[boundaryIndex].historicAqi;
    mitigatedData[boundaryIndex].futureAqi = boundaryVal;
  }

  // Peak AQI prediction computation
  const peakAqi = Math.max(...forecastCombined.filter(d => d.isFuture).map(d => d.aqi));
  const peakIndex = forecastCombined.findIndex(d => d.aqi === peakAqi);
  const peakLabel = forecastCombined[peakIndex]?.time;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-maroon-800 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Compiling Predictive Models...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Predictive Modeling</span>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
          AQI Forecast & AI Recommendations
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Plot current trends against predictive future curves and run mitigative simulations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT PANEL: Recommendations + Policy Creator (Occupies 1 column) */}
        <div className="space-y-6">
          
          {/* AI Recommendations selector */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
              <FiCpu className="text-maroon-800" />
              AI Recommendation Engine
            </h3>
            <p className="text-xs text-gray-400 leading-normal">
              Toggle spatial recommendations to calculate predicted AQI reductions on the graph.
            </p>

            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id} 
                  onClick={() => handleToggleMitigation(rec.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3.5 text-xs leading-normal ${
                    rec.active 
                      ? 'bg-emerald-50/50 border-emerald-300 text-slate-800 shadow-sm' 
                      : 'bg-gray-50/60 border-gray-100 text-slate-500 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider block w-max ${
                        rec.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-slate-600'
                      }`}>
                        {rec.target}
                      </span>
                      <h4 className="font-bold text-slate-800 mt-2 leading-snug">{rec.measure}</h4>
                    </div>
                    {rec.active && <FiCheckCircle className="text-emerald-600 w-4 h-4 shrink-0 mt-0.5" />}
                  </div>

                  <div className="border-t border-gray-200/40 pt-2 text-[10px] flex justify-between font-medium">
                    <span>Impact:</span>
                    <span className={rec.active ? 'text-emerald-700 font-bold' : 'text-gray-400 font-semibold'}>{rec.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Creator Form */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight border-b border-gray-50 pb-3 flex items-center gap-1.5">
              <FiPlus className="text-maroon-800" />
              Add Mitigation Policy
            </h3>

            <form onSubmit={handleAddPolicy} className="space-y-3.5 text-xs font-semibold text-slate-600">
              <div className="space-y-1">
                <label>Policy Measure Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stop Boilers, Free Public Transport"
                  value={newPolicyName}
                  onChange={(e) => setNewPolicyName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3 py-2 outline-none font-medium text-slate-800 transition-all text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label>Target Sector</label>
                  <select
                    value={newPolicyTarget}
                    onChange={(e) => setNewPolicyTarget(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 outline-none font-semibold text-slate-600"
                  >
                    <option>Traffic Emissions</option>
                    <option>Industrial Output</option>
                    <option>Construction Activities</option>
                    <option>Waste Management</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label>AQI Reduction</label>
                  <input
                    type="number"
                    min="5"
                    max="80"
                    value={newPolicyReduction}
                    onChange={(e) => setNewPolicyReduction(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-1.5 font-mono text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-maroon-800 hover:bg-maroon-900 text-white font-bold py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FiPlus className="w-4 h-4" /> Add & Deploy Policy
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT PANEL: Forecast Graph, Influencing Factors, Explanation (Occupies 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recharts Dual-Colored Graph */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-50 pb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5">
                  <FiTrendingUp className="text-maroon-800" />
                  Dual-Colored AQI Forecast Trend
                </h3>
                <p className="text-[11px] text-gray-400 font-medium">Historical trend (<span className="text-blue-500 font-bold">Blue</span>) vs Predicted forecast (<span className="text-amber-500 font-bold">Gold</span>)</p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl px-3 py-1.5 text-xs text-emerald-800 font-bold">
                Mitigated Peak: {Math.max(45, peakAqi - totalImpact)} AQI
              </div>
            </div>

            {/* Recharts area chart showing split colors */}
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mitigatedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="historicGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="futureGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c59b27" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#c59b27" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1eded" />
                  <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const row = payload[0].payload;
                        const aqiVal = row.isFuture ? row.futureAqi : row.historicAqi;
                        return (
                          <div className="bg-white p-3 border border-maroon-100 rounded-xl shadow-xl space-y-1 text-xs">
                            <p className="text-gray-400 font-bold uppercase tracking-wider">{row.time}</p>
                            <p className={`font-bold ${row.isFuture ? 'text-amber-600' : 'text-blue-600'}`}>
                              {aqiVal} AQI ({row.isFuture ? 'Predicted' : 'Historical'})
                            </p>
                            {row.isFuture && (
                              <p className="text-slate-400 font-medium text-[10px]">Confidence: {row.confidence}%</p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {/* Historic Area (Blue) */}
                  <Area type="monotone" dataKey="historicAqi" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#historicGrad)" connectNulls />
                  {/* Future Area (Gold) */}
                  <Area type="monotone" dataKey="futureAqi" stroke="#c59b27" strokeWidth={3} fillOpacity={1} fill="url(#futureGrad)" connectNulls />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grid Row for Forecast Explanation & Influencing Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Forecast Explanation */}
            <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-3.5">
              <h4 className="font-bold text-slate-800 text-xs tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-2.5">
                <FiAlertCircle className="text-maroon-800" />
                Projection Methodology
              </h4>
              <p className="text-xs leading-relaxed text-slate-500 font-medium">
                Our forecasting engines process real-time spatial records utilizing multi-layer neural networks. 
                It integrates convective boundary layer predictions from meteorology feeds, local traffic congestion delays from GPS sensors, and industrial exhaust loads to map ambient particulate transitions.
              </p>
            </div>

            {/* Influencing Factors Card */}
            <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-3.5">
              <h4 className="font-bold text-slate-800 text-xs tracking-tight border-b border-gray-50 pb-2.5">
                AQI Primary Drivers
              </h4>
              <div className="space-y-2.5">
                {influencingFactors.map((factor, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-slate-600">
                      <span>{factor.name}</span>
                      <span className="font-mono text-slate-900">{factor.value}% weight</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-50 border rounded-full overflow-hidden">
                      <div className={`h-full ${factor.color || 'bg-maroon-800'}`} style={{ width: `${factor.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
