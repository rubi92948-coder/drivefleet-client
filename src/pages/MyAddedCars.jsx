import { useEffect, useState } from "react";
import axios from "axios";

const MyAddedCars = () => {
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // SECURE ROUTE FIX: Fetching cars using secure token-based cookie route
        const res = await axios.get(
          "http://localhost:5000/api/cars/my-cars",
          { withCredentials: true } // Crucial to send HTTP-only cookies containing JWT token
        );

        setCars(res.data);
      } catch (err) {
        console.log("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []); // Runs once on component mount

  // DELETE CAR
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE CAR DETAILS
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cars/${editCar._id}`,
        editCar
      );

      setCars((prev) =>
        prev.map((car) =>
          car._id === editCar._id ? res.data : car
        )
      );

      setEditCar(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white p-6">

      <h1 className="text-3xl text-center text-orange-500 mb-6 font-bold">
        My Added Cars
      </h1>

      {cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-2">
          <p className="text-center text-gray-400 text-lg">
            No cars found
          </p>
          <p className="text-xs text-gray-600">
            Make sure you have added cars using your account.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-[#0f172a] p-4 rounded-xl shadow-lg border border-gray-800"
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-40 w-full object-cover rounded-lg"
              />

              <h2 className="mt-3 text-xl font-bold text-gray-200">
                {car.name}
              </h2>

              <p className="text-orange-400 font-semibold">
                ${car.price}/day
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {car.type} • {car.seats} Seats
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditCar(car)}
                  className="flex-1 border border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 py-2 rounded-lg transition cursor-pointer"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(car._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition cursor-pointer"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      {editCar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-orange-500">
              Update Car Details
            </h2>

            <div className="space-y-3">
              <input
                className="w-full p-3 rounded bg-black outline-none border border-gray-800 focus:border-orange-500"
                value={editCar.name}
                onChange={(e) =>
                  setEditCar({ ...editCar, name: e.target.value })
                }
              />

              <input
                className="w-full p-3 rounded bg-black outline-none border border-gray-800 focus:border-orange-500"
                value={editCar.price}
                onChange={(e) =>
                  setEditCar({ ...editCar, price: e.target.value })
                }
              />

              <input
                className="w-full p-3 rounded bg-black outline-none border border-gray-800 focus:border-orange-500"
                value={editCar.type}
                onChange={(e) =>
                  setEditCar({ ...editCar, type: e.target.value })
                }
              />

              <input
                className="w-full p-3 rounded bg-black outline-none border border-gray-800 focus:border-orange-500"
                value={editCar.image}
                onChange={(e) =>
                  setEditCar({ ...editCar, image: e.target.value })
                }
              />

              <input
                className="w-full p-3 rounded bg-black outline-none border border-gray-800 focus:border-orange-500"
                value={editCar.seats}
                onChange={(e) =>
                  setEditCar({ ...editCar, seats: e.target.value })
                }
              />
            </div>

            {/* MODAL BUTTONS */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditCar(null)}
                className="flex-1 border border-gray-700 text-gray-400 hover:bg-gray-800 py-2 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="flex-1 bg-orange-500 hover:bg-orange-600 py-2 rounded-lg transition font-semibold"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyAddedCars;