import { useState } from "react";
import { saveCar } from "../utils/carStorage";

const AddCar = () => {
  const [toast, setToast] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    seats: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCar = (e) => {
    e.preventDefault();

    const newCar = {
      id: Date.now(),
      ...formData,
    };

    saveCar(newCar);

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2000);

    setFormData({
      name: "",
      price: "",
      type: "",
      image: "",
      seats: "",
      description: "",
    });
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white px-4 py-10">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 px-4 py-3 rounded-lg shadow-lg z-50">
          Car Added Successfully 🚗
        </div>
      )}

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          <span className="text-orange-500">Add</span> Your Car
        </h1>

        <form
          onSubmit={handleAddCar}
          className="bg-[#0f172a] p-6 rounded-2xl shadow-lg space-y-4"
        >

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none"
            placeholder="Car Name"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none"
            placeholder="Price per day"
          />

          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none"
            placeholder="Car Type"
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none"
            placeholder="Image URL"
          />

          <input
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none"
            placeholder="Seats"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none"
            placeholder="Description"
            rows="3"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-2.5 rounded-lg font-semibold text-sm transition"
          >
            Add Car
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddCar;