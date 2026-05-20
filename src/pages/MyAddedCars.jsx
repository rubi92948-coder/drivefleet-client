import { useEffect, useState } from "react";
import axios from "axios";

const MyAddedCars = () => {
  const [cars, setCars] = useState([]);

  // GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cars/user/${user.id}`
        );

        setCars(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    if (user?.id) {
      fetchCars();
    }

  }, [user]);

  // DELETE CAR
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cars/${id}`
      );

      setCars(
        cars.filter((car) => car._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white p-6">

      <h1 className="text-3xl text-center text-orange-500 mb-6">
        My Added Cars
      </h1>

      {cars.length === 0 ? (
        <p className="text-center text-gray-400">
          No cars found
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-[#0f172a] p-4 rounded-xl shadow-lg"
            >

              <img
                src={car.image}
                alt={car.name}
                className="h-40 w-full object-cover rounded-lg"
              />

              <h2 className="mt-3 text-xl font-bold">
                {car.name}
              </h2>

              <p className="text-gray-400 mt-1">
                ${car.price}/day
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {car.type} • {car.seats} Seats
              </p>

              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 mt-4 rounded-lg w-full"
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyAddedCars;