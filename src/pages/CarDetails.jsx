import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cars/${id}`
        );
        setCar(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#020617]">
        Car Not Found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <div>
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-[300px] md:h-[450px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* INFO */}
        <div>

          <h1 className="text-3xl md:text-5xl font-extrabold">
            {car.name}
          </h1>

          <p className="text-orange-400 text-xl mt-3 font-semibold">
            ${car.price}/day
          </p>

          <p className="text-gray-300 mt-5 leading-relaxed">
            {car.description}
          </p>

          {/* FEATURES (SAME AS 1ST DESIGN) */}
          <div className="grid grid-cols-2 gap-3 mt-6 text-sm text-gray-300">

            <div className="bg-[#0f172a] p-3 rounded-lg">
              ✔ {car.type}
            </div>

            <div className="bg-[#0f172a] p-3 rounded-lg">
              ✔ {car.seats} Seats
            </div>

            <div className="bg-[#0f172a] p-3 rounded-lg">
              ✔ Air Condition
            </div>

            <div className="bg-[#0f172a] p-3 rounded-lg">
              ✔ GPS
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <button
              onClick={() => navigate(-1)}
              className="border border-gray-500 hover:border-orange-500 px-5 py-3 rounded-lg"
            >
              Back
            </button>

            <button className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-lg font-semibold">
              Book Now
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CarDetails;