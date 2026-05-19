import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveBooking } from "../utils/storage";

const Explore = () => {
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const handleBook = (car) => {
    saveBooking(car);
    setToast(true);

    setTimeout(() => setToast(false), 2000);
  };

  const cars = [
    { id: 1, name: "BMW M4", price: "$80/day", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Tesla Model S", price: "$95/day", img: "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Audi R8", price: "$120/day", img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Mercedes AMG GT", price: "$110/day", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Lamborghini Huracan", price: "$200/day", img: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Porsche 911", price: "$180/day", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Toyota Supra", price: "$90/day", img: "https://images.unsplash.com/photo-1619767886612-4f2b1a5e9f8c?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Nissan GTR", price: "$150/day", img: "https://images.unsplash.com/photo-1600706432502-77b3b7f8f6f2?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "Ford Mustang", price: "$100/day", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Chevrolet Camaro", price: "$105/day", img: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=800&q=80" },
    { id: 11, name: "Range Rover Sport", price: "$170/day", img: "https://images.unsplash.com/photo-1605559424771-8f9b2c6a6f9d?auto=format&fit=crop&w=800&q=80" },
    { id: 12, name: "McLaren 720S", price: "$250/day", img: "https://images.unsplash.com/photo-1549921296-3a6b8a1f1c8d?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 w-64">
          Car Booked Successfully 🚗

          <div className="mt-2 h-1 bg-white/30 rounded overflow-hidden">
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

      {/* TITLE */}
      <div className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="text-orange-500">Explore</span> Cars
        </h1>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {cars.map((car) => (
          <div key={car.id} className="bg-[#0f172a] rounded-xl overflow-hidden shadow-lg">

            <img src={car.img} className="w-full h-48 object-cover" />

            <div className="p-5">

              <h2 className="text-xl font-bold">{car.name}</h2>
              <p className="text-gray-400">{car.price}</p>

              <div className="flex gap-2 mt-4">

                {/* DETAILS FIXED */}
                <button
                  onClick={() => navigate(`/car/${car.id}`)}
                  className="flex-1 border border-gray-600 hover:border-orange-500 px-3 py-2 rounded-lg text-sm"
                >
                  Details
                </button>

                {/* BOOK */}
                <button
                  onClick={() => handleBook(car)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-lg text-sm"
                >
                  Book Now
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Explore;