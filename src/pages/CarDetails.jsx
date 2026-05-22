import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveBooking } from "../utils/storage"; 
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCar();
  }, [id]);

  const handleBooking = async () => {
    try {
      
      await axios.put(`${BASE_URL}/api/cars/book/${id}`);
      
      const bookingData = {
        ...car,
        driverNeeded,
        specialNote,
        bookingDate: new Date().toISOString()
      };
      saveBooking(bookingData);
      
      toast.success(`${car.name} booked successfully!`);
      navigate("/bookings");
    } catch (err) {
      toast.error("Booking failed!");
    }
  };

  if (!car) return <div className="min-h-screen flex items-center justify-center text-white bg-[#020617]">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <img src={car.image} alt={car.name} className="w-full h-[450px] object-cover rounded-2xl shadow-lg" />
        </div>

        <div>
          <h1 className="text-5xl font-extrabold">{car.name}</h1>
          <p className="text-orange-400 text-xl mt-3 font-semibold">${car.price}/day</p>
          <p className="text-gray-300 mt-5">{car.description}</p>
         
<p className="text-gray-400">
  Total Bookings: <span className="text-orange-500 font-bold">{car.bookingCount}</span>
</p>

          <div className="mt-8 space-y-4 bg-[#0f172a] p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-6">
              <span className="text-gray-300">Driver Needed?</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={driverNeeded} onChange={() => setDriverNeeded(true)} className="accent-orange-500"/> Yes
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!driverNeeded} onChange={() => setDriverNeeded(false)} className="accent-orange-500"/> No
                </label>
              </div>
            </div>

            <textarea 
              placeholder="Special notes (optional)..."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full bg-[#020617] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-orange-500"
              rows="3"
            />
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={() => navigate(-1)} className="border border-gray-500 px-8 py-3 rounded-lg hover:bg-gray-800">Back</button>
            <button onClick={handleBooking} className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-bold">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;