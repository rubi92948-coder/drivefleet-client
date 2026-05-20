import { useState, useEffect } from "react";
import { addCar } from "../api/carsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Imported useNavigate to redirect

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

      // Resetting state (This will now empty input boxes as we added value={} prop below)
      setFormData({
        name: "",
        price: "",
        type: "",
        image: "",
        seats: "",
        description: "",
      });

      // Redirecting user to My Added Cars page to see the newly added car instantly
      navigate("/my-added-cars");

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
          value={formData.name} // Added value binding to sync with state
          placeholder="Car Name"
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-black outline-none border border-transparent focus:border-orange-500"
        />

        <input
          name="price"
          value={formData.price} // Added value binding
          placeholder="Price per day"
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-black outline-none border border-transparent focus:border-orange-500"
        />

        <input
          name="type"
          value={formData.type} // Added value binding
          placeholder="Car Type"
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-black outline-none border border-transparent focus:border-orange-500"
        />

        <input
          name="image"
          value={formData.image} // Added value binding
          placeholder="Image URL"
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-black outline-none border border-transparent focus:border-orange-500"
        />

        <input
          name="seats"
          value={formData.seats} // Added value binding
          placeholder="Seats"
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-black outline-none border border-transparent focus:border-orange-500"
        />

        <textarea
          name="description"
          value={formData.description} // Added value binding
          placeholder="Description"
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-black outline-none border border-transparent focus:border-orange-500"
        />

        <button className="w-full bg-orange-500 py-2 rounded hover:bg-orange-600 transition font-semibold cursor-pointer">
          Add Car
        </button>

      </form>

    </div>
  );
};

export default AddCar;