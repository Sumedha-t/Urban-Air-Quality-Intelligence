import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getLocationDetails, getForecast, getAlerts } from '../../services/api';
import AqiSlider from '../../components/Common/AqiSlider';
import StatCard from '../../components/Common/StatCard';
import { FiThermometer, FiClock, FiActivity, FiSmile, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { getAqiCategory } from '../../services/mockData';

export default function Dashboard() {
  const { activeLocation } = useUser();
  const [fusedData, setFusedData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const details = await getLocationDetails(activeLocation.id);
        const fore = await getForecast(activeLocation.id);
        const activeAlerts = await getAlerts();

        setFusedData(details.data);
        setForecast(fore);
        setAlerts(activeAlerts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeLocation]);

  if (loading || !fusedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Loading Citizen Dashboard...</p>
      </div>
    );
  }

  // Calculate cigarette equivalent metrics
  // Roughly 22 ug/m3 PM2.5 constant exposure for 24h equals 1 cigarette
  const cigEquivalent = Number((fusedData.pollutants.pm2_5 / 22).toFixed(1));
  const weeklyCigarettes = Math.round(cigEquivalent * 7);

  // Health guideline guidelines block
  const getOutdoorGuideline = (aqi) => {
    if (aqi <= 50) return "Air quality is fully acceptable. Outdoor games, jogging, and exercises are highly recommended.";
    if (aqi <= 100) return "Sensitive individuals should limit prolonged outdoor tasks. Standard public transit is safe.";
    if (aqi <= 150) return "Limit intense physical outdoor activities. Elderly and children should restrict morning jogs.";
    if (aqi <= 200) return "Wear surgical or cloth masks during transit. Reschedule outdoor cardio workouts to indoors.";
    if (aqi <= 300) return "Wear N95/N99 respirators. Suspend school sports classes. Remain indoors as much as possible.";
    return "Severe hazard. Do not step outside without N95 mask transit. Close all home windows and run purifiers on high.";
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Citizen Advisory Portal</span>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
            Current Air Quality for {fusedData.name}
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-medium font-mono">
            Station Feed Live | Updated: {new Date(fusedData.lastUpdated).toLocaleTimeString('en-IN')}
          </p>
        </div>
      </div>

      {/* Row 1: AQI and Activity guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Slider card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm flex flex-col justify-between">
          <AqiSlider aqi={fusedData.aqi} />
          
          {/* Outdoor Activity Guidelines */}
          <div className="border-t border-gray-100 pt-5 mt-5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <FiSmile className="text-emerald-600" />
              Outdoor Activity Guidelines
            </h4>
            <p className="text-xs leading-relaxed font-medium text-slate-600">
              {getOutdoorGuideline(fusedData.aqi)}
            </p>
          </div>
        </div>

        {/* Exposure equivalents */}
        <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm tracking-tight border-b border-gray-50 pb-3 flex items-center gap-1.5">
              <FiInfo className="text-maroon-800" />
              Cigarette Exposure Equivalents
            </h3>
            
            <div className="mt-5 space-y-4 text-center">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Daily Passive Exposure</p>
                <p className="text-3xl font-black text-slate-800 font-mono mt-1">
                  ~{cigEquivalent} <span className="text-xs font-normal text-gray-400">cigarettes / day</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                  Based on passive inhalation of current PM2.5 levels.
                </p>
              </div>

              <div className="border-t border-gray-50 pt-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Weekly Projected Total</p>
                <p className="text-base font-black text-maroon-800 font-mono mt-1">
                  ~{weeklyCigarettes} cigarettes / week
                </p>
              </div>
            </div>
          </div>
          <div className="text-[9px] text-gray-400 text-center leading-tight border-t border-gray-50 pt-2.5 mt-4">
            Formula correlates Berkeley Earth equation ($22\mu g/m^3 \approx 1$ cig/day).
          </div>
        </div>

      </div>

      {/* Row 2: Weather indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Current Temperature"
          value={fusedData.weather.temperature}
          unit="°C"
          icon={FiThermometer}
          description="Surface thermals"
        />

        <StatCard 
          title="Humidity Scale"
          value={fusedData.weather.humidity}
          unit="%"
          icon={FiActivity}
          description="Moisture level"
        />

        <StatCard 
          title="Localized Weather"
          value={fusedData.weather.weather}
          unit=""
          icon={FiClock}
          description={fusedData.weather.description}
          activeBadge="Live feed"
        />
      </div>

      {/* Row 3: 3-day forecast summary and alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3 Day Forecast */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 text-sm tracking-tight border-b border-gray-50 pb-3">
            Expected 3-Day Forecast Trends
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {forecast.threeDays.map((day, idx) => {
              const cat = getAqiCategory(day.aqi);
              return (
                <div key={idx} className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-between text-xs space-y-2.5">
                  <div className="border-b border-gray-100 pb-2">
                    <p className="font-bold text-slate-800">{day.day}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">Model confidence: {day.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimated AQI</p>
                    <p className="text-xl font-black text-slate-800 mt-1 font-mono">{day.aqi}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase w-max ${cat.color}`}>
                    {cat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety Advisories panel */}
        <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-3">
              <FiAlertCircle className="text-maroon-800" />
              Safety Bulletins
            </h3>
            <div className="space-y-3.5 mt-4">
              {alerts.slice(0, 2).map((a) => (
                <div key={a.id} className="text-xs leading-normal">
                  <p className="font-bold text-slate-700">{a.type}</p>
                  <p className="text-gray-400 mt-0.5 leading-snug">{a.message}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-gray-400 font-medium border-t border-gray-50 pt-2.5 mt-4 text-center">
            Advisories authorized by local environmental committees.
          </div>
        </div>

      </div>
    </div>
  );
}
