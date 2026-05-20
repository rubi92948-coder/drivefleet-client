import { useEffect, useState } from "react";
import axios from "axios";

const MyAddedCars = () => {
  const [cars, setCars] = useState([]);

  const user = localStorage.getItem("user"); // token or id

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cars/user/${user}`
        );
        setCars(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCars();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white p-6">

      <h1 className="text-3xl text-center text-orange-500 mb-6">
        My Added Cars
      </h1>

      <div className="grid gap-6">

        {cars.length === 0 ? (
          <p className="text-center text-gray-400">No cars found</p>
        ) : (
          cars.map((car) => (
            <div key={car._id} className="bg-[#0f172a] p-4 rounded">

              <img src={car.image} className="h-40 w-full object-cover" />

              <h2 className="mt-2">{car.name}</h2>

              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-500 px-3 py-1 mt-2"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default MyAddedCars;