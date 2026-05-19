import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { saveBooking } from "../utils/storage";

// demo data
const cars = [
  {
    id: 1,
    name: "BMW M4",
    price: "$80/day",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80",
    description: "Luxury sports car with high performance and comfort.",
  },
  {
    id: 2,
    name: "Tesla Model S",
    price: "$95/day",
    img: "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=1000&q=80",
    description: "Electric premium sedan with autopilot features.",
  },
  {
    id: 3,
    name: "Audi R8",
    price: "$120/day",
    img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1000&q=80",
    description: "Supercar with aggressive design and speed.",
  },
];

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [toast, setToast] = useState(false);

  const car = cars.find((c) => c.id === Number(id));

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#020617]">
        Car Not Found
      </div>
    );
  }

  const handleBook = () => {
    saveBooking(car);
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-10">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 w-64">
          <div className="text-sm font-semibold">
            Car Booked Successfully 🚗
          </div>

          <div className="mt-2 h-1 w-full bg-white/30 rounded overflow-hidden">
            <div className="h-full bg-white animate-progress"></div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
          .animate-progress {
            animation: progress 2s linear;
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <div>
          <img
            src={car.img}
            className="w-full h-[300px] md:h-[450px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* INFO */}
        <div>

          <h1 className="text-3xl md:text-5xl font-extrabold">
            {car.name}
          </h1>

          <p className="text-orange-400 text-xl mt-3 font-semibold">
            {car.price}
          </p>

          <p className="text-gray-300 mt-5">
            {car.description}
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-3 mt-6 text-sm text-gray-300">
            <div className="bg-[#0f172a] p-3 rounded-lg">✔ Automatic</div>
            <div className="bg-[#0f172a] p-3 rounded-lg">✔ Air Condition</div>
            <div className="bg-[#0f172a] p-3 rounded-lg">✔ GPS</div>
            <div className="bg-[#0f172a] p-3 rounded-lg">✔ 4 Seats</div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <button
              onClick={() => navigate(-1)}
              className="border border-gray-500 hover:border-orange-500 px-5 py-3 rounded-lg"
            >
              Back
            </button>

            <button
              onClick={handleBook}
              className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-lg font-semibold"
            >
              Book Now
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CarDetails;