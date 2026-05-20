import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
    setDropdownOpen(false); 
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-black text-white border-b border-gray-800 relative">

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
            to="/my-added-cars"
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/my-added-cars") ? "bg-orange-500 text-white" : "hover:text-orange-500"
            }`}
          >
            My Added Cars
          </Link>

          <Link
            to="/bookings"
            className={`px-4 py-2 rounded-lg transition ${
              isActive("/bookings") ? "bg-orange-500 text-white" : "hover:text-orange-500"
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
                LogIn
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Register
              </button>
            </>
          ) : (
            /* STANDARD PROFILE DROPDOWN CONTAINER */
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-[#0f172a] border border-gray-800 hover:border-orange-500 px-3 py-1.5 rounded-full transition focus:outline-none shadow-md cursor-pointer select-none"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium max-w-[100px] truncate text-gray-200">
                  {user.name?.split(" ")[0]}
                </span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {/* PREMIUM DROPDOWN MENU BOX */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl bg-[#0f172a] border border-gray-800/80 p-1.5 z-50 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
                  
                  {/* User Profile Summary */}
                  <div className="px-3 py-2.5 mb-1 bg-[#1e293b]/40 rounded-xl border border-gray-800/50">
                    <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-0.5">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                  </div>

                  {/* My Profile Link */}
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-xl hover:bg-[#1e293b] hover:text-orange-500 transition group"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span>My Profile</span>
                  </Link>

                  {/* My Bookings Link */}
                  <Link
                    to="/bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-xl hover:bg-[#1e293b] hover:text-orange-500 transition group"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>My Bookings</span>
                  </Link>

                  <div className="h-[1px] bg-gray-800/60 my-1 mx-2" />

                  {/* Log Out Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition group"
                  >
                    <svg className="w-4 h-4 text-red-400/80 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-3xl">
            ☰
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-3 border-t border-gray-800">
          <Link onClick={() => setOpen(false)} to="/" className={isActive("/") ? "bg-orange-500 px-3 py-2 rounded-lg" : ""}>Home</Link>
          <Link onClick={() => setOpen(false)} to="/explore-cars" className={isActive("/explore-cars") ? "bg-orange-500 px-3 py-2 rounded-lg" : ""}>Explore Cars</Link>
          <Link onClick={() => setOpen(false)} to="/add-car" className={isActive("/add-car") ? "bg-orange-500 px-3 py-2 rounded-lg" : ""}>Add Car</Link>
          <Link onClick={() => setOpen(false)} to="/my-added-cars" className={isActive("/my-added-cars") ? "bg-orange-500 px-3 py-2 rounded-lg" : ""}>My Added Cars</Link>
          <Link onClick={() => setOpen(false)} to="/bookings" className={isActive("/bookings") ? "bg-orange-500 px-3 py-2 rounded-lg" : ""}>My Bookings</Link>

          {!user ? (
            <>
              <button onClick={() => { setOpen(false); navigate("/login"); }} className="bg-orange-500 px-5 py-2 rounded-lg">LogIn</button>
              <button onClick={() => { setOpen(false); navigate("/signup"); }} className="bg-orange-500 px-5 py-2 rounded-lg">Register</button>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 py-2 px-3 rounded-lg ${isActive("/profile") ? "bg-orange-500" : ""}`}
              >
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm">{user.name} (View Profile)</span>
              </Link>

              <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2 rounded-lg text-left">
                LogOut
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;