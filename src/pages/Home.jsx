import Navbar from "../components/Navbar";
import carImg from "../assets/car3.png";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-[#020617] min-h-screen text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-2 md:py-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

        {/* LEFT TEXT */}
        <div className="flex-1 text-center md:text-left">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mt-[-10px]">
            Drive Your <br className="hidden md:block" />
            Dream Car
          </h1>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl mt-3 mb-6 max-w-xl mx-auto md:mx-0">
            Rent premium luxury cars at affordable prices with DriveFleet.
            Experience comfort, speed, and elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <button className="bg-orange-500 hover:bg-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition">
              Explore Cars
            </button>

            <button className="border border-gray-500 hover:border-orange-500 hover:text-orange-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg transition">
              Learn More
            </button>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">

          <img
            src={carImg}
            alt="Luxury Car"
            className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
          />

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Home;