import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css"; 
import { getCurrentPosition } from "./Util/leafletInfo"
import Map from "./Components/Map";
import SideBar from "./Components/SideBar";

const destinations = [
    {name: "清水寺", lat: 34.9946662, lng: 135.7820861},
    {name: "八坂神社", lat: 35.0036559, lng: 135.760529},
    {name: "先斗町多から", lat: 35.0042777, lng: 135.7685495},
]

const destinations2 = [
    {name: "test", lat: 36.99, lng: 135}
]
const App = () => {
    // キー設定
    const [currentPosition, setCurrentPosition] = useState({lat: 35.007992, lng: 135.775486});
    const [mapKey, setMapKey] = useState(0);
    const [pathPoint, setPathPoint] = useState([]);
    // 場所情報
    const [placeData, setPlaceData] = useState([]);

    // 初期処理
    useEffect(() => {
        updateCurrentPosition();
        setPlaceData([...destinations]);
    }, []);

    // 現在地を更新
    const updateCurrentPosition = async () => {
        const location = await getCurrentPosition();
        setCurrentPosition({
            ...currentPosition,
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
        // キーを設定して、再表示
        setMapKey(new Date().getTime());
    };

    // 検索処理
    const getPlaceData = async () => {
        setPlaceData([...destinations2]);
    }


    const getPathPoint = async () => {
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
        {/* サイドバー表示 */}
        <SideBar 
        updateCurrentPosition={updateCurrentPosition}
        getPlaceData={getPlaceData}
        getPathPoint={getPathPoint}
        placeData={placeData}
        />
        {/* 地図表示 */}
        <Map currentPosition={currentPosition} 
        mapKey={mapKey} 
        placeData={placeData}
        pathPoint={pathPoint}/>
    </div>
  );
};

export default App;
