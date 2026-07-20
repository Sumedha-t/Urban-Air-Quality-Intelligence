import { useState, useEffect } from 'react';
import { useUser } from '../../App';
import { getLocationDetails, getHistorical, getAlerts } from '../../services/api';
import AqiSlider from '../../components/Common/AqiSlider';
import StatCard from '../../components/Common/StatCard';
import PollutantGrid from '../../components/Common/PollutantGrid';
import AqiTrends from '../../components/Charts/AqiTrends';
import { FiWind, FiThermometer, FiClock, FiActivity, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';
import { getAqiCategory } from '../../services/mockData';

export default function Dashboard() {
  const { activeLocation } = useUser();
  const [fusedData, setFusedData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const details = await getLocationDetails(activeLocation.id);
        const trends = await getHistorical(activeLocation.id);
        const activeAlerts = await getAlerts();

        setFusedData(details.data);
        setHistoricalData(trends);
        setAlerts(activeAlerts);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeLocation]);

  if (loading || !fusedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-maroon-800 border-t-transparent"></div>
        <p className="mt-4 text-xs font-semibold text-gray-400">Fusing Multisensor Datasets...</p>
      </div>
    );
  }

  const category = getAqiCategory(fusedData.aqi);

  return (
    <div className="space-y-6">
      {/* Title Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Spatial Monitoring Station</span>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
            {fusedData.name} Overview
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-medium">
            Coordinates: <span className="font-mono">{fusedData.lat.toFixed(4)}N, {fusedData.lon.toFixed(4)}E</span> | Last Synced: {new Date(fusedData.lastUpdated).toLocaleTimeString('en-IN')}
          </p>
        </div>

        {/* Sync Status Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-2xl px-3 py-1.5 text-xs text-emerald-800 font-bold shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          CPCB Feeds Live
        </div>
      </div>

      {/* Grid Row 1: AQI Slider & Weather summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AQI Score Summary card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm flex flex-col justify-between">
          <AqiSlider aqi={fusedData.aqi} />
          
          <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-5 mt-5 text-center text-xs">
            <div className="border-r border-gray-100 last:border-r-0">
              <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider block">Model Confidence</span>
              <span className="text-base font-black text-slate-800 font-mono block mt-1">{(fusedData.confidence * 100).toFixed(0)}%</span>
            </div>
            <div className="border-r border-gray-100 last:border-r-0">
              <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider block">Sensor Nodes</span>
              <span className="text-base font-black text-slate-800 font-mono block mt-1">4 Active</span>
            </div>
            <div>
              <span className="text-gray-400 font-bold text-[9px] uppercase tracking-wider block">Inversion Layer</span>
              <span className="text-base font-black text-slate-800 block mt-1">High Risk</span>
            </div>
          </div>
        </div>

        {/* Critical Alerts board */}
        <div className="bg-white rounded-3xl p-6 border border-maroon-100/50 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5 border-b border-gray-100 pb-3">
              <FiAlertTriangle className="text-maroon-800 shrink-0" />
              Active System Alerts
            </h3>
            <div className="space-y-3.5 mt-4 max-h-[140px] overflow-y-auto pr-1">
              {alerts.length > 0 ? (
                alerts.map((a) => (
                  <div key={a.id} className="text-xs flex gap-2">
                    <FiAlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                      a.level === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'
                    }`} />
                    <div>
                      <p className="font-bold text-slate-800">{a.type}</p>
                      <p className="text-gray-400 leading-tight mt-0.5">{a.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400">No active warnings or advisories for this region.</p>
              )}
            </div>
          </div>
          <div className="text-[10px] text-gray-400 border-t border-gray-50 pt-2.5 mt-4 flex items-center gap-1 justify-center font-medium">
            <FiClock /> Updates refresh dynamically every 15 mins.
          </div>
        </div>
      </div>

      {/* Grid Row 2: Secondary Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Air Temperature"
          value={fusedData.weather.temperature}
          unit="°C"
          icon={FiThermometer}
          trend={fusedData.weather.temperature > 30 ? "+2.5°C" : "Normal"}
          trendType={fusedData.weather.temperature > 30 ? "negative" : "neutral"}
          description="Surface weather reading"
        />

        <StatCard 
          title="Humidity Index"
          value={fusedData.weather.humidity}
          unit="%"
          icon={FiActivity}
          trend={`${fusedData.weather.humidity}%`}
          trendType="neutral"
          description="Atmospheric moisture level"
        />

        <StatCard 
          title="Wind Velocity"
          value={fusedData.weather.wind_speed}
          unit="km/h"
          icon={FiWind}
          trend={fusedData.weather.wind_speed < 10 ? "Stagnant" : "Normal"}
          trendType={fusedData.weather.wind_speed < 10 ? "negative" : "positive"}
          description={`Direction: ${fusedData.weather.wind_direction}°`}
        />

        <StatCard 
          title="Traffic Congestion"
          value={fusedData.traffic.congestion_index}
          unit="%"
          icon={FiClock}
          trend={fusedData.traffic.congestion_index > 70 ? "Critical" : "Stable"}
          trendType={fusedData.traffic.congestion_index > 70 ? "negative" : "positive"}
          description={`Current: ${fusedData.traffic.current_speed}km/h`}
        />
      </div>

      {/* Grid Row 3: Recharts Trend & Pollutants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {historicalData && (
            <AqiTrends 
              hourlyData={historicalData.hourly}
              dailyData={historicalData.daily}
              locationName={fusedData.name}
            />
          )}
        </div>
        <div>
          <PollutantGrid pollutants={fusedData.pollutants} />
        </div>
      </div>
    </div>
  );
}
