import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveBooking } from "../utils/storage";
import toast from "react-hot-toast";

const Explore = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  {/* SEARCH & FILTER STATES */}
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const navigate = useNavigate();

  // FETCH FROM MONGODB
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cars");
        setCars(res.data);
        setFilteredCars(res.data);
      } catch (err) {
        console.error("Error loading cars", err);
        toast.error("Failed to load cars fleet");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  {/* SEARCH & FILTER LOGIC */}
  useEffect(() => {
    let result = cars;

    if (searchTerm) {
      result = result.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "All") {
      result = result.filter((car) => car.type === selectedType);
    }

    setFilteredCars(result);
  }, [searchTerm, selectedType, cars]);

  const handleBook = (car) => {
    saveBooking(car);
    toast.success(`${car.name} Booked Successfully! 🚗`);
  };

  // Get unique car types for filter dropdown
  const carTypes = ["All", ...new Set(cars.map((car) => car.type).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-orange-500 font-semibold text-lg">
        Loading Premium Fleet...
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-white">

      {/* HEADER TITLE */}
      <div className="text-center pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-white text-transparent bg-clip-text">
          Explore Premium Fleet
        </h1>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base font-medium">
          Discover and book elite vehicles tailored for your ultimate driving luxury.
        </p>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search by car name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0f172a] border border-gray-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm transition focus:outline-none placeholder-gray-500"
          />
        </div>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <span className="text-sm text-gray-400 font-medium whitespace-nowrap">Filter Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-auto bg-[#0f172a] border border-gray-800 focus:border-orange-500 rounded-xl px-4 py-3 text-sm transition focus:outline-none text-gray-300 cursor-pointer"
          >
            {carTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CAR GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        {filteredCars.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No premium cars match your search or filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <div
                key={`${car._id}-${index}`}
                className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-800/50 flex flex-col"
              >
                
                {/* IMAGE CONTAINER WITH FLOATING BADGE */}
                <div className="relative w-full h-56 bg-slate-950/40 overflow-hidden group">
                  
                  {/* Floating Compact White Badge with Sleek Orange Outline */}
                  {car.type && (
                    <span className="absolute top-4 right-4 z-10 bg-white text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider shadow-md border-2 border-orange-500">
                      {car.type}
                    </span>
                  )}

                  {/* FIXED: Image size forced to be identical using w-full h-full object-cover */}
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT AREA */}
                <div className="px-6 pb-6 pt-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 truncate">
                      {car.name}
                    </h3>

                    <div className="text-gray-400 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        🚗 {car.seats || "4"} Seats
                      </span>
                    </div>
                  </div>

                  {/* PRICE & BUTTONS */}
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Daily Rate</span>
                      <span className="text-orange-500 font-extrabold text-xl">
                        ${car.price}<span className="text-xs text-gray-400 font-normal">/day</span>
                      </span>
                    </div>

                    <div className="flex gap-3">
                      {/* DETAILS BUTTON */}
                      <button
                        onClick={() => navigate(`/car/${car._id}`)}
                        className="flex-1 border border-orange-500/30 hover:border-orange-500 bg-orange-500/5 hover:bg-orange-500/10 py-2.5 rounded-xl text-sm font-semibold text-gray-200 hover:text-white transition-all duration-300 cursor-pointer"
                      >
                        Details
                      </button>

                      {/* BOOK NOW BUTTON */}
                      <button
                        onClick={() => handleBook(car)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 py-2.5 rounded-xl text-sm font-bold text-white transition shadow-md shadow-orange-500/20 cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Explore;