import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FiTrendingUp, FiActivity, FiLayers } from 'react-icons/fi';
import { getAqiCategory } from '../../services/mockData';

export default function AqiTrends({ hourlyData, dailyData, locationName }) {
  const [timeMode, setTimeMode] = useState('24h'); // '24h' or '7d'
  const [chartType, setChartType] = useState('area'); // 'area' or 'bar'

  const data = timeMode === '24h' ? hourlyData : dailyData;
  const xAxisKey = timeMode === '24h' ? 'time' : 'day';

  // Compute stats
  const aqis = data.map(d => d.aqi);
  const minAqi = Math.min(...aqis);
  const maxAqi = Math.max(...aqis);

  const minAqiIndex = data.findIndex(d => d.aqi === minAqi);
  const maxAqiIndex = data.findIndex(d => d.aqi === maxAqi);

  const minAqiLabel = data[minAqiIndex]?.[xAxisKey];
  const maxAqiLabel = data[maxAqiIndex]?.[xAxisKey];

  // Custom tooltip renderer to match Indian safety categories
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const aqi = payload[0].value;
      const cat = getAqiCategory(aqi);
      return (
        <div className="bg-white p-3 border border-maroon-100 rounded-xl shadow-xl space-y-1">
          <p className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">{payload[0].payload[xAxisKey]}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-800">{aqi} AQI</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase ${cat.color}`}>
              {cat.label}
            </span>
          </div>
          {payload[0].payload.pm2_5 && (
            <div className="text-[10px] text-gray-500 font-mono space-y-0.5 pt-1 border-t border-gray-50">
              <p>PM2.5: {payload[0].payload.pm2_5} µg/m³</p>
              <p>PM10: {payload[0].payload.pm10} µg/m³</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-maroon-100/50 shadow-sm space-y-5">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50 pb-4">
        <div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Historical Analytics</span>
          <h3 className="font-bold text-slate-800 text-base tracking-tight mt-0.5">Air Quality Index Trends for {locationName}</h3>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          {/* Chart type toggle */}
          <div className="flex bg-gray-50 border border-gray-200/50 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1.5 rounded-lg transition-all ${chartType === 'area' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 rounded-lg transition-all ${chartType === 'bar' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Bar
            </button>
          </div>

          {/* Time range toggle */}
          <div className="flex bg-gray-50 border border-gray-200/50 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setTimeMode('24h')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeMode === '24h' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              24 Hours
            </button>
            <button
              onClick={() => setTimeMode('7d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeMode === '7d' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              7 Days
            </button>
          </div>
        </div>
      </div>

      {/* KPI highlight details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-cream-50 border border-cream-200/40 rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Minimum AQI</p>
            <p className="text-2xl font-black text-slate-800 mt-1 leading-none">{minAqi}</p>
            <p className="text-[10px] text-gray-500 mt-1.5">at {minAqiLabel}</p>
          </div>
          <div className={`p-2.5 rounded-xl text-white ${getAqiCategory(minAqi).badge}`}>
            <FiActivity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-maroon-50/20 border border-maroon-100/50 rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Maximum AQI</p>
            <p className="text-2xl font-black text-slate-800 mt-1 leading-none">{maxAqi}</p>
            <p className="text-[10px] text-gray-500 mt-1.5">at {maxAqiLabel}</p>
          </div>
          <div className={`p-2.5 rounded-xl text-white ${getAqiCategory(maxAqi).badge}`}>
            <FiTrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="maroonGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#884b4b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#884b4b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1eded" />
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[0, Math.ceil(maxAqi * 1.15 / 50) * 50]}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#eddcdc', strokeWidth: 1 }} />
              <Area type="monotone" dataKey="aqi" stroke="#884b4b" strokeWidth={2.5} fillOpacity={1} fill="url(#maroonGrad)" />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1eded" />
              <XAxis 
                dataKey={xAxisKey} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[0, Math.ceil(maxAqi * 1.15 / 50) * 50]}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#faf6f0', opacity: 0.5 }} />
              <Bar dataKey="aqi" fill="#884b4b" radius={[4, 4, 0, 0]} barSize={timeMode === '24h' ? 8 : 28} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
