import { getAqiCategory } from '../../services/mockData';

export default function AqiSlider({ aqi }) {
  const category = getAqiCategory(aqi);
  
  // Calculate marker percentage on scale 0-500
  const markerPosition = Math.min(100, Math.max(0, (aqi / 500) * 100));

  const ranges = [
    { label: "Good", min: 0, max: 50, color: "bg-emerald-500" },
    { label: "Moderate", min: 51, max: 100, color: "bg-amber-500" },
    { label: "Poor", min: 101, max: 150, color: "bg-orange-500" },
    { label: "Unhealthy", min: 151, max: 200, color: "bg-red-500" },
    { label: "Severe", min: 201, max: 300, color: "bg-purple-500" },
    { label: "Hazardous", min: 301, max: 500, color: "bg-rose-950" }
  ];

  return (
    <div className="space-y-4">
      {/* Visual Header */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">AQI Score & Core Metrics</span>
          <div className="flex items-center gap-3 mt-1.5">
            <h3 className="text-5xl font-black text-slate-800 tracking-tight leading-none">{aqi}</h3>
            <div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border shadow-sm ${category.color}`}>
                {category.label}
              </span>
              <p className="text-[10px] text-gray-500 mt-1 font-medium">(Ind-AQI / US-EPA standard)</p>
            </div>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">
          <p className="font-semibold text-slate-500">Max limit</p>
          <p className="font-mono text-slate-700">500 Index</p>
        </div>
      </div>

      {/* Slider Bar */}
      <div className="relative pt-4">
        {/* Pointer Pin indicator */}
        <div 
          className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center transition-all duration-500 ease-out"
          style={{ left: `${markerPosition}%` }}
        >
          <div className={`h-4 w-4 rounded-full border-2 border-white ring-2 ring-slate-800/80 shadow-md ${category.badge}`}></div>
          <div className="h-1.5 w-0.5 bg-slate-800 mt-0.5"></div>
        </div>

        {/* Multi-segmented colored track */}
        <div className="h-3 w-full rounded-full flex overflow-hidden bg-gray-100 border border-gray-200/50 shadow-inner">
          <div className="h-full bg-emerald-500" style={{ width: '10%' }}></div> {/* 0-50 (10%) */}
          <div className="h-full bg-amber-500" style={{ width: '10%' }}></div>   {/* 51-100 (10%) */}
          <div className="h-full bg-orange-500" style={{ width: '10%' }}></div>  {/* 101-150 (10%) */}
          <div className="h-full bg-red-500" style={{ width: '10%' }}></div>     {/* 151-200 (10%) */}
          <div className="h-full bg-purple-500" style={{ width: '20%' }}></div>  {/* 201-300 (20%) */}
          <div className="h-full bg-rose-950" style={{ width: '40%' }}></div>    {/* 301-500 (40%) */}
        </div>
      </div>

      {/* Axis Labels */}
      <div className="grid grid-cols-6 text-[10px] font-bold text-gray-400 text-center">
        {ranges.map((range, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="truncate max-w-[50px] sm:max-w-none">{range.label}</span>
            <span className="font-mono text-[9px] mt-0.5">({range.min}-{range.max})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
