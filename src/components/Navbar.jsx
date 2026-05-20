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

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3.5">

        {/* CUSTOM PREMIUM "D" ACCELERATION LOGO */}
        <Link to="/" className="flex items-center gap-2 group select-none">
          <div className="relative w-9 h-9 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 transition-all duration-300 group-hover:scale-105">
            
            {/* The Dynamic 'D' Shape SVG matching the reference design */}
            <svg 
              className="w-5 h-5 text-white stroke-[2.5]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 3h6c5 0 8 3 8 9s-3 9-8 9H5V3z M10 8h-2v8h2c2.5 0 4-1.5 4-4s-1.5-4-4-4z" 
              />
              {/* Sleek interior speed streak line inside the 'D' */}
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M13 12h4" 
                className="stroke-black/70 animate-pulse"
              />
            </svg>
            
            {/* Ambient glow behind the 'D' brand box */}
            <div className="absolute inset-0 bg-orange-500 rounded-xl blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
          </div>
          
          {/* BRAND NAME */}
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-white tracking-tight">
            Drive<span className="text-white group-hover:text-orange-500 transition-colors duration-300">Fleet</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-300">

          <Link
            to="/"
            className={`px-3.5 py-2 rounded-lg transition-all duration-200 ${
              isActive("/") ? "bg-orange-500 text-white font-semibold" : "hover:text-white hover:bg-neutral-900"
            }`}
          >
            Home
          </Link>

          <Link
            to="/explore-cars"
            className={`px-3.5 py-2 rounded-lg transition-all duration-200 ${
              isActive("/explore-cars") ? "bg-orange-500 text-white font-semibold" : "hover:text-white hover:bg-neutral-900"
            }`}
          >
            Explore Cars
          </Link>

          <Link
            to="/add-car"
            className={`px-3.5 py-2 rounded-lg transition-all duration-200 ${
              isActive("/add-car") ? "bg-orange-500 text-white font-semibold" : "hover:text-white hover:bg-neutral-900"
            }`}
          >
            Add Car
          </Link>

          <Link
            to="/my-added-cars"
            className={`px-3.5 py-2 rounded-lg transition-all duration-200 ${
              isActive("/my-added-cars") ? "bg-orange-500 text-white font-semibold" : "hover:text-white hover:bg-neutral-900"
            }`}
          >
            My Added Cars
          </Link>

          <Link
            to="/bookings"
            className={`px-3.5 py-2 rounded-lg transition-all duration-200 ${
              isActive("/bookings") ? "bg-orange-500 text-white font-semibold" : "hover:text-white hover:bg-neutral-900"
            }`}
          >
            My Bookings
          </Link>

          <div className="h-4 w-[1px] bg-neutral-800 mx-2" />

          {!user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="text-gray-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                LogIn
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition text-white font-semibold text-sm shadow-md shadow-orange-500/10 cursor-pointer"
              >
                Register
              </button>
            </div>
          ) : (
            /* PROFILE DROPDOWN CONTAINER */
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-[#0f172a] border border-gray-800 hover:border-orange-500 px-3 py-1.5 rounded-full transition focus:outline-none shadow-md cursor-pointer select-none"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium max-w-[90px] truncate text-gray-200">
                  {user.name?.split(" ")[0]}
                </span>
                <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {/* DROPDOWN MENU BOX */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl bg-[#0f172a] border border-gray-800/80 p-1.5 z-50 backdrop-blur-md">
                  <div className="px-3 py-2.5 mb-1 bg-[#1e293b]/40 rounded-xl border border-gray-800/50">
                    <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-0.5">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-xl hover:bg-[#1e293b] hover:text-orange-500 transition group"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-xl hover:bg-[#1e293b] hover:text-orange-500 transition group"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>My Bookings</span>
                  </Link>

                  <div className="h-[1px] bg-gray-800/60 my-1 mx-2" />

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
          <button onClick={() => setOpen(!open)} className="text-2xl p-1 text-gray-400 hover:text-white">
            ☰
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-3 border-t border-gray-900 pt-3 text-sm">
          <Link onClick={() => setOpen(false)} to="/" className={isActive("/") ? "bg-orange-500 px-3 py-2 rounded-lg" : "px-3 py-1"}>Home</Link>
          <Link onClick={() => setOpen(false)} to="/explore-cars" className={isActive("/explore-cars") ? "bg-orange-500 px-3 py-2 rounded-lg" : "px-3 py-1"}>Explore Cars</Link>
          <Link onClick={() => setOpen(false)} to="/add-car" className={isActive("/add-car") ? "bg-orange-500 px-3 py-2 rounded-lg" : "px-3 py-1"}>Add Car</Link>
          <Link onClick={() => setOpen(false)} to="/my-added-cars" className={isActive("/my-added-cars") ? "bg-orange-500 px-3 py-2 rounded-lg" : "px-3 py-1"}>My Added Cars</Link>
          <Link onClick={() => setOpen(false)} to="/bookings" className={isActive("/bookings") ? "bg-orange-500 px-3 py-2 rounded-lg" : "px-3 py-1"}>My Bookings</Link>

          {!user ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-900">
              <button onClick={() => { setOpen(false); navigate("/login"); }} className="border border-neutral-800 text-center py-2 rounded-lg">LogIn</button>
              <button onClick={() => { setOpen(false); navigate("/signup"); }} className="bg-orange-500 text-center py-2 rounded-lg font-semibold">Register</button>
            </div>
          ) : (
            <div className="pt-2 border-t border-neutral-900 flex flex-col gap-2">
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 py-2 px-3 rounded-lg ${isActive("/profile") ? "bg-orange-500" : ""}`}
              >
                <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center font-bold text-xs">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs">{user.name} (View Profile)</span>
              </Link>

              <button onClick={handleLogout} className="bg-red-600/20 text-red-500 text-center py-2 rounded-lg text-sm font-medium">
                LogOut
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;