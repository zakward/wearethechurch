import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  const [timeline, setTimeline] = useState('BC'); // Tabs for BC/AD

  // Placeholder positions (Israel area)
  const center = [31.7683, 35.2137]; // Jerusalem

  // Simple tab content (in real, change map layers)
  const mapContent = {
    BC: 'Map showing ancient Israel boundaries (BC era).',
    AD: 'Map showing Roman era boundaries (AD era).',
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-secondary text-center">Geographical Map</h1>
      <div className="flex justify-center mb-4 space-x-4">
        <button onClick={() => setTimeline('BC')} className={`px-4 py-2 rounded-cartoon ${timeline === 'BC' ? 'bg-accent' : 'bg-primary'} text-white`}>BC Era</button>
        <button onClick={() => setTimeline('AD')} className={`px-4 py-2 rounded-cartoon ${timeline === 'AD' ? 'bg-accent' : 'bg-primary'} text-white`}>AD Era</button>
      </div>
      <MapContainer center={center} zoom={8} style={{ height: '500px', width: '100%' }} className="rounded-cartoon shadow-cartoon">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>{mapContent[timeline]}</Popup>
        </Marker>
      </MapContainer>
      <p className="mt-4 text-center text-primary">Interactive map of Israel areas. Tabs change timelines (add real boundaries via GeoJSON later).</p>
      {/* Cartoon image */}
      <img src="https://placehold.co/600x300/png?text=Cartoon+Ancient+Map&font=comic" alt="Map cartoon" className="mt-8 rounded-cartoon mx-auto max-w-full sm:max-w-md lg:max-w-lg" />
    </div>
  );
};

export default Map;