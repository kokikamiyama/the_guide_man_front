import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css"; 
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { mapOption, getCurrentPosition } from "./Util/leafletInfo"

// 切り替え前データ
const tempPlaceData1 = [
  { id: "1", lat: 33.59513931435894, lng: 130.42419433593753, name: "地点Ａ" },
  { id: "2", lat: 33.59260123175435, lng: 130.41131973266604, name: "地点Ｂ" },
  { id: "3", lat: 33.59517506146791, lng: 130.42694091796878, name: "地点Ｃ" },
  { id: "4", lat: 33.59653344063089, lng: 130.420138835907, name: "地点Ｄ" },
  { id: "5", lat: 33.592813804823924, lng: 130.42249917984012, name: "地点Ｅ" },
  { id: "6", lat: 33.590849553725455, lng: 130.4186797142029, name: "地点Ｆ" },
];
// 切り替え後データ
const tempPlaceData2 = [
  { id: "7", lat: 33.55513931435894, lng: 130.40419433593753, name: "地点Ｇ" },
  { id: "8", lat: 33.59260123175435, lng: 130.42131973266604, name: "地点Ｈ" },
  { id: "9", lat: 33.57517506146791, lng: 130.43694091796878, name: "地点Ｉ" },
  { id: "10", lat: 33.58653344063089, lng: 130.390138835907, name: "地点Ｊ" },
];

const destinations = [
    {name: "清水寺", lat: 34.9946662, lng: 135.7820861},
    {name: "八坂神社", lat: 35.0036559, lng: 135.760529},
    {name: "先斗町多から", lat: 35.0042777, lng: 135.7685495},
]



// 現在地アイコン
const currentIcon = Leaflet.icon({
  iconUrl: require("./images/current_pin.png"),
  iconSize: [40, 40],
});
// 場所アイコン
const placeIcon = Leaflet.icon({
  iconUrl: require("./images/destination_pin.png"),
  iconSize: [32, 32],
});

const pathIcon = Leaflet.icon({
    iconUrl: require("./images/path.png"),
    iconSize: [8, 8],
})

const App = () => {
  // キー設定
  const [mapKey, setMapKey] = useState(0);
  const [pathPoint, setPathPoint] = useState([]);
  // 現在地情報
//   const [currentPosition, setCurrentPosition] = useState({
//     lat: 0,
//     lng: 0,
//   });
    const currentPosition = {lat: 35.007992, lng: 135.775486};
  // 場所情報
  const [placeData, setPlaceData] = useState([]);

  // 初期処理
  useEffect(() => {
    moveCurrentPosition();
    setPlaceData([...destinations]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 現在地に移動
  const moveCurrentPosition = async () => {
    // const location = await getCurrentPosition();
    // setCurrentPosition({
    //   ...currentPosition,
    //   lat: location.coords.latitude,
    //   lng: location.coords.longitude,
    // });
    // キーを設定して、再表示
    setMapKey(new Date().getTime());
  };

  // 検索処理
  const getLocationList = async () => {
    const formData = new FormData();
    try {
        await fetch('http://127.0.0.1:5000/api', {
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:5000"
            },
            method: 'POST',
            body: formData,
        }).then(res => res.json()).then(json => {
            setPathPoint(json.path_list);
            console.log(pathPoint)
        }
            );
    } catch (error) {
        console.error('Error during sending audio data', error);
    }
    // 本当はfetchとかしてデータ取ってくる
    // const responce = await axios.get("http://localshot:8000/api/getLocation/...");
    // setPlaceData([...responce]);
  };


  return (
    <div style={{ width:"100%", display:"flex"}}>
      {/* ボタン(機能操作) */}
      <div style={{width: "30%", height: "90vh"}}>
        <div>
            <button onClick={() => moveCurrentPosition()}>現在地</button>
            <button onClick={() => getLocationList()}>確定</button>
        </div>
        {placeData.length > 0
          ? placeData.map((item) => (
              <div>
                {item.name}
              </div>
            ))
          : null}

      </div>
      {/* 地図表示 */}
      <MapContainer
        key={mapKey}
        center={currentPosition}
        zoom={mapOption.startZoom}
        style={{ height: "90vh", width: "70%" }}
      >
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
                <Popup>{item.name}</Popup>
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
    </div>
  );
};

export default App;
