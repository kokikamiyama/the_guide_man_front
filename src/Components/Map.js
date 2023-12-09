import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css"; 
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { mapOption } from "../Util/leafletInfo"


// 現在地アイコン
const currentIcon = Leaflet.icon({
    iconUrl: require("../images/current_pin.png"),
    iconSize: [40, 40],
});
// 場所アイコン
const placeIcon = Leaflet.icon({
    iconUrl: require("../images/destination_pin.png"),
    iconSize: [32, 32],
});

// 道順アイコン
const pathIcon = Leaflet.icon({
    iconUrl: require("../images/path.png"),
    iconSize: [8, 8],
});

const Map = (props) => {
    //map key
    const mapKey = props.mapKey;

    // 位置情報
    const currentPosition = props.currentPosition;
    const placeData = props.placeData;
    const pathPoint = props.pathPoint;

  return (
    <MapContainer
        key={mapKey}
        center={currentPosition}
        zoom={mapOption.startZoom}
        style={{ height: "90vh", width: "70%" }}>
        {/* 地図のタイル情報 */}
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={mapOption.maxZoom}
          minZoom={mapOption.minZoom}
        />
        {/* 現在地情報を出力 */}
        <Marker position={currentPosition} icon={currentIcon}>
          <Popup>現在地</Popup>
        </Marker>
        {/* 場所情報を出力 */}
        {placeData.length > 0
          ? placeData.map((item) => (
              <Marker key={item.id} position={item} icon={placeIcon}>
                <Popup>
                    <div style={{width:"100%", height: "100%"}}>
                        <li>{item.lat}, {item.lng}</li>
                        <li>{item.name}</li>
                    </div>
                </Popup>
                {/* <Popup>{item.name}</Popup> */}
              </Marker>
            ))
          : null}
          {pathPoint.length > 0
          ? pathPoint.map((item) => (
              <Marker key={item.id} position={[item.latitude, item.longitude]} icon={pathIcon}>
              </Marker>
            ))
          : null}
      </MapContainer>
  )
};

export default Map