import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet + Vite/React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView({ shipments = [] }) {
  // Mock coordinates if backend data doesn't have them yet
  const getCoords = (id) => {
    const coordsMap = {
      'SHP-9012': [31.2304, 121.4737], // Shanghai
      'SHP-9013': [19.0760, 72.8777], // Mumbai
      'SHP-9014': [1.3521, 103.8198], // Singapore
    };
    return coordsMap[id] || [0, 0];
  };

  return (
    <div className="w-full h-full min-h-[300px] rounded-lg overflow-hidden border border-[var(--color-outline-variant)]/30">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%', background: 'var(--color-surface-container-lowest)' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {shipments.map(s => (
          <Marker key={s.id} position={getCoords(s.id)}>
            <Popup>
              <div className="text-slate-900 font-sans">
                <p className="font-bold">{s.id}</p>
                <p className="text-xs">{s.origin} &rarr; {s.destination}</p>
                <p className={`text-xs font-semibold mt-1 ${s.status === 'CRITICAL' ? 'text-red-600' : 'text-emerald-600'}`}>
                  {s.status}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
