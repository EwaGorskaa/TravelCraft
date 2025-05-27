import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const Map = () => {
  const [pins, setPins] = useState([]);
  function MapClickHandler({ onClick}) {
    useMapEvents({
      click(e){
        onClick(e.latlng);
      },
    });
    return null;
  }

const createMarker = (color) => {
  
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
      <path fill="${color}" stroke="black" stroke-width="1" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 11.9 12.5 28.5 12.5 28.5S25 24.4 25 12.5C25 5.6 19.4 0 12.5 0z"/>
      <circle fill="white" cx="12.5" cy="12.5" r="5"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: "p-2",
    iconSize: [10, 15],
    iconAnchor: [10, 30],
    popupAnchor: [1, -34],
  });
};



useEffect(() => {
  const fetchPins = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try { 
      const config = {
      method: "GET",
      url: "http://localhost:3001/api/pins/",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }
    const res = await axios(config);
    console.log("Pobrane pinezki:", res.data.data);
    setPins(res.data.data);
    }
    catch(error){
      console.error("Błąd przy pobieraniu pinezek:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  }
};
fetchPins();
}, []);


  const handleMapClick = async (latlng) => {
    try{
      const title = prompt("Nazwa pinezki: ");
      const type = "Whishlist";
      const token = localStorage.getItem("token");
      if(token){
        const res = await axios.post("http://localhost:3001/api/pins", {
          lat: latlng.lat,
          lng: latlng.lng,
          title,
          type,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          }
        })
        setPins(prev => [...prev, res.data.data]);
      }
    }
    catch(error){
      console.error("Błąd przy dodawaniu pinezki:", error);
    } 
  }

  const colors = {
    Visited: "blue",
    Upcoming: "orange",
    Whishlist: "pink",
  };

  return (
    <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full z-0 bg-[#d0d0d0]"
        doubleClickZoom={false}
        worldCopyJump={false}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        <MapClickHandler onClick={handleMapClick}/>
        {pins.map(pin =>(
          <Marker key={pin._id} position={[pin.lat, pin.lng]} icon={createMarker(colors[pin.type])}>
          <Tooltip>{pin.title}</Tooltip>
            </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
