export default function StatCard({ title, value, unit, icon: Icon, trend, trendType, description, activeBadge }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-maroon-100/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[140px] group relative overflow-hidden">
      {/* Decorative backdrop glow on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-maroon-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mr-6 -mt-6"></div>

      {/* Header section */}
      <div className="flex items-start justify-between relative z-10">
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider leading-normal">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-xl bg-maroon-50 text-maroon-800 border border-maroon-100 group-hover:bg-maroon-800 group-hover:text-white transition-all duration-300">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Values section */}
      <div className="mt-3 relative z-10 flex items-baseline gap-1">
        <span className="text-3xl font-black text-slate-800 tracking-tight leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-semibold text-gray-400 uppercase">
            {unit}
          </span>
        )}
      </div>

      {/* Footer metadata row */}
      <div className="mt-3 flex items-center justify-between text-xs relative z-10 border-t border-gray-50 pt-2.5">
        {trend ? (
          <div className="flex items-center gap-1.5">
            <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${
              trendType === 'positive' ? 'bg-green-50 text-green-700' :
              trendType === 'negative' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'
            }`}>
              {trend}
            </span>
            <span className="text-gray-400">{description}</span>
          </div>
        ) : (
          <span className="text-gray-400 font-medium">{description || "Live sensor feed"}</span>
        )}

        {activeBadge && (
          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-maroon-50 border border-maroon-200 text-maroon-800">
            {activeBadge}
          </span>
        )}
      </div>
    </div>
  );
}
