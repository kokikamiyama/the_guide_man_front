import 'leaflet/dist/leaflet.css';
import Map from './Components/Map';
import { useState } from 'react';
let apikey = process.env.REACT_APP_API_KEY;

function App() {
    const [ gps, setGps ] = useState([35.03937, 135.724737]);
    // const [ gps, setGps ] = useState({lat: "35.6814568602531", lng: "139.76799772026422"});
    return (
    <div>
      
      <Map apikey={apikey} gps={gps}/>
    </div>
  );
};

export default App;
