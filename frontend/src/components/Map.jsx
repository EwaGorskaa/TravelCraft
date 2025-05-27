import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify"

const Map = () => {
  const [pins, setPins] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  function MapClickHandler({ onClick}) {
    useMapEvents({
      click(e){
        onClick(e.latlng);
      },
    });
    return null;
  }

  
      useEffect(() =>{
          if(location.state?.message){
          toast(location.state.message);
          navigate(location.pathname, { replace: true, state: {} });
          }
  
      }, [location.state, navigate])

  const deletePin = async (id) =>{
        const confirmed = window.confirm("Czy na pewno chcesz usunąć tę pinezkę?");
        if(!confirmed) return;

        try{
            const token = localStorage.getItem("token")
            if(token){
                const config = {
                    method:"DELETE",
                    url: `http://localhost:3001/api/pins/${id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                }
            const res = await axios(config);
            setPins((prev) => prev.filter((pin) => pin._id !== id));
            navigate('/map', { state: { message: "Pinezka została usunięta" } }); 
  
            }
            else{
                alert("Brak tokenu - musisz być zalogowany, aby usunąć pinezkę");
            }    
        }
        catch(error){
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            alert(error.response.data.message);
            }
            
        }

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
            <Popup>
              <div className="flex flex-col justify-between items-center">  
                <p className="font-semibold">{pin.title}</p>
                  <FaTrash onClick={() => deletePin(pin._id)} />
                </div>
            </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
