import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveBooking } from "../utils/storage";

const Explore = () => {
  const [cars, setCars] = useState([]);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  // FETCH FROM MONGODB
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cars");
        setCars(res.data);
      } catch (err) {
        console.log("Error loading cars", err);
      }
    };

    fetchCars();
  }, []);

  const handleBook = (car) => {
    saveBooking(car);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 w-64">
          Car Booked Successfully 🚗

          <div className="mt-2 h-1 bg-white/30 rounded overflow-hidden">
            <div className="h-full bg-white animate-progress"></div>
          </div>
        </div>
      )}

      {/* PROGRESS ANIMATION */}
      <style>
        {`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-progress {
            animation: progress 2s linear;
          }
        `}
      </style>

      {/* TITLE */}
      <div className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="text-orange-500">Explore</span> Cars
        </h1>
      </div>

      {/* GRID (SAME DESIGN AS 2ND VERSION) */}
      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-[#0f172a] rounded-xl overflow-hidden shadow-lg"
          >

            {/* IMAGE */}
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">{car.name}</h2>

              <p className="text-gray-400">
                ${car.price}/day
              </p>

              <div className="flex gap-2 mt-4">

                {/* DETAILS */}
                <button
                  onClick={() => navigate(`/car/${car._id}`)}
                  className="flex-1 border border-gray-600 hover:border-orange-500 px-3 py-2 rounded-lg text-sm"
                >
                  Details
                </button>

                {/* BOOK */}
                <button
                  onClick={() => handleBook(car)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-lg text-sm"
                >
                  Book Now
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Explore;