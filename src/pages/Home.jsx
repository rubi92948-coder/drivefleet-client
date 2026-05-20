import carImg from "../assets/car0.png";
import AvailableCars from "../components/AvailableCars";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#020617] min-h-screen text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-24 pb-16 md:py-0 relative">
        
        {/* Decorative background grid pattern for top tier premium feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* LEFT TEXT CONTENT */}
        <div className="flex-1 text-center md:text-left z-10">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm mx-auto md:mx-0">
            ✨ Premium Car Rental Experience
          </div>

          {/* DYNAMIC HEADLINE */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic leading-[1.1] tracking-tight font-sans text-center md:text-left">
            Drive Your <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-white text-transparent bg-clip-text drop-shadow-sm">
              Dream Car
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl mt-6 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
            Rent premium luxury cars at affordable prices with <span className="text-orange-500 font-semibold">DriveFleet</span>. 
            Experience absolute comfort, blistering speed, and unmatched elegance.
          </p>

          {/* CALL TO ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
            <button
              onClick={() => navigate("/explore-cars")}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-md font-bold transition duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 cursor-pointer text-white"
            >
              Explore Fleet
            </button>

            <button 
              onClick={() => navigate("/explore-cars")}
              className="border border-neutral-800 hover:border-orange-500/50 hover:bg-white/5 px-8 py-4 rounded-xl text-md font-semibold transition duration-300 backdrop-blur-sm text-gray-300 hover:text-white cursor-pointer"
            >
              Learn More
            </button>
          </div>

          {/* PREMIUM TRUST METRICS / STATS SHOWCASE */}
          <div className="grid grid-cols-3 gap-4 max-w-md pt-8 border-t border-neutral-900/60 mx-auto md:mx-0">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white italic">5K+</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Happy Rents</p>
            </div>
            <div className="border-l border-neutral-900 pl-4">
              <p className="text-2xl sm:text-3xl font-black text-orange-500 italic">50+</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Luxury Cars</p>
            </div>
            <div className="border-l border-neutral-900 pl-4">
              <p className="text-2xl sm:text-3xl font-black text-white italic">20+</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Cities Cover</p>
            </div>
          </div>

        </div>

        {/* RIGHT IMAGE WITH AMBIENT LIGHTING */}
        <div className="flex-1 flex justify-center items-center relative z-10 w-full">

          {/* Enhanced Neon Underglow Glow Background */}
          <div className="absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gradient-to-tr from-orange-600/20 to-amber-500/5 blur-[90px] rounded-full pointer-events-none" />

          {/* Luxury Car Image Component */}
          <img
            src={carImg}
            alt="Luxury Car"
            className="relative w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl object-contain drop-shadow-[0_30px_60px_rgba(249,115,22,0.15)] hover:scale-[1.03] transition-transform duration-700 select-none pointer-events-none"
          />

          {/* Subtle reflection floor line */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent blur-sm" />
        </div>

      </section>

      {/* AVAILABLE CARS SECTION */}
      <div className="border-t border-neutral-900/40 bg-gradient-to-b from-[#020617] to-[#090d16]">
        <AvailableCars />
      </div>

    </div>
  );
};

export default Home;