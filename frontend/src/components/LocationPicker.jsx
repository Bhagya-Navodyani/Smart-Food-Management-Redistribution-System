import React, { useState, useEffect } from 'react';
import { MapPin, X, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const LocationPicker = ({ isOpen, onClose, onSelectLocation, currentLocation }) => {
  const [position, setPosition] = useState([6.9271, 80.7789]); // Sri Lanka center
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(currentLocation || '');

  useEffect(() => {
    if (currentLocation) {
      setSelectedAddress(currentLocation);
    }
  }, [currentLocation]);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        // In a real app, you'd use reverse geocoding here
        const address = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        setSelectedAddress(address);
      },
    });

    return position ? (
      <Marker position={position}>
        <Popup>
          Selected Location
          <br />
          Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
        </Popup>
      </Marker>
    ) : null;
  };

  const handleSearch = async () => {
    if (!searchAddress.trim()) return;

    try {
      // Using OpenStreetMap Nominatim API (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchAddress
        )}&format=json&limit=1&countrycodes=lk` // LK = Sri Lanka
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setSelectedAddress(display_name);
        setSearchAddress('');
      } else {
        alert('Location not found in Sri Lanka. Try searching differently.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Could not search location');
    }
  };

  const handleConfirm = () => {
    if (selectedAddress.trim()) {
      onSelectLocation(selectedAddress);
      onClose();
    } else {
      alert('Please select or enter a location');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col pointer-events-auto">
        {/* Header */}
        <div className="sticky top-0 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Select Pickup Location
              </h2>
              <p className="text-sm text-gray-600 mt-1">Click on the map to select or search for a location</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-gray-600 hover:text-red-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for a location in Sri Lanka..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
              />
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
            >
              Search
            </button>
          </div>

          {/* Map Container */}
          <div className="rounded-lg overflow-hidden border-2 border-gray-300 h-96 relative z-0">
            <MapContainer
              center={position}
              zoom={9}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </MapContainer>
          </div>

          {/* Selected Address Display */}
          {selectedAddress && (
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-1">Selected Location:</p>
              <p className="text-sm text-gray-900 font-medium">{selectedAddress}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <p className="text-xs font-semibold text-amber-900 mb-1">💡 How to Use:</p>
            <ul className="text-xs text-amber-800 space-y-1">
              <li>• Search for a location by name or address</li>
              <li>• Or click directly on the map to set a pin</li>
              <li>• Zoom in/out using the map controls</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t-2 border-gray-200 flex gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
