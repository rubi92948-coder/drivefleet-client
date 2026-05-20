import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MyAddedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCar, setEditCar] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // Custom Confirmation state

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

  // DELETE CAR ACTION
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

  // UPDATE CAR DETAILS ACTION
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cars/${editCar._id}`,
        editCar
      );

      setCars((prev) =>
        prev.map((car) => (car._id === editCar._id ? res.data : car))
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
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-orange-500 font-semibold text-lg">
        Loading Your Fleet Dashboard...
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-white p-4 sm:p-8 relative">
      
      {/* Background glow overlay */}
      <div className="absolute w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none top-10 right-10" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-white text-transparent bg-clip-text">
            My Added Cars
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Manage, update, or remove premium vehicles you have listed in DriveFleet.
          </p>
        </div>

        {/* EMPTY STATE */}
        {cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-800 rounded-2xl bg-[#0f172a]/30 max-w-xl mx-auto px-4">
            <span className="text-4xl mb-3">🚗</span>
            <p className="text-center text-gray-300 text-lg font-semibold">
              No premium cars hosted yet
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Any vehicles you publish using your account will be displayed right here.
            </p>
          </div>
        ) : (
          /* FLEET GRID SYSTEM */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg border border-gray-800/60 flex flex-col justify-between hover:shadow-orange-500/5 transition-all duration-300"
              >
                <div>
                  {/* FIXED IMAGE RATIO CONTAINER */}
                  <div className="w-full h-48 bg-slate-950/50 overflow-hidden relative">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition duration-300 hover:scale-103"
                    />
                    <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-[11px] font-bold px-2.5 py-1 rounded-lg border border-gray-800 text-gray-300">
                      {car.type || "Luxury"}
                    </span>
                  </div>

                  {/* CAR DISCLOSURE INFO */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white truncate mb-1">
                      {car.name}
                    </h2>
                    <p className="text-orange-500 font-extrabold text-lg">
                      ${car.price}<span className="text-xs text-gray-400 font-normal">/day</span>
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 font-medium bg-black/40 px-3 py-1.5 rounded-lg w-fit border border-gray-900">
                      <span>👤 {car.seats || "4"} Seats</span>
                    </div>
                  </div>
                </div>

                {/* ACTION TRIGGER FOOTER */}
                <div className="px-6 pb-6 pt-0 flex gap-3">
                  <button
                    onClick={() => setEditCar(car)}
                    className="flex-1 border border-orange-500/30 hover:border-orange-500 bg-orange-500/5 hover:bg-orange-500/10 py-2.5 rounded-xl text-sm font-semibold text-gray-200 transition cursor-pointer text-center"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => setDeleteId(car._id)}
                    className="flex-1 bg-red-600/10 hover:bg-red-600 border border-red-500/20 text-red-400 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ULTRA PREMIUIM EDIT/UPDATE MODAL */}
      {editCar && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#0f172a] border border-gray-800/80 p-6 sm:p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
            
            <h2 className="text-2xl font-extrabold mb-2 text-orange-500">
              Update Fleet Specs
            </h2>
            <p className="text-xs text-gray-400 mb-6 font-medium">Modify the parameters of your active public car directory profile.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">Car Profile Name</label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-black outline-none border border-gray-800 focus:border-orange-500 text-sm"
                  value={editCar.name}
                  onChange={(e) => setEditCar({ ...editCar, name: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">Price / Day ($)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 rounded-xl bg-black outline-none border border-gray-800 focus:border-orange-500 text-sm"
                  value={editCar.price}
                  onChange={(e) => setEditCar({ ...editCar, price: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">Car Class Type</label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-black outline-none border border-gray-800 focus:border-orange-500 text-sm"
                  value={editCar.type}
                  onChange={(e) => setEditCar({ ...editCar, type: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">Total Capacity Seating</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 rounded-xl bg-black outline-none border border-gray-800 focus:border-orange-500 text-sm"
                  value={editCar.seats}
                  onChange={(e) => setEditCar({ ...editCar, seats: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">Image Directory Link</label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-black outline-none border border-gray-800 focus:border-orange-500 text-sm"
                  value={editCar.image}
                  onChange={(e) => setEditCar({ ...editCar, image: e.target.value })}
                />
              </div>
            </div>

            {/* MODAL CONTROL TOGGLES */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setEditCar(null)}
                className="flex-1 border border-gray-800 text-gray-400 hover:bg-neutral-900 py-3 rounded-xl transition text-sm font-semibold cursor-pointer"
              >
                Discard
              </button>

              <button
                onClick={handleUpdate}
                className="flex-1 bg-orange-500 hover:bg-orange-600 py-3 rounded-xl transition font-bold text-sm shadow-md shadow-orange-500/10 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL DOCK */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] border border-red-500/20 p-6 rounded-2xl w-full max-w-sm text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xl mx-auto mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-white mb-1">Remove Listing?</h3>
            <p className="text-xs text-gray-400 mb-6">Are you sure you want to delete this car? This action is permanent.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-800 text-gray-400 hover:bg-neutral-900 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyAddedCars;