import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCars,
  deleteCar,
  updateCar,
} from "../utils/carStorage";

const MyAddedCars = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setCars(getCars());
  }, []);

  // DELETE
  const handleDelete = (id) => {
    deleteCar(id);
    setCars(getCars());
  };

  // UPDATE SAVE
  const handleUpdateSave = () => {
    updateCar(editingCar);

    setCars(getCars());

    setEditingCar(null);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white px-4 py-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          <span className="text-orange-500">My Added</span> Cars
        </h1>

        {/* EMPTY */}
        {cars.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No cars added yet 🚗
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-[#0f172a] rounded-xl overflow-hidden shadow-lg"
              >

                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  {/* NAME */}
                  <h2 className="text-xl font-bold">
                    {car.name}
                  </h2>

                  {/* PRICE */}
                  <p className="text-gray-400 mt-1">
                    ${car.price}/day
                  </p>

                  {/* TYPE + DETAILS */}
                  <div className="flex items-center justify-between mt-3">

                    <p className="text-sm text-gray-500">
                      {car.type} • {car.seats} Seats
                    </p>

                    <button
                      onClick={() => navigate(`/car/${car.id}`)}
                      className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-3 py-1 rounded-lg text-xs transition"
                    >
                      View Details
                    </button>

                  </div>

                  {/* UPDATE + DELETE */}
                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <button
                      onClick={() => setEditingCar(car)}
                      className="bg-orange-500 hover:bg-orange-600 py-2.5 rounded-lg text-sm font-semibold transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(car.id)}
                      className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white py-2.5 rounded-lg text-sm font-semibold transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* UPDATE MODAL */}
        {editingCar && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="bg-[#0f172a] w-full max-w-lg rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5 text-orange-500">
                Update Car
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  value={editingCar.name}
                  onChange={(e) =>
                    setEditingCar({
                      ...editingCar,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-[#1e293b] outline-none"
                  placeholder="Car Name"
                />

                <input
                  type="text"
                  value={editingCar.price}
                  onChange={(e) =>
                    setEditingCar({
                      ...editingCar,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-[#1e293b] outline-none"
                  placeholder="Price"
                />

                <input
                  type="text"
                  value={editingCar.type}
                  onChange={(e) =>
                    setEditingCar({
                      ...editingCar,
                      type: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-[#1e293b] outline-none"
                  placeholder="Type"
                />

                <input
                  type="text"
                  value={editingCar.image}
                  onChange={(e) =>
                    setEditingCar({
                      ...editingCar,
                      image: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-[#1e293b] outline-none"
                  placeholder="Image URL"
                />

                <textarea
                  rows="3"
                  value={editingCar.description}
                  onChange={(e) =>
                    setEditingCar({
                      ...editingCar,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-[#1e293b] outline-none"
                  placeholder="Description"
                />

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => setEditingCar(null)}
                  className="flex-1 border border-gray-500 py-3 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdateSave}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 py-3 rounded-lg"
                >
                  Save Changes
                </button>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyAddedCars;