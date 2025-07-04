import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-3 py-4 bg-transparent text-blue-600">


      <div className="flex justify-between items-center w-full">
        {/* Left side */}
        <h1 className="text-2xl font-bold">Weatherly</h1>

        {/* Center side */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold hover:text-red-400 transition duration-300">Home</Link>
          <Link to="/forecast" className="text-xl font-bold hover:text-red-400 transition duration-300">Forecast</Link>
          <Link to="/map" className="text-xl font-bold hover:text-red-400 transition duration-300">Map</Link>
          <Link to="/airquality" className="text-xl font-bold hover:text-red-400 transition duration-300">Air Quality</Link>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-6">
          <Link to="/about" className="text-xl font-bold hover:text-red-400 transition duration-300">About me</Link>
        </div>
      </div>

    </nav>
  );

}
