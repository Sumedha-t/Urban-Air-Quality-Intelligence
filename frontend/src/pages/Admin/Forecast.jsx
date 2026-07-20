import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getForecast, getRecommendations } from '../../services/api';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FiCalendar, FiClock, FiCpu, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { getAqiCategory } from '../../services/mockData';

export default function Forecast() {
  const { activeLocation } = useUser();
  const [forecast, setForecast] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Forecast tab selectors
  const [forecastTab, setForecastTab] = useState('24h'); // '24h' or '3d' or '7d'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fore = await getForecast(activeLocation.id);
        const rec = await getRecommendations(activeLocation.id);
        setForecast(fore);
        setRecommendations(rec);
      } catch (err) {
        console.error("Failed to load forecast parameters", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeLocation]);

  // Handle mitigation trigger mockups
  const handleToggleMitigation = (id) => {
    setRecommendations(prev =>
      prev.map(r => r.id === id ? { ...r, active: !r.active } : r)
    );
  };

  if (loading || !forecast) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-maroon-800 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Compiling Neural Forecast Models...</p>
      </div>
    );
  }

  // Pick dataset based on tab
  const data = 
    forecastTab === '24h' ? forecast.hourly :
    forecastTab === '3d' ? forecast.threeDays : forecast.sevenDays;

  const xAxisKey = forecastTab === '24h' ? 'time' : 'day';

  // Calculate simulated net mitigation impact
  const totalImpact = recommendations
    .filter(r => r.active)
    .reduce((acc, r) => {
      const match = r.impact.match(/(\d+)-(\d+)|(\d+)/);
      if (match) {
        const val = match[2] ? parseInt(match[2]) : parseInt(match[1] || match[3]);
        return acc + val;
      }
      return acc + 10; // Default fallback
    }, 0);

  // Peak AQI prediction computation
  const peakAqi = Math.max(...data.map(d => d.aqi));
  const peakIndex = data.findIndex(d => d.aqi === peakAqi);
  const peakLabel = data[peakIndex]?.[xAxisKey];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Predictive Modeling</span>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
          AQI Forecast & AI Recommendations
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Multi-day predictive modeling utilizing atmospheric dynamics, weather feeds, and historical patterns.
        </p>
      </div>

      {/* Main Forecast Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Forecast charts and details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart block */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-5">
            
            {/* Header & Tabs */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50 pb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5">
                  <FiTrendingUp className="text-maroon-800" />
                  Simulated AQI Projection Trend
                </h3>
                <p className="text-[11px] text-gray-400 font-medium">Predicted values with model confidence boundaries</p>
              </div>

              <div className="flex bg-gray-50 border border-gray-200/50 rounded-xl p-1 text-xs font-semibold self-stretch sm:self-auto justify-between">
                <button
                  onClick={() => setForecastTab('24h')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${forecastTab === '24h' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  24h Hourly
                </button>
                <button
                  onClick={() => setForecastTab('3d')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${forecastTab === '3d' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  3-Days
                </button>
                <button
                  onClick={() => setForecastTab('7d')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${forecastTab === '7d' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  7-Days
                </button>
              </div>
            </div>

            {/* Peak and impact info cards */}
            <div className="grid grid-cols-2 gap-4 text-xs font-medium">
              <div className="bg-maroon-50/20 border border-maroon-100/35 rounded-2xl p-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Projected Peak AQI</p>
                <p className="text-2xl font-black text-slate-800 mt-1 leading-none">
                  {peakAqi} <span className="text-xs font-normal text-gray-400">at {peakLabel}</span>
                </p>
                <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase mt-2.5 ${getAqiCategory(peakAqi).color}`}>
                  {getAqiCategory(peakAqi).label}
                </span>
              </div>
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Simulated Policy Mitigation</p>
                <p className="text-2xl font-black text-emerald-800 mt-1 leading-none">
                  -{totalImpact} <span className="text-xs font-normal text-emerald-600/70">AQI points</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-2.5">
                  Triggered by {recommendations.filter(r => r.active).length} active policies.
                </p>
              </div>
            </div>

            {/* Recharts chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c59b27" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#c59b27" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1eded" />
                  <XAxis dataKey={xAxisKey} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 'auto']} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const aqiVal = payload[0].value;
                        const confVal = payload[0].payload.confidence;
                        return (
                          <div className="bg-white p-3 border border-maroon-100 rounded-xl shadow-xl space-y-1 text-xs">
                            <p className="text-gray-400 font-bold uppercase tracking-wider">{payload[0].payload[xAxisKey]}</p>
                            <p className="font-bold text-slate-800">{aqiVal} AQI (Forecast)</p>
                            <p className="text-slate-500 font-mono">Confidence index: {confVal}%</p>
                            {payload[0].payload.peakHour && (
                              <p className="text-red-500 font-bold text-[9px] uppercase tracking-wider">Peak expected: {payload[0].payload.peakHour}</p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="aqi" stroke="#c59b27" strokeWidth={2.5} fillOpacity={1} fill="url(#foreGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabular projections breakdown */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-3.5">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight border-b border-gray-50 pb-3">Projections Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-semibold text-slate-600 text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold">
                    <th className="py-2.5">Timeframe</th>
                    <th className="py-2.5">Predicted AQI</th>
                    <th className="py-2.5">Hazard Classification</th>
                    <th className="py-2.5">Model Confidence</th>
                    <th className="py-2.5">Peak Hour</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.slice(0, 7).map((row, idx) => {
                    const cat = getAqiCategory(row.aqi);
                    return (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-3 font-bold text-slate-700">{row[xAxisKey]}</td>
                        <td className="py-3 font-mono font-bold text-slate-900">{row.aqi}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cat.color}`}>
                            {cat.label}
                          </span>
                        </td>
                        <td className="py-3 font-mono">{row.confidence}%</td>
                        <td className="py-3 text-red-500 font-bold">{row.peakHour || "08:00 AM"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* AI Recommendations panel */}
        <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
              <FiCpu className="text-maroon-800" />
              AI Recommendation Engine
            </h3>
            <p className="text-xs text-gray-400 leading-normal">
              Activate spatial policy recommendations compiled by the AI agent to forecast mitigation outcomes.
            </p>

            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id} 
                  onClick={() => handleToggleMitigation(rec.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 text-xs leading-normal ${
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
                      <h4 className="font-bold text-slate-800 mt-2.5 leading-snug">{rec.measure}</h4>
                    </div>
                    {rec.active && <FiCheckCircle className="text-emerald-600 w-5 h-5 shrink-0 mt-0.5" />}
                  </div>

                  <div className="border-t border-gray-200/40 pt-2.5 space-y-1 text-[11px]">
                    <div className="flex justify-between font-medium">
                      <span>Mitigation Impact:</span>
                      <span className={rec.active ? 'text-emerald-700 font-bold' : 'text-gray-400 font-semibold'}>{rec.impact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deployment Frame:</span>
                      <span>{rec.timeframe}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-gray-400 border-t border-gray-50 pt-3 mt-4 text-center leading-normal">
            Mitigation estimations compile sensor dispersion equations & baseline coordinates traits.
          </div>
        </div>

      </div>
    </div>
  );
}
