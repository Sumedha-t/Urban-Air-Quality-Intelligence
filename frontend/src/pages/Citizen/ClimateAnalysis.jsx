import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getClimateAnalysis } from '../../services/api';
import ClimateCompare from '../../components/Charts/ClimateCompare';
import { FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

export default function ClimateAnalysis() {
  const { activeLocation } = useUser();
  const [climateData, setClimateData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading || climateData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Loading Environmental History...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Climate Diagnostics</span>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
          Climate Change & Urban Heat Island Analysis
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Compare current environmental thresholds against 5-year spatial registries to isolate localized warming trends.
        </p>
      </div>

      {/* Main Composed Chart */}
      <div className="grid grid-cols-1 gap-6">
        <ClimateCompare 
          climateData={climateData}
          locationName={activeLocation.name}
        />
      </div>

      {/* Additional details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-normal">
        <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-2">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5 border-b border-gray-50 pb-2.5">
            <FiTrendingUp className="text-maroon-800" />
            Urban Heat Island (UHI) Mechanics
          </h4>
          <p className="text-slate-500 leading-relaxed">
            UHIs occur when concrete structures, paved roads, and steel infrastructure absorb and re-emit solar radiation at a higher rate than natural vegetation. Under stagnant winds, this local temperature delta acts as a thermal dome, trapping vehicle emissions and dust close to the ground, exacerbating PM2.5 counts.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-2">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5 border-b border-gray-50 pb-2.5">
            <FiAlertCircle className="text-maroon-800" />
            NCAP Strategic Mitigation Directives
          </h4>
          <p className="text-slate-500 leading-relaxed">
            To decouple urban expansion from climate risk, local municipalities are executing NCAP guidelines, including urban forest zones (Miyawaki planting), replacing standard concrete tiles with solar-reflective permeable pavers, and routing commercial ring roads outside city centers to suppress localized thermal traps.
          </p>
        </div>
      </div>
    </div>
  );
}
