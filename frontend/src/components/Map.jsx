import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
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
      </MapContainer>
    </div>
  );
};

export default Map;
