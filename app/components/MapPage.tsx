"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Form from "./Form";

const customIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = customIcon;

const MapPage = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 35.6895,
    lng: 139.6917,
  });

  function LocationMarker() {
    useMapEvents({
      click(e: { latlng: { lat: number; lng: number } }) {
        setPosition(e.latlng);
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={customIcon}></Marker>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 max-w-3xl mx-auto w-11/12">
        <MapContainer
          center={[35.6895, 139.6917]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
        {position && (
          <p>
            選択した座標: 緯度 {position.lat.toFixed(4)}, 経度{" "}
            {position.lng.toFixed(4)}
          </p>
        )}
        <Form lat={position.lat} lon={position.lng} />
      </div>
    </>
  );
};

export default MapPage;
