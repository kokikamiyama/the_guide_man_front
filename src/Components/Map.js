import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import './Map.css';

const Map = (props) => {
  // 緯度軽度
  const position = props.gps;
  // 初期マップズームレベル
  const zoom = 13;
  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
};

export default Map