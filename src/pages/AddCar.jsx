const AddCar = () => {
  return (
    <div className="bg-[#020617] min-h-screen text-white px-4 py-10">

      <div className="max-w-2xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          <span className="text-orange-500">Add</span> Your Car
        </h1>

        {/* FORM */}
        <form className="bg-[#0f172a] p-6 rounded-2xl shadow-lg space-y-4">

          <input
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Car Name"
          />

          <input
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Price per day"
          />

          <input
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Car Type (SUV / Sedan)"
          />

          <input
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Image URL"
          />

          <input
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Seats"
          />

          <textarea
            className="w-full p-2.5 text-sm rounded-lg bg-[#1e293b] outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Description"
            rows="3"
          />

          {/* BUTTON */}
          <button
            type="button"
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