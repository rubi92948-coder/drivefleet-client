import { useEffect, useState } from "react";
import { getBookings, removeBooking } from "../utils/storage";
import toast from "react-hot-toast";

// স্পিনার কম্পোনেন্ট
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
  const [loading, setLoading] = useState(true); // লোডিং স্টেট যোগ করা হয়েছে

  const loadData = () => {
    setBookings(getBookings());
    setLoading(false); // ডেটা লোড হলে লোডিং বন্ধ হবে
  };

  useEffect(() => {
    // অল্প কিছু সময়ের জন্য লোডিং দেখানোর জন্য setTimeout ব্যবহার করা যেতে পারে
    // অথবা সরাসরি loadData কল করতে পারেন
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
        <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-orange-500 to-white text-transparent bg-clip-text">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl bg-[#0f172a]/30">
            <p className="text-gray-400">No active bookings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-[#0f172a] rounded-2xl border border-gray-800 p-6 flex flex-col">
                <img src={booking.image} alt={booking.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                <h2 className="text-xl font-bold">{booking.name}</h2>
                <p className="text-orange-500 font-bold mb-4">${booking.price}/day</p>
                
                <div className="text-sm text-gray-400 border-t border-gray-800 pt-4 mb-4 space-y-1">
                  <p>📅 <span className="text-gray-200">From:</span> {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : "N/A"}</p>
                  <p>📅 <span className="text-gray-200">To:</span> {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : "N/A"}</p>
                  <p>📍 <span className="text-gray-200">Location:</span> {booking.location || "N/A"}</p>
                </div>

                <button
                  onClick={() => handleDelete(booking._id)}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-sm font-semibold transition"
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