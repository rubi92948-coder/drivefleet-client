import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-black text-white border-b border-gray-800">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-orange-500">
          DriveFleet
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg">

          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/") ? "bg-orange-500 text-white" : "hover:text-orange-500"
            }`}
          >
            Home
          </Link>

          <Link
            to="/explore-cars"
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/explore-cars") ? "bg-orange-500 text-white" : "hover:text-orange-500"
            }`}
          >
            Explore Cars
          </Link>

          <Link
            to="/add-car"
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/add-car") ? "bg-orange-500 text-white" : "hover:text-orange-500"
            }`}
          >
            Add Car
          </Link>

          <Link
            to="/bookings"
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/bookings") ? "bg-orange-500 text-white" : "hover:text-orange-500"
            }`}
          >
            My Bookings
          </Link>

          <button className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition">
            Login
          </button>

        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-3xl"
          >
            ☰
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-3 text-lg border-t border-gray-800">

          <Link
            onClick={() => setOpen(false)}
            to="/"
            className={isActive("/") ? "bg-orange-500 px-3 py-2 rounded-lg" : ""}
          >
            Home
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/explore-cars"
            className={isActive("/explore-cars") ? "bg-orange-500 px-3 py-2 rounded-lg" : ""}
          >
            Explore Cars
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/add-car"
            className={isActive("/add-car") ? "bg-orange-500 px-3 py-2 rounded-lg" : ""}
          >
            Add Car
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/bookings"
            className={isActive("/bookings") ? "bg-orange-500 px-3 py-2 rounded-lg" : ""}
          >
            My Bookings
          </Link>

          <button className="bg-orange-500 px-5 py-2 rounded-lg">
            Login
          </button>

        </div>
      )}
    </div>
  );
};

export default Navbar;