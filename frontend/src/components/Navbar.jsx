import { Link } from 'react-router-dom'
function Navbar() {

    const links = ["Zaplanuj Podróż", "Moje Plany", "Mapa Podróży", "Kalendarz", "Wyloguj się"];
    const handleLogout = () => {
      localStorage.removeItem("token")
      window.location.reload()
    }
  return (
    <nav className="bgcolor3 shadow-[0_10px_15px_rgba(0,0,0,0.5)] fixed top-0 left-0 w-full z-50">
      <div className=" mx-auto px-12 py-3 flex justify-between items-center">
        <Link to="/dashboard"><h1 className="text-2xl color5 font5">TravelCraft</h1></Link>
        <ul className="flex space-x-7 font-text text-white curson-pointer">
          <button>Zaplanuj podróż</button>
          <button>Moje Plany</button>
          <Link to="/map"><button>Mapa Podróży</button></Link>
          <Link to="/calendar"><button>Kalendarz</button></Link>
          <button onClick={handleLogout}>Wyloguj się</button>
          </ul>
      </div>
    </nav>
  );
}

export default Navbar;