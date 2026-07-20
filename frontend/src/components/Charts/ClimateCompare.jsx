import { useState } from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FiTrendingUp, FiCloudRain, FiCompass, FiSun } from 'react-icons/fi';

export default function ClimateCompare({ climateData, locationName }) {
  const [metricTab, setMetricTab] = useState('aqi'); // 'aqi' or 'weather' or 'green'

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-maroon-100 rounded-xl shadow-xl space-y-1 text-xs">
          <p className="text-slate-400 font-bold uppercase tracking-wider">{label} Records</p>
          <div className="space-y-1 pt-1.5 border-t border-gray-50">
            {payload.map((item, idx) => (
              <p key={idx} className="font-semibold" style={{ color: item.color || '#6f3b3b' }}>
                {item.name}: {item.value} {item.unit || ''}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-maroon-100/50 shadow-sm space-y-5">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-50 pb-4">
        <div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Climate Change Analysis</span>
          <h3 className="font-bold text-slate-800 text-base tracking-tight mt-0.5">5-Year Historical Environmental Shifts in {locationName}</h3>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/50 rounded-xl p-1 text-xs font-semibold self-stretch md:self-auto justify-between">
          <button
            onClick={() => setMetricTab('aqi')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
              metricTab === 'aqi' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FiCompass className="w-3.5 h-3.5" />
            AQI & UHI
          </button>
          
          <button
            onClick={() => setMetricTab('weather')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
              metricTab === 'weather' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FiSun className="w-3.5 h-3.5" />
            Temp & Rainfall
          </button>
          
          <button
            onClick={() => setMetricTab('green')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
              metricTab === 'green' ? 'bg-white text-maroon-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FiTrendingUp className="w-3.5 h-3.5" />
            Green Cover
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {metricTab === 'aqi' ? (
            <ComposedChart data={climateData} margin={{ top: 10, right: -5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1eded" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" domain={[0, 'auto']} tick={{ fill: '#6f3b3b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 6]} tick={{ fill: '#c59b27', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              
              <Bar yAxisId="left" name="Mean Annual AQI" dataKey="aqi" fill="#884b4b" radius={[4, 4, 0, 0]} barSize={24} unit=" index" />
              <Line yAxisId="right" name="Urban Heat Island Intensity" type="monotone" dataKey="heatIslandIndex" stroke="#c59b27" strokeWidth={3} dot={{ fill: '#c59b27', r: 4 }} unit="°C Delta" />
            </ComposedChart>
          ) : metricTab === 'weather' ? (
            <ComposedChart data={climateData} margin={{ top: 10, right: -5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1eded" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" domain={[0, 45]} tick={{ fill: '#ea580c', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 1600]} tick={{ fill: '#3b82f6', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              
              <Bar yAxisId="right" name="Annual Rainfall" dataKey="rainfall" fill="#3b82f6" opacity={0.65} radius={[4, 4, 0, 0]} barSize={24} unit=" mm" />
              <Line yAxisId="left" name="Mean Temperature" type="monotone" dataKey="temperature" stroke="#ea580c" strokeWidth={3} dot={{ fill: '#ea580c', r: 4 }} unit=" °C" />
            </ComposedChart>
          ) : (
            <ComposedChart data={climateData} margin={{ top: 10, right: -5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1eded" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 50]} tick={{ fill: '#10b981', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              
              <Bar name="Satellite Green Cover %" dataKey="greenCover" fill="#10b981" radius={[4, 4, 0, 0]} barSize={28} unit="%" />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Climate insights panel */}
      <div className="bg-cream-50 border border-cream-200/50 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-600">
        <FiSun className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-slate-800">Spatial Shift Summary</h4>
          {metricTab === 'aqi' ? (
            <p className="mt-1">Mean annual AQI shows an upward climb correlating directly with the Urban Heat Island (UHI) index. Stagnation layers are expanding due to rising concrete density in city centers.</p>
          ) : metricTab === 'weather' ? (
            <p className="mt-1">Precipitation patterns are shifting towards intense, short-duration cloudbursts with longer dry spells, leading to decreased natural particulate washout compared to previous decades.</p>
          ) : (
            <p className="mt-1">Satellite vegetation indices show a loss of core canopy green cover. Urban concrete replacement limits carbon sequestration and increases ambient particulate suspension.</p>
          )}
        </div>
      </div>
    </div>
  );
}
