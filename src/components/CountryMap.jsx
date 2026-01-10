import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons not showing in Vite/React apps
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({ center, bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (center) {
      map.setView(center, 5);
    }
  }, [center, bounds, map]);
  return null;
};

const CountryMap = ({ mainCountry, neighbors }) => {
  if (!mainCountry || !mainCountry.latlng) return null;

  const mainPosition = mainCountry.latlng;
  const allPositions = [mainPosition, ...neighbors.map(n => n.latlng)].filter(pos => pos && pos.length === 2);
  
  const bounds = allPositions.length > 0 ? L.latLngBounds(allPositions) : null;

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden custom-shadow my-12 border-4 border-white dark:border-dark-blue">
      <MapContainer 
        center={mainPosition} 
        zoom={5} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Main Country Marker */}
        <Marker position={mainPosition}>
          <Popup>
            <div className="font-bold">{mainCountry.name.common} (Selected)</div>
          </Popup>
        </Marker>

        {/* Neighbor Markers */}
        {neighbors.map((neighbor) => (
          neighbor.latlng && (
            <Marker key={neighbor.cca3} position={neighbor.latlng}>
              <Popup>
                <div className="font-semibold">{neighbor.name.common} (Neighbor)</div>
              </Popup>
            </Marker>
          )
        ))}

        <ChangeView center={mainPosition} bounds={bounds ? [[bounds.getSouth(), bounds.getWest()], [bounds.getNorth(), bounds.getEast()]] : null} />
      </MapContainer>
    </div>
  );
};

export default CountryMap;
