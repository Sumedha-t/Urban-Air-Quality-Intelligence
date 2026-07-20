export default function PollutantGrid({ pollutants }) {
  // CPCB 24-hour safety thresholds (CO is in mg/m3, others in ug/m3)
  const standards = {
    pm2_5: { name: "PM2.5", label: "Fine Particles", limit: 60, unit: "µg/m³" },
    pm10: { name: "PM10", label: "Coarse Particles", limit: 100, unit: "µg/m³" },
    no2: { name: "NO₂", label: "Nitrogen Dioxide", limit: 80, unit: "µg/m³" },
    so2: { name: "SO₂", label: "Sulphur Dioxide", limit: 80, unit: "µg/m³" },
    co: { name: "CO", label: "Carbon Monoxide", limit: 2.0, unit: "mg/m³" },
    o3: { name: "O₃", label: "Ozone", limit: 100, unit: "µg/m³" },
    nh3: { name: "NH₃", label: "Ammonia", limit: 400, unit: "µg/m³" }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-maroon-100/50 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm tracking-tight">Primary Air Pollutants</h3>
          <p className="text-xs text-gray-400 font-medium">Ambient concentration vs CPCB 24-hour safety limits</p>
        </div>
        <span className="text-[10px] text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded font-bold border border-maroon-100">
          CPCB Standard
        </span>
      </div>

      <div className="space-y-4">
        {Object.entries(standards).map(([key, info]) => {
          const value = pollutants?.[key] || 0;
          const ratio = (value / info.limit) * 100;
          const isExceeded = value > info.limit;

          return (
            <div key={key} className="space-y-1.5 group">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-800 text-sm font-bold group-hover:text-maroon-800 transition-colors">
                    {info.name}
                  </span>
                  <span className="text-gray-400 font-medium text-[10px]">
                    {info.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`font-bold font-mono text-sm ${isExceeded ? 'text-red-600' : 'text-slate-700'}`}>
                    {value} {info.unit}
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    (Limit: {info.limit} {info.unit})
                  </span>
                </div>
              </div>

              {/* Progress bar representing ratio vs limits */}
              <div className="h-2 w-full bg-gray-50 border border-gray-100 rounded-full overflow-hidden relative">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isExceeded 
                      ? 'bg-gradient-to-r from-red-400 to-red-600' 
                      : ratio > 75 
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                        : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, ratio)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
