"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  latitude?: number;
  longitude?: number;
  storeName?: string;
  address?: string;
  phone?: string;
  website?: string;
}

const Map: React.FC<MapProps> = ({
  latitude = 51.5047,
  longitude = -0.0865,
  storeName = "McDonald's",
  address = "Tooley St, London Bridge, London SE1 2TF, United Kingdom",
  phone = "+934443-43",
  website = "http://mcdonalds.uk/",
}) => {
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    // Initialize map only once
    if (map) return;

    // Create custom orange marker icon
    const orangeIcon = L.icon({
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDMyIDQwIj48cGF0aCBkPSJNMTYgMEM4LjEzNiAwIDIgNy4xNjQgMiAxNmMwIDEwIDExIDI0IDEyIDI0czEyLTE0IDEyLTI0YzAtOC44MzYtNi4xMzYtMTYtMTQtMTZ6IiBmaWxsPSIjZmY4MDAwIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==",
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      shadowSize: [41, 41],
      shadowAnchor: [13, 41],
    });

    // Initialize the map
    const mapInstance = L.map("map", {
      center: [latitude, longitude],
      zoom: 15,
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }),
      ],
    });

    // Add marker with popup
    const marker = L.marker([latitude, longitude], { icon: orangeIcon }).addTo(
      mapInstance,
    );

    const popupContent = `
      <div style="font-family: Arial, sans-serif; width: 250px;">
        <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px; font-weight: bold;">
          ${storeName}
        </h3>
        <p style="margin: 0 0 6px 0; color: #666; font-size: 13px;">
          <strong>Address:</strong><br/>${address}
        </p>
        <p style="margin: 0 0 6px 0; color: #666; font-size: 13px;">
          <strong>Phone:</strong><br/><a href="tel:${phone}" style="color: #ff8000; text-decoration: none;">${phone}</a>
        </p>
        <p style="margin: 0; color: #666; font-size: 13px;">
          <strong>Website:</strong><br/><a href="${website}" target="_blank" rel="noopener noreferrer" style="color: #ff8000; text-decoration: none;">Visit Website</a>
        </p>
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 300,
      minWidth: 250,
    });

    // Open popup by default
    marker.openPopup();

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
      setMap(null);
    };
  }, [latitude, longitude, storeName, address, phone, website]);

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <div id="map" className="w-full h-full" style={{ minHeight: "400px" }} />
    </div>
  );
};

export default Map;
