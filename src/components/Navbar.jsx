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
              isActive("/")
                ? "bg-orange-500 text-white"
                : "hover:text-orange-500"
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
            to="/my-added-cars"
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/my-added-cars")
                ? "bg-orange-500 text-white"
                : "hover:text-orange-500"
            }`}
          >
            My Added Cars
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
                Register
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">

                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm">
                  {user.name}
                </span>

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
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-3 border-t border-gray-800">

          <Link
            onClick={() => setOpen(false)}
            to="/"
            className={
              isActive("/")
                ? "bg-orange-500 px-3 py-2 rounded-lg"
                : ""
            }
          >
            Home
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/explore-cars"
            className={
              isActive("/explore-cars")
                ? "bg-orange-500 px-3 py-2 rounded-lg"
                : ""
            }
          >
            Explore Cars
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/add-car"
            className={
              isActive("/add-car")
                ? "bg-orange-500 px-3 py-2 rounded-lg"
                : ""
            }
          >
            Add Car
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/my-added-cars"
            className={
              isActive("/my-added-cars")
                ? "bg-orange-500 px-3 py-2 rounded-lg"
                : ""
            }
          >
            My Added Cars
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/bookings"
            className={
              isActive("/bookings")
                ? "bg-orange-500 px-3 py-2 rounded-lg"
                : ""
            }
          >
            My Bookings
          </Link>

          {!user ? (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="bg-orange-500 px-5 py-2 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/signup");
                }}
                className="bg-orange-500 px-5 py-2 rounded-lg"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 py-2">

                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm">
                  {user.name}
                </span>

              </div>

              <button
                onClick={handleLogout}
                className="bg-orange-500 px-5 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default Navbar;