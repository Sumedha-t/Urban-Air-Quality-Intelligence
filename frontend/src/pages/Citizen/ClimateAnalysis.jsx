import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getClimateAnalysis } from '../../services/api';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FiTrendingUp, FiCloudRain, FiInfo, FiCompass, FiSun, FiWind, FiActivity } from 'react-icons/fi';

export default function ClimateAnalysis() {
  const { activeLocation } = useUser();
  const [climateData, setClimateData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toggle buttons
  const [viewMode, setViewMode] = useState('Trend'); // 'Trend' | 'Change' | 'All Years'

  // Metric checklist selectors
  const [metrics, setMetrics] = useState({
    pm2_5: false,
    temp: true,
    humidity: false,
    precipitation: false,
    wind: false,
    uv: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getClimateAnalysis(activeLocation.id);
        setClimateData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeLocation]);

  const handleMetricToggle = (name) => {
    setMetrics(prev => ({ ...prev, [name]: !prev[name] }));
  };

  if (loading || climateData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Loading Environmental History...</p>
      </div>
    );
  }

  // Calculate severity index factors
  const severityVal = activeLocation.id === 'delhi' ? 78 : activeLocation.id === 'patna' ? 68 : 57;
  const severityLabel = severityVal > 70 ? 'CRITICAL' : 'HIGH';
  const severityColor = severityVal > 70 ? 'bg-red-500 text-white' : 'bg-rose-500 text-white';

  return (
    <div className="space-y-6">
      
      {/* 1. Climate Severity Banner card (Image 4 style) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
        {/* Subtle backdrop gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-maroon-950/20 to-slate-900 z-0"></div>
        
        {/* Severity Badge */}
        <div className={`h-16 w-16 rounded-2xl flex flex-col items-center justify-center font-bold text-center shrink-0 z-10 shadow-lg ${severityColor}`}>
          <span className="text-xl leading-none">{severityVal}</span>
          <span className="text-[9px] uppercase mt-1 leading-none tracking-widest">{severityLabel}</span>
        </div>

        <div className="space-y-1.5 z-10">
          <h3 className="text-base font-bold tracking-tight">Climate Change Severity in {activeLocation.name}</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            The current climate change severity in {activeLocation.name} is assessed as <span className="text-rose-400 font-bold">{severityLabel}</span>, with a <span className="text-rose-400 font-bold">30.2% worsening</span> in the climate score compared to last 16 years. This suggests deteriorating conditions, with increasing negative impacts on weather patterns and environmental conditions.
          </p>
          <p className="text-[9px] text-slate-400 font-mono">Data scope: Jan. to Jun. (Historical Vs 2026) - Weather Data Only</p>
        </div>
      </div>

      {/* 2. Main Dashboard Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Selector widgets & Recharts line graph (Occupies 2 columns) */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 flex flex-col justify-between">
          
          {/* Controls row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-sm tracking-tight">{activeLocation.name} Climate Change Severity</h3>
            </div>

            {/* View mode toggle tabs */}
            <div className="flex bg-slate-800/80 rounded-xl p-1 text-xs font-semibold border border-slate-700/40">
              {['Trend', 'Change', 'All Years'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setViewMode(tab)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${viewMode === tab ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Checklist Selectors */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            {/* PM2.5 Switch */}
            <label className="flex items-center gap-2 cursor-pointer bg-slate-800/50 hover:bg-slate-800 border border-slate-700/30 px-3 py-1.5 rounded-xl transition-all">
              <input
                type="checkbox"
                checked={metrics.pm2_5}
                onChange={() => handleMetricToggle('pm2_5')}
                className="rounded text-blue-600 accent-blue-600"
              />
              PM2.5 (AQI)
            </label>

            {/* Weather parameters checkboxes */}
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
              <input type="checkbox" checked={metrics.temp} onChange={() => handleMetricToggle('temp')} className="accent-blue-600" />
              Temperature
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
              <input type="checkbox" checked={metrics.humidity} onChange={() => handleMetricToggle('humidity')} className="accent-blue-600" />
              Humidity
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
              <input type="checkbox" checked={metrics.precipitation} onChange={() => handleMetricToggle('precipitation')} className="accent-blue-600" />
              Precipitation
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
              <input type="checkbox" checked={metrics.wind} onChange={() => handleMetricToggle('wind')} className="accent-blue-600" />
              Wind Speed
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-200">
              <input type="checkbox" checked={metrics.uv} onChange={() => handleMetricToggle('uv')} className="accent-blue-600" />
              UV
            </label>
          </div>

          {/* Recharts Line Graph (2010 to 2026) */}
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={climateData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs space-y-1">
                          <p className="font-bold text-slate-400">{label} Metrics</p>
                          {payload.map((p, idx) => (
                            <p key={idx} className="font-semibold" style={{ color: p.color }}>
                              {p.name}: {p.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                {metrics.pm2_5 && <Line name="AQI Index" type="monotone" dataKey="aqi" stroke="#f43f5e" strokeWidth={2.5} dot={false} />}
                {metrics.temp && <Line name="Temperature (°C)" type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2.5} dot={false} />}
                {metrics.humidity && <Line name="Humidity (%)" type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2.5} dot={false} />}
                {metrics.precipitation && <Line name="Rainfall (mm)" type="monotone" dataKey="precipitation" stroke="#06b6d4" strokeWidth={2.5} dot={false} />}
                {metrics.wind && <Line name="Wind (km/h)" type="monotone" dataKey="windSpeed" stroke="#eab308" strokeWidth={2.5} dot={false} />}
                {metrics.uv && <Line name="UV Index" type="monotone" dataKey="uv" stroke="#a855f7" strokeWidth={2.5} dot={false} />}
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* RIGHT COLUMN: Climate Extremes double bars (Occupies 1 column) */}
        <div className="space-y-6">
          
          {/* Card 1: Climate Extremes double sliders */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-xs tracking-tight flex items-center justify-between border-b border-gray-50 pb-2">
              <span>{activeLocation.name} Climate Extremes</span>
              <FiInfo className="text-slate-400" />
            </h4>

            {/* Double Progress-bar comparison indicators */}
            <div className="space-y-3.5 text-xs font-semibold">
              {/* Hottest */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Hottest</span>
                  <span className="font-bold text-red-600 font-mono">29.5°C <span className="text-[10px] text-gray-400 font-normal">(2023)</span></span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-red-100 border border-red-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600" style={{ width: '95%' }}></div>
                  </div>
                  <div className="h-1 w-full bg-gray-150 rounded-full overflow-hidden opacity-50">
                    <div className="h-full bg-slate-600" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-[9px] text-gray-400 font-normal text-right">Historic limit: 28.7°C</div>
                </div>
              </div>

              {/* Coldest */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Coldest</span>
                  <span className="font-bold text-blue-600 font-mono">18.6°C <span className="text-[10px] text-gray-400 font-normal">(2011)</span></span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-blue-100 border border-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: '65%' }}></div>
                  </div>
                  <div className="h-1 w-full bg-gray-150 rounded-full overflow-hidden opacity-50">
                    <div className="h-full bg-slate-600" style={{ width: '70%' }}></div>
                  </div>
                  <div className="text-[9px] text-gray-400 font-normal text-right">Historic limit: 19.5°C</div>
                </div>
              </div>

              {/* Wettest */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Wettest</span>
                  <span className="font-bold text-cyan-600 font-mono">4.4mm <span className="text-[10px] text-gray-400 font-normal">(2021)</span></span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-cyan-100 border border-cyan-200 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-600" style={{ width: '92%' }}></div>
                  </div>
                  <div className="h-1 w-full bg-gray-150 rounded-full overflow-hidden opacity-50">
                    <div className="h-full bg-slate-600" style={{ width: '55%' }}></div>
                  </div>
                  <div className="text-[9px] text-gray-400 font-normal text-right">Historic average: 2.9mm</div>
                </div>
              </div>

              {/* Windiest */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Windiest</span>
                  <span className="font-bold text-amber-600 font-mono">20.8km/h <span className="text-[10px] text-gray-400 font-normal">(2025)</span></span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-amber-100 border border-amber-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600" style={{ width: '88%' }}></div>
                  </div>
                  <div className="h-1 w-full bg-gray-150 rounded-full overflow-hidden opacity-50">
                    <div className="h-full bg-slate-600" style={{ width: '75%' }}></div>
                  </div>
                  <div className="text-[9px] text-gray-400 font-normal text-right">Historic average: 17.4km/h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 17 Years Record Temperatures table */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 text-xs tracking-tight border-b border-gray-50 pb-2">
              17 Years Record Breaking Temp
            </h4>

            <div className="space-y-3.5 text-xs">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Monthly Data (Daily Avg.)</p>
              
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <div>
                  <p className="font-bold text-slate-700">Highest Peak</p>
                  <p className="text-[10px] text-red-600 mt-0.5 font-bold">36.4°C Apr '24</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 font-medium">Avg. Highest</p>
                  <p className="text-slate-800 font-mono font-bold mt-0.5">34.2°C (Historic)</p>
                </div>
              </div>

              <div className="flex justify-between border-b border-gray-50 pb-2">
                <div>
                  <p className="font-bold text-slate-700">Lowest Dip</p>
                  <p className="text-[10px] text-blue-600 mt-0.5 font-bold">14.6°C Jan '23</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 font-medium">Avg. Lowest</p>
                  <p className="text-slate-800 font-mono font-bold mt-0.5">16.2°C (Historic)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 text-center text-xs font-bold font-sans pt-1">
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-2 text-orange-850">
                  <p className="text-[9px] uppercase tracking-wider text-orange-600">Heatwave duration</p>
                  <p className="text-lg font-black mt-1">7 Days <span className="text-[10px] font-normal text-gray-400">(Avg)</span></p>
                </div>
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-2 text-sky-850">
                  <p className="text-[9px] uppercase tracking-wider text-sky-600">Coldwave duration</p>
                  <p className="text-lg font-black mt-1">3 Days <span className="text-[10px] font-normal text-gray-400">(Avg)</span></p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
