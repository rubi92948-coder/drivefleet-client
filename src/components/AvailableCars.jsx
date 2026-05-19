import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import car3 from "../assets/car3.png";

const AvailableCars = () => {

  const cars = [
    {
      id: 1,
      name: "BMW M4",
      price: "$80/day",
      type: "Sports",
      seats: "4 Seats",
      image: car1,
    },

    {
      id: 2,
      name: "Tesla Model S",
      price: "$95/day",
      type: "Electric",
      seats: "5 Seats",
      image: car2,
    },

    {
      id: 3,
      name: "Toyota Corolla",
      price: "$50/day",
      type: "Sedan",
      seats: "5 Seats",
      image: car3,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

      {/* HEADING */}
      <div className="text-center mb-14">

      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-500 to-white text-transparent bg-clip-text">
  Available Cars
</h2>
  <p className="text-white-400 font-bold mt-4 text-base md:text-lg max-w-2xl mx-auto">
    Choose your dream car and enjoy premium driving experience with DriveFleet
  </p>

</div>

      {/* CAR GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {cars.map((car) => (

          <div
            key={car.id}
            className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >

            {/* IMAGE */}
            <div className="p-6">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-52 object-contain"
              />
            </div>

            {/* CONTENT */}
            <div className="px-6 pb-6">

              <h3 className="text-2xl font-bold text-white mb-2">
                {car.name}
              </h3>

              <div className="flex items-center justify-between text-gray-400 mb-4">

                <span>{car.type}</span>

                <span>{car.seats}</span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-orange-400 font-bold text-xl">
                  {car.price}
                </span>

                <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg transition text-white">
                  Details
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default AvailableCars;