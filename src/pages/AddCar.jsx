import { useState, useEffect } from "react";
import { addCar } from "../api/carsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    seats: "",
    location: "",      // New Field
    availability: true, // New Field (default true)
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        price: Number(formData.price),
        seats: Number(formData.seats),
        userEmail: user?.email,
      };

      await addCar(dataToSend);
      toast.success("Car Added Successfully 🚗");

      setFormData({
        name: "",
        price: "",
        type: "",
        image: "",
        seats: "",
        location: "",
        availability: true,
        description: "",
      });

      navigate("/my-added-cars");
    } catch (err) {
      toast.error("Error adding car");
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white flex items-center justify-center px-4 py-12 relative">
      <form
        onSubmit={handleAddCar}
        className="bg-[#0f172a] p-6 sm:p-10 rounded-2xl w-full max-w-2xl space-y-6 shadow-2xl border border-gray-800/60 z-10"
      >
        <div className="text-center mb-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-white text-transparent bg-clip-text">
            Add Your Luxury Car
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Car Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-semibold uppercase pl-1">Car Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800 focus:border-orange-500 text-sm" />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-semibold uppercase pl-1">Price per day ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800 focus:border-orange-500 text-sm" />
          </div>

          {/* Car Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-semibold uppercase pl-1">Car Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800 focus:border-orange-500 text-sm text-gray-300">
              <option value="">Select Category</option>
              <option value="Supercar">Supercar</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Seats */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-semibold uppercase pl-1">Total Seats</label>
            <input type="number" name="seats" value={formData.seats} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800 focus:border-orange-500 text-sm" />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-semibold uppercase pl-1">Location</label>
            <input type="text" name="location" value={formData.location} placeholder="e.g. Dhaka, Bangladesh" onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800 focus:border-orange-500 text-sm" />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} className="w-5 h-5 accent-orange-500" />
            <label className="text-sm text-gray-300 font-medium">Available for Booking</label>
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs text-gray-400 font-semibold uppercase pl-1">Image URL</label>
            <input type="url" name="image" value={formData.image} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800 focus:border-orange-500 text-sm" />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs text-gray-400 font-semibold uppercase pl-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800 focus:border-orange-500 text-sm resize-none" />
          </div>
        </div>

        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 cursor-pointer">
          Publish Car Listing
        </button>
      </form>
    </div>
  );
};

export default AddCar;