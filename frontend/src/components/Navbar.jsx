import { Link } from 'react-router-dom'
function Navbar() {

    const links = ["Zaplanuj Podróż", "Moje Plany", "Mapa Podróży", "Kalendarz", "Wyloguj się"];

  return (
    <nav className="bgcolor3 shadow-[0_10px_15px_rgba(0,0,0,0.5)] fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl color5 font5">TravelCraft</h1>
        <ul className="flex space-x-7 font-text text-white curson-pointer">
          <button>Zaplanuj podróż</button>
          <button>Moje Plany</button>
          <button>Mapa Podróży</button>
          <Link to="/calendar"><button>Kalendarz</button></Link>
          <button>Wyloguj się</button>
          </ul>
      </div>
    </nav>
  );
}

export default Navbar;