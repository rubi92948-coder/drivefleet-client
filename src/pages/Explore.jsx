import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveBooking } from "../utils/storage";
import toast from "react-hot-toast";

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="relative">
      <div className="w-12 h-12 rounded-full absolute border-4 border-dashed border-orange-500 animate-spin"></div>
      <div className="w-12 h-12 rounded-full border-4 border-orange-900/30"></div>
    </div>
  </div>
);

const Explore = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Booking modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");

  const navigate = useNavigate();

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

  // Open modal and set selected car
  const handleOpenBooking = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  // Confirm booking and save to local storage
  const handleConfirmBooking = () => {
    const bookingData = { 
      ...selectedCar, 
      driverNeeded, 
      specialNote, 
      bookingDate: new Date().toISOString() 
    };
    saveBooking(bookingData);
    toast.success(`${selectedCar.name} Booked Successfully! 🚗`);
    setShowModal(false);
    navigate("/bookings");
  };

  const carTypes = ["All", ...new Set(cars.map((car) => car.type).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="text-orange-500 font-semibold mt-4">Loading Premium Fleet...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <div className="text-center pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-white text-transparent bg-clip-text">
          Explore Premium Fleet
        </h1>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full sm:w-auto bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-sm cursor-pointer"
        >
          {carTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* CAR GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car._id} className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg border border-gray-800/50 flex flex-col hover:border-orange-500/50 transition duration-300">
              <div className="relative w-full h-56 bg-slate-950/40 overflow-hidden">
                <span className="absolute top-4 right-4 z-10 bg-white text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase border-2 border-orange-500">
                  {car.type}
                </span>
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>

              <div className="px-6 pb-6 pt-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{car.name}</h3>
                  <div className="flex flex-col gap-1.5 text-xs text-gray-400 mb-4">
                    <span className={`flex items-center gap-1.5 font-semibold ${car.availability ? "text-green-400" : "text-red-400"}`}>
                      <span className={`w-2 h-2 rounded-full ${car.availability ? "bg-green-500" : "bg-red-500"}`}></span>
                      {car.availability ? "Available Now" : "Currently Unavailable"}
                    </span>
                    <span className="flex items-center gap-1.5">📍 {car.location || "Mymensingh"}</span>
                    <span className="flex items-center gap-1.5">🚗 {car.seats} Seats</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  <span className="text-orange-500 font-extrabold text-xl">${car.price}<span className="text-xs text-gray-400 font-normal">/day</span></span>
                  <div className="flex gap-3">
                    <button onClick={() => navigate(`/car/${car._id}`)} className="flex-1 border border-orange-500/30 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-500/10">Details</button>
                    <button
                      onClick={() => handleOpenBooking(car)}
                      disabled={!car.availability}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition ${
                        !car.availability 
                        ? "bg-gray-700 cursor-not-allowed opacity-50" 
                        : "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                      }`}
                    >
                      {car.availability ? "Book Now" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-8 rounded-2xl max-w-md w-full border border-gray-800 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Book {selectedCar?.name}</h2>
            
            <div className="mb-4">
              <label className="text-gray-400 text-sm">Driver Needed?</label>
              <div className="flex gap-4 mt-2">
                <button onClick={() => setDriverNeeded(true)} className={`px-6 py-2 rounded-lg font-semibold ${driverNeeded ? 'bg-orange-500' : 'bg-gray-700'}`}>Yes</button>
                <button onClick={() => setDriverNeeded(false)} className={`px-6 py-2 rounded-lg font-semibold ${!driverNeeded ? 'bg-orange-500' : 'bg-gray-700'}`}>No</button>
              </div>
            </div>

            <textarea 
              className="w-full bg-[#020617] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-orange-500 mb-6" 
              placeholder="Special notes (optional)..."
              rows="3"
              onChange={(e) => setSpecialNote(e.target.value)}
            />

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 bg-gray-600 rounded-xl font-bold">Cancel</button>
              <button onClick={handleConfirmBooking} className="flex-1 px-4 py-3 bg-orange-500 rounded-xl font-bold">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;