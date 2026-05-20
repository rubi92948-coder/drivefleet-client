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
    description: "",
  });

  const navigate = useNavigate();

  // Get logged-in user details from localStorage when component mounts
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCar = async (e) => {
    e.preventDefault();

    try {
      // Attaching userEmail with formData so backend knows who added the car
      const dataToSend = {
        ...formData,
        userEmail: user?.email, // Attaching logged-in user email
      };

      await addCar(dataToSend);
      toast.success("Car Added Successfully 🚗");

      // Resetting state
      setFormData({
        name: "",
        price: "",
        type: "",
        image: "",
        seats: "",
        description: "",
      });

      // Redirecting user to My Added Cars page
      navigate("/my-added-cars");
    } catch (err) {
      toast.error("Error adding car");
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white flex items-center justify-center px-4 py-12 relative">
      
      {/* Decorative premium background glow */}
      <div className="absolute w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none top-1/4 left-1/4" />
      <div className="absolute w-[300px] h-[300px] bg-orange-600/5 blur-[100px] rounded-full pointer-events-none bottom-1/4 right-1/4" />

      {/* FORM CONTAINER */}
      <form
        onSubmit={handleAddCar}
        className="bg-[#0f172a] p-6 sm:p-10 rounded-2xl w-full max-w-2xl space-y-6 shadow-2xl border border-gray-800/60 z-10 transition-all duration-300"
      >
        {/* HEADER TEXT */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-white text-transparent bg-clip-text">
            Add Your Luxury Car
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 font-medium">
            Fill in the details to list your premium vehicle in the fleet directory.
          </p>
        </div>

        {/* INPUT GRID SYSTEM (Responsive 2 Columns on desktop, 1 Column on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Car Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider pl-1">Car Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="e.g. BMW M4 Coupe"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800/80 focus:border-orange-500 text-sm transition placeholder-gray-600"
            />
          </div>

          {/* Price Per Day */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider pl-1">Price per day ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              placeholder="e.g. 150"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800/80 focus:border-orange-500 text-sm transition placeholder-gray-600"
            />
          </div>

          {/* Car Type Dropdown (Standard Select Box matching Explore page) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider pl-1">Car Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800/80 focus:border-orange-500 text-sm transition text-gray-300 cursor-pointer"
            >
              <option value="" disabled className="text-gray-600">Select Category</option>
              <option value="Supercar">Supercar</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Seats Counter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider pl-1">Total Seats</label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              placeholder="e.g. 4"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800/80 focus:border-orange-500 text-sm transition placeholder-gray-600"
            />
          </div>

          {/* Image URL (Full width spans across columns) */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider pl-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              placeholder="https://example.com/car-image.png"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800/80 focus:border-orange-500 text-sm transition placeholder-gray-600"
            />
          </div>

          {/* Description (Full width spans across columns) */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider pl-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              placeholder="Write a captivating description about the car's condition, performance, and highlights..."
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 rounded-xl bg-black/60 outline-none border border-gray-800/80 focus:border-orange-500 text-sm transition placeholder-gray-600 resize-none leading-relaxed"
            />
          </div>

        </div>

        {/* SUBMIT BUTTON */}
        <button 
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 py-3.5 rounded-xl transition duration-300 font-bold text-sm sm:text-base tracking-wide text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 cursor-pointer mt-2"
        >
          Publish Car Listing
        </button>

      </form>
    </div>
  );
};

export default AddCar;