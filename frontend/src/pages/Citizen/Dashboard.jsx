import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getLocationDetails, getForecast, getAlerts, getAqiAffectingAttributes, getHistorical } from '../../services/api';
import AqiSlider from '../../components/Common/AqiSlider';
import AqiTrends from '../../components/Charts/AqiTrends';
import { FiVolume2, FiAlertCircle, FiInfo, FiGrid, FiCompass, FiHeart } from 'react-icons/fi';
import { getAqiCategory } from '../../services/mockData';

export default function Dashboard() {
  const { activeLocation } = useUser();
  const [fusedData, setFusedData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const details = await getLocationDetails(activeLocation.id);
        const fore = await getForecast(activeLocation.id);
        const activeAlerts = await getAlerts();
        const attrs = await getAqiAffectingAttributes(activeLocation.id);
        const trends = await getHistorical(activeLocation.id);

        setFusedData(details.data);
        setForecast(fore);
        setAlerts(activeAlerts);
        setAttributes(attrs);
        setHistoricalData(trends);
      } catch (err) {
        console.error("Failed to load citizen dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeLocation]);

  if (loading || !fusedData || !forecast) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Loading Citizen Hub...</p>
      </div>
    );
  }

  const cigEquivalent = Number((fusedData.pollutants.pm2_5 / 22).toFixed(1));
  const weeklyCigarettes = Math.round(cigEquivalent * 7);

  const getOutdoorGuideline = (aqi) => {
    if (aqi <= 50) return "Air quality is fully safe. Ideal for outdoor jogging and family outings.";
    if (aqi <= 100) return "Safe for most. Sensitive individuals should wear simple face masks in high-traffic zones.";
    if (aqi <= 150) return "Limit intense physical outdoor activities. Wear a mask during morning commutes.";
    if (aqi <= 200) return "Wear N95/N99 respirators. Suspend outdoor jogs and workouts.";
    if (aqi <= 300) return "Severe pollution. Do not step out without N95 masks. Keep windows closed.";
    return "Extreme emergency. Strictly stay indoors with HEPA air purifiers running.";
  };

  return (
    <div className="space-y-6">
      
      {/* Announcements Banner (Top Narrow Horizontal Board) */}
      {alerts.length > 0 && (
        <div className="bg-maroon-800 text-white px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-md animate-pulse">
          <FiVolume2 className="w-5 h-5 shrink-0 text-amber-300 animate-bounce" />
          <div className="text-xs font-bold font-sans overflow-hidden whitespace-nowrap text-ellipsis flex-1">
            <span className="bg-amber-400 text-maroon-900 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-black mr-2">Advisory</span>
            {alerts[0].type} in {alerts[0].scope}: {alerts[0].message}
          </div>
        </div>
      )}

      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Citizen Advisory Portal</span>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
            {fusedData.name} Environmental Bulletin
          </h2>
          <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
            Feed coordinates: <span className="font-mono">{fusedData.lat.toFixed(3)}N, {fusedData.lon.toFixed(3)}E</span> | Live Sync Status
          </p>
        </div>
      </div>

      {/* Grid: AQI score & Key drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AQI Score metrics */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm flex flex-col justify-between h-[250px]">
          <AqiSlider aqi={fusedData.aqi} />
          
          <div className="border-t border-gray-50 pt-4 mt-2">
            <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Outdoor Exposure Guide</h4>
            <p className="text-xs leading-relaxed text-slate-600 font-semibold">{getOutdoorGuideline(fusedData.aqi)}</p>
          </div>
        </div>

        {/* AQI Key Driver Attributes card */}
        <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-3.5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm tracking-tight border-b border-gray-50 pb-2.5 flex items-center gap-1.5">
              <FiGrid className="text-maroon-800" />
              Primary Drivers Weight
            </h3>
            <div className="space-y-2 mt-3.5">
              {attributes.map((attr, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold text-slate-600">
                    <span>{attr.name}</span>
                    <span className="font-mono text-slate-900">{attr.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-gray-50 border rounded-full overflow-hidden">
                    <div className={`h-full ${attr.color || 'bg-maroon-800'}`} style={{ width: `${attr.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Forecast Line Chart (Citizen View) */}
      {historicalData && (
        <AqiTrends 
          hourlyData={historicalData.hourly}
          dailyData={historicalData.daily}
          locationName={fusedData.name}
        />
      )}

      {/* Bottom Section: Cigarette Exposure Equivalents */}
      <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-maroon-50 border border-maroon-100 text-maroon-800 rounded-xl flex items-center justify-center shrink-0">
            <FiHeart className="w-5 h-5 text-maroon-700 animate-pulse" />
          </div>
          <div className="space-y-0.5 text-xs max-w-lg">
            <h4 className="font-bold text-slate-800 text-sm">Health Risk Exposure (Cigarette Equivalents)</h4>
            <p className="text-slate-500 leading-normal">
              Breathing the ambient air at this station today results in a passive fine particulate inhalation rate equivalent to smoking cigarettes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 divide-x divide-gray-100 shrink-0 text-center text-xs font-semibold">
          <div className="px-4">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Daily Passive Rate</p>
            <p className="text-2xl font-black text-slate-800 font-mono mt-1">~{cigEquivalent} <span className="text-xs font-medium text-gray-400">cigs</span></p>
          </div>
          <div className="pl-6 pr-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Weekly Exposure</p>
            <p className="text-2xl font-black text-maroon-800 font-mono mt-1">~{weeklyCigarettes} <span className="text-xs font-medium text-gray-400 font-sans">cigarettes</span></p>
          </div>
        </div>
      </div>

    </div>
  );
}
