import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="relative">
      <div className="w-12 h-12 rounded-full absolute border-4 border-dashed border-orange-500 animate-spin"></div>
      <div className="w-12 h-12 rounded-full border-4 border-orange-900/30"></div>
    </div>
  </div>
);

const MyAddedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCar, setEditCar] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/cars/my-cars",
          { withCredentials: true }
        );
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
        toast.error("Failed to load your fleet listings");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      setCars((prev) => prev.filter((car) => car._id !== id));
      toast.success("Car listing removed successfully");
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete car");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cars/${editCar._id}`,
        editCar
      );

      setCars((prev) =>
        prev.map((car) => (car._id === editCar._id ? { ...car, ...res.data } : car))
      );

      toast.success("Listing updated successfully ⚙️");
      setEditCar(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update car details");
    }
  };

  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="text-orange-500 font-semibold mt-4">Loading Your Fleet Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-white p-4 sm:p-8 relative">
      <div className="absolute w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none top-10 right-10" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-white text-transparent bg-clip-text">
            My Added Cars
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Manage, update, or remove premium vehicles you have listed in DriveFleet.
          </p>
        </div>

        {cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-800 rounded-2xl bg-[#0f172a]/30 max-w-xl mx-auto px-4">
            <span className="text-4xl mb-3">🚗</span>
            <p className="text-center text-gray-300 text-lg font-semibold">No premium cars hosted yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg border border-gray-800/60 flex flex-col justify-between hover:shadow-orange-500/5 transition-all duration-300"
              >
                <div>
                  <div className="w-full h-48 bg-slate-950/50 overflow-hidden relative">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-[11px] font-bold px-2.5 py-1 rounded-lg border border-gray-800 text-gray-300">
                      {car.type || "Luxury"}
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white truncate mb-1">{car.name}</h2>
                    <p className="text-orange-500 font-extrabold text-lg">${car.price}<span className="text-xs text-gray-400 font-normal">/day</span></p>
                    
                    <div className="mt-3 text-xs text-gray-400 font-medium bg-black/40 px-3 py-2 rounded-lg border border-gray-900 space-y-1">
                      <p>📍 {car.location || "Location not set"}</p>
                      <p className={car.availability ? "text-green-400" : "text-red-400"}>
                        {car.availability ? "● Available" : "● Unavailable"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex gap-3">
                  <button onClick={() => setEditCar(car)} className="flex-1 border border-orange-500/30 hover:border-orange-500 bg-orange-500/5 py-2.5 rounded-xl text-sm font-semibold text-gray-200 transition">Update</button>
                  <button onClick={() => setDeleteId(car._id)} className="flex-1 bg-red-600/10 hover:bg-red-600 border border-red-500/20 text-red-400 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editCar && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] border border-gray-800/80 p-6 sm:p-8 rounded-2xl w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-extrabold mb-6 text-orange-500">Update Fleet Specs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="w-full px-4 py-2.5 rounded-xl bg-black border border-gray-800 focus:border-orange-500 text-sm" value={editCar.name} onChange={(e) => setEditCar({ ...editCar, name: e.target.value })} placeholder="Car Name" />
              <input type="number" className="w-full px-4 py-2.5 rounded-xl bg-black border border-gray-800 focus:border-orange-500 text-sm" value={editCar.price} onChange={(e) => setEditCar({ ...editCar, price: e.target.value })} placeholder="Price" />
              <input className="w-full px-4 py-2.5 rounded-xl bg-black border border-gray-800 focus:border-orange-500 text-sm" value={editCar.location || ""} onChange={(e) => setEditCar({ ...editCar, location: e.target.value })} placeholder="Location" />
              <div className="flex items-center gap-2 pl-2">
                <input type="checkbox" checked={!!editCar.availability} onChange={(e) => setEditCar({ ...editCar, availability: e.target.checked })} className="w-5 h-5 accent-orange-500 cursor-pointer" />
                <label className="text-sm">Available for Booking</label>
              </div>
              <div className="sm:col-span-2">
                <input className="w-full px-4 py-2.5 rounded-xl bg-black border border-gray-800 focus:border-orange-500 text-sm" value={editCar.image} onChange={(e) => setEditCar({ ...editCar, image: e.target.value })} placeholder="Image URL" />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setEditCar(null)} className="flex-1 border border-gray-800 text-gray-400 py-3 rounded-xl">Discard</button>
              <button onClick={handleUpdate} className="flex-1 bg-orange-500 py-3 rounded-xl font-bold">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] border border-red-500/20 p-6 rounded-2xl w-full max-w-sm text-center">
            <h3 className="text-xl font-bold text-white mb-4">Remove Listing?</h3>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-800 py-2.5 rounded-xl">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 py-2.5 rounded-xl">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedCars;