import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/cars`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        setCars(res.data);
      } catch (err) {
        console.error("Error fetching available cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableCars();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-orange-500 font-semibold">
        Loading Premium Fleet...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

      {/* HEADING */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-500 to-white text-transparent bg-clip-text">
          Available Cars
        </h2>
        <p className="text-gray-400 font-medium mt-4 text-base md:text-lg max-w-2xl mx-auto">
          Choose your dream car and enjoy premium driving experience with DriveFleet
        </p>
      </div>

      {/* CAR GRID */}
      {cars.length === 0 ? (
        <p className="text-center text-gray-500">No cars available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.slice(0, 6).map((car, index) => (
            <div
              key={`${car._id}-${index}`}
              className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-800/50 flex flex-col"
            >
              
              {/* IMAGE CONTAINER WITH FLOATING BADGE */}
              <div className="p-6 bg-slate-950/40 relative overflow-hidden group">
                
                <span className="absolute top-4 right-4 z-10 bg-white text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider shadow-md border-2 border-orange-500">
                  {car.type}
                </span>

                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-52 object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="px-6 pb-6 pt-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 truncate">
                    {car.name}
                  </h3>

                  <div className="text-gray-400 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      🚗 {car.seats} Seats
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-orange-500 font-extrabold text-xl">
                    ${car.price}
                    <span className="text-xs text-gray-400 font-normal">/day</span>
                  </span>

                  {/* VIEW DETAILS BUTTON */}
                  <button 
                    onClick={() => {
                      if (!car._id) {
                        toast.error("Car ID is missing!");
                        return;
                      }
                      navigate(`/car/${car._id}`); 
                    }}
                    className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg transition text-white font-semibold cursor-pointer text-sm shadow-md shadow-orange-500/20"
                  >
                    View Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
};

export default AvailableCars;