import { useState, useEffect } from "react";
import { getBookings, removeBooking } from "../utils/storage";

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
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-400">
          No bookings yet
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {bookings.map((car) => (
            <div
              key={car._id}
              className="bg-[#0f172a] p-4 rounded-xl"
            >

              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h2 className="text-xl font-bold mt-2">
                {car.name}
              </h2>

              <p className="text-gray-400">
                ${car.price}/day
              </p>

              <button
                onClick={() => handleDelete(car._id)}
                className="mt-3 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg w-full"
              >
                Cancel Booking
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Bookings;