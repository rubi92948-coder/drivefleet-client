import { useEffect, useState } from "react";
import { getBookings, removeBooking } from "../utils/storage";
import toast from "react-hot-toast";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const loadData = () => {
    setBookings(getBookings());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    removeBooking(id);
    loadData();
    toast.success("Booking cancelled successfully 🚗");
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white p-4 sm:p-8 relative">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none top-10 right-10" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-white text-transparent bg-clip-text">
            My Bookings
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Review and manage your reserved luxury fleet.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-800 rounded-2xl bg-[#0f172a]/30 max-w-xl mx-auto px-4">
            <span className="text-4xl mb-3">📅</span>
            <p className="text-center text-gray-300 text-lg font-semibold">
              No active bookings found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((car) => (
              <div
                key={car._id}
                className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg border border-gray-800/60 flex flex-col hover:shadow-orange-500/5 transition-all duration-300"
              >
                {/* IMAGE CONTAINER */}
                <div className="w-full h-48 bg-slate-950/50 overflow-hidden relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                {/* INFO */}
                <div className="p-6 flex-grow">
                  <h2 className="text-2xl font-bold text-white truncate mb-1">
                    {car.name}
                  </h2>
                  <p className="text-orange-500 font-extrabold text-lg">
                    ${car.price}<span className="text-xs text-gray-400 font-normal">/day</span>
                  </p>
                </div>

                {/* CANCEL BUTTON (Styled like your other buttons) */}
                <div className="px-6 pb-6 pt-0">
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="w-full border border-orange-500/30 hover:border-orange-500 bg-orange-500/5 hover:bg-orange-500/10 py-2.5 rounded-xl text-sm font-semibold text-gray-200 transition-all duration-300 cursor-pointer text-center"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;