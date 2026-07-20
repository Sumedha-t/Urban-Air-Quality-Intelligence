import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FiLayers, FiInfo, FiWind, FiNavigation } from 'react-icons/fi';
import { getAqiCategory } from '../../services/mockData';

// Fix Vite asset URL resolution for Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle map view updates dynamically
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function InteractiveMap({ locations, activeLocation, onSelectLocation }) {
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Central India
  const [mapZoom, setMapZoom] = useState(5);
  
  // Layer Toggles
  const [layers, setLayers] = useState({
    heatmap: true,
    sensors: true,
    weather: false,
    traffic: false,
  });

  // State / City Dropdowns
  const [selectedState, setSelectedState] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');

  // Extract unique states for filter
  const uniqueStates = [...new Set(locations.map(l => l.state))];

  // Filter cities by selected state
  const filteredLocations = selectedState 
    ? locations.filter(l => l.state === selectedState)
    : locations;

  // Track active location changes and pan map
  useEffect(() => {
    if (activeLocation) {
      setMapCenter([activeLocation.lat, activeLocation.lon]);
      setMapZoom(11); // Close zoom for selected city
      setSelectedState(activeLocation.state);
      setSelectedCityId(activeLocation.id);
    }
  }, [activeLocation]);

  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    setSelectedCityId('');
    
    // Find first city in that state to pan
    const stateCity = locations.find(l => l.state === stateName);
    if (stateCity) {
      setMapCenter([stateCity.lat, stateCity.lon]);
      setMapZoom(7); // Regional zoom
      onSelectLocation(stateCity.id);
    }
  };

  const handleCityChange = (cityId) => {
    setSelectedCityId(cityId);
    const city = locations.find(l => l.id === cityId);
    if (city) {
      setMapCenter([city.lat, city.lon]);
      setMapZoom(11);
      onSelectLocation(cityId);
    }
  };

  // Helper to color map overlays based on AQI
  const getCircleColor = (aqi) => {
    return getAqiCategory(aqi).hex;
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-maroon-100/50 shadow-sm bg-gray-100 flex flex-col h-[600px] md:h-[650px]">
      
      {/* Top Filter Bar */}
      <div className="absolute top-4 left-4 right-4 z-[999] bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-maroon-100/30 flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Geo Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <FiNavigation className="text-maroon-800" />
            <span>Map Filters:</span>
          </div>

          <select
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-maroon-500"
          >
            <option value="">All States (India)</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select
            value={selectedCityId}
            onChange={(e) => handleCityChange(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-maroon-500"
          >
            <option value="">Select Station / City</option>
            {filteredLocations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>

        {/* Global Reset */}
        <button
          onClick={() => {
            setSelectedState('');
            setSelectedCityId('');
            setMapCenter([20.5937, 78.9629]);
            setMapZoom(5);
          }}
          className="text-[10px] font-bold text-maroon-900 bg-maroon-50 border border-maroon-100 hover:bg-maroon-100/50 px-3 py-2 rounded-xl transition-all w-full sm:w-auto text-center"
        >
          Reset National View
        </button>
      </div>

      {/* Layer Control Panel (Floating right) */}
      <div className="absolute right-4 top-20 md:top-40 z-[999] bg-white/95 backdrop-blur-md px-3.5 py-4 rounded-2xl shadow-lg border border-maroon-100/30 space-y-3.5 w-40">
        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FiLayers className="text-maroon-800" />
          Map Layers
        </h4>
        <div className="space-y-2 text-xs font-semibold text-slate-600">
          <label className="flex items-center gap-2 cursor-pointer hover:text-maroon-900">
            <input
              type="checkbox"
              checked={layers.heatmap}
              onChange={(e) => setLayers({ ...layers, heatmap: e.target.checked })}
              className="rounded text-maroon-800 accent-maroon-800"
            />
            AQI Heatmap
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-maroon-900">
            <input
              type="checkbox"
              checked={layers.sensors}
              onChange={(e) => setLayers({ ...layers, sensors: e.target.checked })}
              className="rounded text-maroon-800 accent-maroon-800"
            />
            IoT Sensor Pins
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-maroon-900">
            <input
              type="checkbox"
              checked={layers.weather}
              onChange={(e) => setLayers({ ...layers, weather: e.target.checked })}
              className="rounded text-maroon-800 accent-maroon-800"
            />
            Weather Overlays
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-maroon-900">
            <input
              type="checkbox"
              checked={layers.traffic}
              onChange={(e) => setLayers({ ...layers, traffic: e.target.checked })}
              className="rounded text-maroon-800 accent-maroon-800"
            />
            Traffic Density
          </label>
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="flex-1 w-full h-full relative">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          {/* Map Controller for Fly-To Panning */}
          <MapController center={mapCenter} zoom={mapZoom} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* AQI Heatmap Layers */}
          {layers.heatmap && locations.map((loc) => (
            <Circle
              key={`heat-${loc.id}`}
              center={[loc.lat, loc.lon]}
              pathOptions={{
                fillColor: getCircleColor(loc.aqi),
                fillOpacity: 0.25,
                color: getCircleColor(loc.aqi),
                weight: 1.5,
              }}
              radius={25000} // 25 km dispersion heatmap circle
            />
          ))}

          {/* Sensor Location Markers */}
          {layers.sensors && locations.map((loc) => {
            const category = getAqiCategory(loc.aqi);
            return (
              <Marker
                key={`sensor-${loc.id}`}
                position={[loc.lat, loc.lon]}
                eventHandlers={{
                  click: () => {
                    onSelectLocation(loc.id);
                  }
                }}
              >
                <Popup>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-1 mb-1">
                      <span className="font-bold text-slate-800">{loc.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${category.color}`}>
                        {category.label}
                      </span>
                    </div>
                    
                    <div className="space-y-1 font-medium text-slate-600">
                      <div className="flex justify-between">
                        <span>Current AQI:</span>
                        <span className="font-bold font-mono text-slate-900">{loc.aqi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PM2.5 Conc:</span>
                        <span className="font-mono">{loc.pollutants.pm2_5} µg/m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Temp / Humidity:</span>
                        <span className="font-mono">{loc.weather.temperature}°C / {loc.weather.humidity}%</span>
                      </div>
                      {layers.traffic && (
                        <div className="flex justify-between text-maroon-700 font-semibold border-t border-gray-50 pt-1">
                          <span>Traffic Jam:</span>
                          <span>{loc.traffic.congestion_index}% Delay</span>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => onSelectLocation(loc.id)}
                      className="w-full text-center mt-2 bg-maroon-800 text-white rounded-lg py-1 px-2 hover:bg-maroon-900 transition-all font-bold font-sans text-[10px]"
                    >
                      Focus Dashboard Analytics
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Traffic markers overlays */}
          {layers.traffic && locations.map((loc) => (
            <Circle
              key={`traffic-${loc.id}`}
              center={[loc.lat + 0.005, loc.lon - 0.005]} // Slightly offset
              pathOptions={{
                color: loc.traffic.congestion_index > 75 ? '#ef4444' : loc.traffic.congestion_index > 40 ? '#f59e0b' : '#10b981',
                weight: 3,
                fillColor: 'transparent',
              }}
              radius={8000} // 8km grid
            />
          ))}

          {/* Weather overlay markers */}
          {layers.weather && locations.map((loc) => {
            const isRain = loc.weather.weather === "Rain";
            return (
              <Circle
                key={`weather-${loc.id}`}
                center={[loc.lat - 0.008, loc.lon + 0.008]}
                pathOptions={{
                  color: isRain ? '#3b82f6' : '#f59e0b',
                  fillColor: isRain ? '#3b82f6' : '#f59e0b',
                  fillOpacity: 0.1,
                  weight: 1,
                  dashArray: "4 4"
                }}
                radius={12000}
              />
            );
          })}
        </MapContainer>
      </div>

      {/* Bottom map legend info footer */}
      <div className="bg-white px-4 py-2 border-t border-maroon-100/30 flex flex-wrap gap-4 items-center text-[10px] text-gray-500 font-medium">
        <span className="flex items-center gap-1"><FiInfo className="text-maroon-800" /> Color Hazard Scale:</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500"></span> Good (0-50)</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500"></span> Moderate (51-100)</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-500"></span> Poor (101-150)</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500"></span> Unhealthy (151-200)</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-purple-500"></span> Severe (201-300)</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-950"></span> Hazardous (301+)</span>
      </div>
    </div>
  );
}
