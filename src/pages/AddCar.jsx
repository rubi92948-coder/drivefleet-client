import { useState } from "react";
import { addCar } from "../api/carsApi";
import toast from "react-hot-toast";

const AddCar = () => {
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

  const handleAddCar = async (e) => {
    e.preventDefault();

    try {
      await addCar(formData);

      toast.success("Car Added Successfully 🚗");

      setFormData({
        name: "",
        price: "",
        type: "",
        image: "",
        seats: "",
        description: "",
      });

    } catch (err) {
      toast.error("Error adding car");
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white flex items-start justify-center pt-0">

      <form
        onSubmit={handleAddCar}
        className="bg-[#0f172a] p-8 rounded-xl w-96 space-y-4 shadow-lg mt-4"
      >

        <h1 className="text-2xl font-bold text-center text-orange-500 mb-2">
          Add Your Car 
        </h1>

        <input
          name="name"
          placeholder="Car Name"
          onChange={handleChange}
          className="w-full p-2 rounded bg-black outline-none"
        />

        <input
          name="price"
          placeholder="Price per day"
          onChange={handleChange}
          className="w-full p-2 rounded bg-black outline-none"
        />

        <input
          name="type"
          placeholder="Car Type"
          onChange={handleChange}
          className="w-full p-2 rounded bg-black outline-none"
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-2 rounded bg-black outline-none"
        />

        <input
          name="seats"
          placeholder="Seats"
          onChange={handleChange}
          className="w-full p-2 rounded bg-black outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 rounded bg-black outline-none"
        />

        <button className="w-full bg-orange-500 py-2 rounded hover:bg-orange-600 transition">
          Add Car
        </button>

      </form>

    </div>
  );
};

export default AddCar;