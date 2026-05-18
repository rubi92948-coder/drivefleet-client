import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-orange-500">
          DriveFleet
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-lg">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/explore-cars" className="hover:text-orange-500">Explore Cars</Link>
          <Link to="/add-car" className="hover:text-orange-500">Add Car</Link>
          <Link to="/my-bookings" className="hover:text-orange-500">My Bookings</Link>

          <button className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600">
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
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-4 text-lg">
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/explore-cars">Explore Cars</Link>
          <Link onClick={() => setOpen(false)} to="/add-car">Add Car</Link>
          <Link onClick={() => setOpen(false)} to="/my-bookings">My Bookings</Link>

          <button className="bg-orange-500 px-5 py-2 rounded-lg">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;