import Map from "../components/Map";


function MapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center my-4 pt-14 pb-4 text-color1 font-text">Mapa punktów</h1>
      <div className="h-[500px]">
        <Map />
      </div>
    </div>
  );
}

export default MapPage;
