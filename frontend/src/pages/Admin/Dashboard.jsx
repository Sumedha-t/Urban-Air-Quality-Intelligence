import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getLocationDetails, getHistorical, getCombinedHourlyForecast } from '../../services/api';
import AqiSlider from '../../components/Common/AqiSlider';
import PollutantGrid from '../../components/Common/PollutantGrid';
import AqiTrends from '../../components/Charts/AqiTrends';
import { FiSun, FiCloud, FiCloudRain, FiAlertCircle } from 'react-icons/fi';

export default function Dashboard() {
  const { activeLocation } = useUser();
  const [fusedData, setFusedData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const details = await getLocationDetails(activeLocation.id);
        const trends = await getHistorical(activeLocation.id);
        const hourly = await getCombinedHourlyForecast(activeLocation.id);

        setFusedData(details.data);
        setHistoricalData(trends);
        setHourlyForecast(hourly);
      } catch (err) {
        console.error("Failed to fetch dashboard records", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeLocation]);

  // Helper to map weather condition to icon
  const getWeatherIcon = (cond) => {
    const lower = cond.toLowerCase();
    if (lower.includes('rain') || lower.includes('drizzle')) {
      return <FiCloudRain className="w-5 h-5 text-blue-500" />;
    }
    if (lower.includes('cloud')) {
      return <FiCloud className="w-5 h-5 text-slate-400" />;
    }
    return <FiSun className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />;
  };

  if (loading || !fusedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-maroon-800 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Loading Station Datasets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Spatial Monitoring Station</span>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
            {fusedData.name} AQI: National Air Quality Index
          </h2>
          <p className="text-xs text-gray-400 mt-1.5 font-medium">
            Lat: <span className="font-mono">{fusedData.lat.toFixed(4)}</span> - Lon: <span className="font-mono">{fusedData.lon.toFixed(4)}</span> | Sync: CPCB Feeds Live
          </p>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-2xl px-3 py-1 text-xs text-emerald-800 font-bold shadow-sm shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Feeds Synced
        </div>
      </div>

      {/* Grid matching Image 1 layout: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: AQI metrics & primary pollutants */}
        <div className="space-y-6">
          {/* Card 1: AQI Score & Core Metrics */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm flex flex-col justify-between h-[230px]">
            <AqiSlider aqi={fusedData.aqi} />
            
            <div className="flex gap-12 border-t border-gray-50 pt-4 mt-2 text-xs font-semibold text-slate-500">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">PM2.5 Conc.</span>
                <span className="text-base font-black text-slate-800 font-mono block mt-1">{fusedData.pollutants.pm2_5} <span className="text-[10px] text-gray-400 font-normal">µg/m³</span></span>
              </div>
              <div className="border-l border-gray-100 pl-12">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">PM10 Conc.</span>
                <span className="text-base font-black text-slate-800 font-mono block mt-1">{fusedData.pollutants.pm10} <span className="text-[10px] text-gray-400 font-normal">µg/m³</span></span>
              </div>
            </div>
          </div>

          {/* Card 2: Primary Air Pollutants grid */}
          <PollutantGrid pollutants={fusedData.pollutants} />
        </div>

        {/* RIGHT COLUMN: Compact weather summary & hourly forecasts */}
        <div className="space-y-6">
          
          {/* Card 1: Compact Weather & Climate Summary (Image 1 style) */}
          <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm flex flex-col justify-between h-[230px]">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-sans">Weather & Climate Summary</span>
              <h3 className="text-sm font-bold text-slate-800 mt-1">Current Conditions</h3>
              
              <div className="mt-3.5 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-800 tracking-tight font-sans">{fusedData.weather.temperature}°C</span>
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-1">Humidity: <span className="text-slate-800">{fusedData.weather.humidity}%</span></p>
            </div>

            {/* Bottom row metrics */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4 mt-2">
              <div>
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">UV Index</span>
                <span className="text-base font-black text-slate-700 block mt-0.5">3</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">Wind Speed</span>
                <span className="text-base font-black text-slate-700 font-mono block mt-0.5">{fusedData.weather.wind_speed} km/h</span>
              </div>
            </div>
          </div>

          {/* Card 2: Hourly Forecast table (Image 1 style) */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm flex flex-col justify-between">
            <div className="border-b border-gray-50 pb-2.5 mb-2.5">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Hourly Forecast</span>
              <h3 className="text-xs font-bold text-slate-700 mt-0.5">{fusedData.name} Region</h3>
            </div>

            <div className="max-h-[295px] overflow-y-auto pr-1">
              <table className="w-full text-xs font-semibold text-slate-600 text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[9px] pb-1.5">
                    <th className="py-2">Time</th>
                    <th className="py-2">Temp</th>
                    <th className="py-2 text-right pr-4">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {hourlyForecast.map((row, idx) => (
                    <tr key={idx} className={`hover:bg-gray-50/50 ${row.isPrediction ? 'opacity-85 font-normal' : ''}`}>
                      <td className="py-2 text-slate-800 font-bold flex items-center gap-1.5">
                        {row.time}
                        {row.isPrediction && <span className="text-[8px] text-amber-600 font-bold uppercase scale-90 bg-amber-50 px-1 border border-amber-100/60 rounded">FCST</span>}
                      </td>
                      <td className="py-2 font-mono">{row.temp}°C</td>
                      <td className="py-2 text-right pr-4 flex items-center justify-end gap-2 text-slate-500 font-normal">
                        {row.condition}
                        {getWeatherIcon(row.condition)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM SECTION: Full width historical trends */}
      {historicalData && (
        <AqiTrends 
          hourlyData={historicalData.hourly}
          dailyData={historicalData.daily}
          locationName={fusedData.name}
        />
      )}
    </div>
  );
}
