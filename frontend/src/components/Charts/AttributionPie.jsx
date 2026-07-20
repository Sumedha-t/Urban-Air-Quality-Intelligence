import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function AttributionPie({ attributionData }) {
  // Format data for Recharts
  const data = [
    { name: 'Vehicular Traffic', value: attributionData.traffic, color: '#6f3b3b' }, // Maroon
    { name: 'Heavy Industries', value: attributionData.industries, color: '#c59b27' }, // Gold
    { name: 'Construction Dust', value: attributionData.construction, color: '#f97316' }, // Amber/Orange
    { name: 'Biomass Burning', value: attributionData.biomass_burning, color: '#ea580c' }, // Deep Terracotta
    { name: 'Residential Cooking', value: attributionData.residential, color: '#8b5cf6' }, // Purple
    { name: 'Meteorological Conditions', value: attributionData.weather, color: '#3b82f6' }, // Blue
    { name: 'Natural / Dust Storms', value: attributionData.natural, color: '#94a3b8' } // Slate Gray
  ].filter(d => d.value > 0);

  // Custom tooltips
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white px-3 py-2 border border-maroon-100 rounded-xl shadow-xl">
          <p className="text-xs font-bold text-slate-800">{data.name}</p>
          <p className="text-sm font-black text-maroon-800 font-mono mt-0.5">{data.value}% contribution</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Visual Chart */}
      <div className="h-60 w-full md:w-1/2 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={1.5} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Badge label */}
        <div className="absolute text-center">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Primary Driver</span>
          <p className="text-sm font-black text-slate-700 mt-0.5">
            {data.sort((a,b) => b.value - a.value)[0]?.name.split(' ')[1]} Source
          </p>
        </div>
      </div>

      {/* Customized Legend details */}
      <div className="w-full md:w-1/2 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 px-2 rounded-lg transition-all">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: item.color }}></span>
              <span className="font-semibold text-slate-700">{item.name}</span>
            </div>
            <span className="font-bold font-mono text-slate-900 bg-gray-100/80 px-2 py-0.5 rounded border border-gray-200/20">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
