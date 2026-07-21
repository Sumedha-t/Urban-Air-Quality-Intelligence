import { useUser } from '../../App';
import InteractiveMap from '../../components/Map/InteractiveMap';
import { getAqiCategory } from '../../services/mockData';
import { FiLayers, FiInfo, FiActivity } from 'react-icons/fi';

export default function MapGIS() {
  const { locations, activeLocation, setCurrentLocationId } = useUser();

  const activeCategory = activeLocation ? getAqiCategory(activeLocation.aqi) : null;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Geospatial Intelligence</span>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
          Interactive GIS Map of India
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Multi-layer spatial maps plotting sensor networks, satellite AQI estimates, weather maps, and TomTom traffic congestion overlays.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Leaflet Map Slot */}
        <div className="xl:col-span-3">
          <InteractiveMap 
            locations={locations}
            activeLocation={activeLocation}
            onSelectLocation={setCurrentLocationId}
          />
        </div>

        {/* Sidebar Info Panel */}
        <div className="space-y-5">
          {/* Active Station Card Details */}
          {activeLocation && (
            <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Map Focus Location</span>
                <h3 className="font-bold text-slate-800 text-sm mt-0.5">{activeLocation.name}</h3>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">{activeLocation.state}</p>
              </div>

              {/* AQI Score */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">AQI Score</span>
                  <span className="text-3xl font-black text-slate-800 font-mono leading-none mt-1 block">{activeLocation.aqi}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider border shadow-sm ${activeCategory.color}`}>
                  {activeCategory.label}
                </span>
              </div>

              {/* Key Pollutants */}
              <div className="space-y-2 border-t border-gray-50 pt-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Pollutants</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <div className="bg-cream-100/50 rounded-xl p-2 text-center border border-cream-200/20">
                    <p className="text-[10px] text-gray-400">PM2.5</p>
                    <p className="font-bold font-mono text-slate-700 mt-0.5">{activeLocation.pollutants.pm2_5} µg</p>
                  </div>
                  <div className="bg-cream-100/50 rounded-xl p-2 text-center border border-cream-200/20">
                    <p className="text-[10px] text-gray-400">PM10</p>
                    <p className="font-bold font-mono text-slate-700 mt-0.5">{activeLocation.pollutants.pm10} µg</p>
                  </div>
                </div>
              </div>

              {/* Coordinates Info */}
              <div className="space-y-1.5 text-xs text-slate-500 font-medium leading-tight">
                <div className="flex justify-between">
                  <span>Latitude:</span>
                  <span className="font-mono">{activeLocation.lat.toFixed(4)}N</span>
                </div>
                <div className="flex justify-between">
                  <span>Longitude:</span>
                  <span className="font-mono">{activeLocation.lon.toFixed(4)}E</span>
                </div>
                <div className="flex justify-between">
                  <span>Traffic Index:</span>
                  <span className="font-bold text-maroon-700">{activeLocation.traffic.congestion_index}% delay</span>
                </div>
              </div>
            </div>
          )}

          {/* Map Layer Legend info */}
          <div className="bg-white rounded-3xl p-5 border border-maroon-100/50 shadow-sm space-y-3.5">
            <h4 className="font-bold text-slate-800 text-xs tracking-tight flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <FiLayers className="text-maroon-800" />
              GIS Overlays Guide
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-500 font-medium">
              <div className="flex gap-2">
                <FiActivity className="text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-700">AQI Heatmap</h5>
                  <p className="text-[11px] text-gray-400 mt-0.5">Generates colored visual circles around monitors showing particulate spread gradients.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <FiInfo className="text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-700">TomTom Speed Flow</h5>
                  <p className="text-[11px] text-gray-400 mt-0.5">Traces primary arterial bypass rings showing congestion in amber/red rings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
