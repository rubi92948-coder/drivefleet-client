import carImg from "../assets/car0.png";
import AvailableCars from "../components/AvailableCars";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#020617] min-h-screen text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col-reverse md:flex-row items-center justify-between gap-10 -mt-16 md:-mt-24">

        {/* LEFT TEXT */}
        <div className="flex-1 text-center md:text-left">

          {/* UPDATED TEXT STYLE */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold italic leading-tight tracking-tight font-sans md:ml-10 lg:ml-20 text-center md:text-left">
  Drive Your <br className="hidden md:block" />
  Dream Car
</h1>

          <p className="text-gray-300 text-lg md:text-xl mt-6 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Rent premium luxury cars at affordable prices with DriveFleet.
            Experience comfort, speed, and elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <button
  onClick={() => navigate("/explore-cars")}
  className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg shadow-orange-500/20"
>
  Explore Cars
</button>

<button className="border border-gray-600 hover:border-orange-500 hover:text-orange-400 px-8 py-4 rounded-2xl text-lg transition duration-300 backdrop-blur-sm">
  Learn More
</button>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center items-center relative">

          <div className="absolute w-[500px] h-[500px] bg-orange-500/10 blur-3xl rounded-full"></div>

          <img
            src={carImg}
            alt="Luxury Car"
            className="relative w-full max-w-sm sm:max-w-lg md:max-w-2xl object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] hover:scale-105 transition duration-500"
          />

        </div>

      </section>

      <AvailableCars />

    </div>
  );
};

export default Home;