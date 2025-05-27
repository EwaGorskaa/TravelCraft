import Map from "../components/Map";
import { FiCompass } from "react-icons/fi";
function MapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center mt-4 pt-14 text-color1 font-text">Mapa miejsc do odwiedzenia</h1>
    <FiCompass className="text-4xl text-color1 mx-auto" />
      <div className="h-[500px]">
        <Map />
      </div>
    </div>
  );
}

export default MapPage;
