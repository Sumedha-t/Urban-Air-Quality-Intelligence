import { useUser } from '../../App';
import InteractiveMap from '../../components/Map/InteractiveMap';

export default function MapGIS() {
  const { locations, activeLocation, setCurrentLocationId } = useUser();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Geospatial Registry</span>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
          Interactive Air Quality Map
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Filter by state or city to visualize localized pollution layers, temperature changes, and sensor pins.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-4 border border-maroon-100/50 shadow-sm">
        <InteractiveMap 
          locations={locations}
          activeLocation={activeLocation}
          onSelectLocation={setCurrentLocationId}
        />
      </div>
    </div>
  );
}
