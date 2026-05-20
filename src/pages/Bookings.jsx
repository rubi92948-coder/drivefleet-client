import { useEffect, useState } from "react";
import { getBookings, removeBooking } from "../utils/storage";
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

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setBookings(getBookings());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    removeBooking(id);
    loadData();
    toast.success("Booking cancelled successfully! 🚗");
  };

  if (loading) {
    return (
      <div className="bg-[#020617] min-h-screen flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="text-orange-500 font-semibold mt-4">Loading Your Bookings...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Updated heading and counter section */}
        <h1 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-orange-500 to-white text-transparent bg-clip-text">
          My Bookings
        </h1>
        <p className="text-center text-gray-400 mb-10">
          You have <span className="text-orange-500 font-bold">{bookings.length}</span> active {bookings.length === 1 ? 'booking' : 'bookings'}.
        </p>

        {bookings.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl bg-[#0f172a]/30">
            <p className="text-gray-400">No active bookings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-[#0f172a] rounded-2xl border border-gray-800 p-6 flex flex-col shadow-xl">
                <img src={booking.image} alt={booking.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                <h2 className="text-xl font-bold">{booking.name}</h2>
                <p className="text-orange-500 font-bold mb-4">${booking.price}/day</p>
                
                <div className="text-sm text-gray-400 border-t border-gray-800 pt-4 mb-4 space-y-2">
                  <p>📅 <span className="text-gray-200">Booked on:</span> {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}</p>                
                  <p>📍 <span className="text-gray-200">Location:</span> {booking.location || "Mymensingh"}</p>                
                  
                  <div className="bg-[#020617] p-3 rounded-lg border border-gray-800 mt-3">
                    <p className="flex justify-between items-center">
                      <span className="text-gray-200">🚗 Driver Needed:</span> 
                      <span className={`font-bold ${booking.driverNeeded ? "text-green-400" : "text-red-400"}`}>
                        {booking.driverNeeded ? "Yes" : "No"}
                      </span>
                    </p>
                    {booking.specialNote && (
                      <p className="mt-3 text-xs italic text-gray-400 border-t border-gray-800 pt-2">
                        <span className="text-gray-500">Note:</span> "{booking.specialNote}"
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(booking._id)}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-sm font-semibold transition mt-auto"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;