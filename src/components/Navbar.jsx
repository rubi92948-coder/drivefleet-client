import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

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
              isActive("/explore-cars")
                ? "bg-orange-500 text-white"
                : "hover:text-orange-500"
            }`}
          >
            Explore Cars
          </Link>

          <Link
            to="/add-car"
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/add-car")
                ? "bg-orange-500 text-white"
                : "hover:text-orange-500"
            }`}
          >
            Add Car
          </Link>

          <Link
            to="/bookings"
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/bookings")
                ? "bg-orange-500 text-white"
                : "hover:text-orange-500"
            }`}
          >
            My Bookings
          </Link>

          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm">{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile */}
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
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-3">

          <Link to="/">Home</Link>
          <Link to="/explore-cars">Explore Cars</Link>
          <Link to="/add-car">Add Car</Link>
          <Link to="/bookings">Bookings</Link>

          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 px-5 py-2 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-orange-500 px-5 py-2 rounded-lg"
              >
                Signup
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-orange-500 px-5 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;