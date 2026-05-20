import { useEffect, useState } from "react";
import carImg from "../assets/car0.png";
import AvailableCars from "../components/AvailableCars";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Car, Headset, Tag } from "lucide-react";

// লোডিং স্পিনার কম্পোনেন্ট
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative">
      <div className="w-12 h-12 rounded-full absolute border-4 border-dashed border-orange-500 animate-spin"></div>
      <div className="w-12 h-12 rounded-full border-4 border-orange-900/30"></div>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // ডেটা লোডিং সিমুলেশন
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: <ShieldCheck className="w-8 h-8 text-orange-500" />, title: "Verified Fleet", desc: "Every car in our platform undergoes rigorous safety and quality checks." },
    { icon: <Car className="w-8 h-8 text-orange-500" />, title: "Luxury Selection", desc: "Choose from a premium collection of supercars and luxury SUVs." },
    { icon: <Tag className="w-8 h-8 text-orange-500" />, title: "Best Price", desc: "Competitive daily rates with no hidden fees or surprise charges." },
    { icon: <Headset className="w-8 h-8 text-orange-500" />, title: "24/7 Support", desc: "Our dedicated team is ready to assist you anytime, anywhere." }
  ];

  const testimonials = [
    { name: "John Doe", role: "Business Traveler", text: "The booking process was seamless and the car quality was top-notch. Highly recommended!" },
    { name: "Sarah Smith", role: "Luxury Seeker", text: "DriveFleet exceeded my expectations. The supercar was delivered on time and in perfect condition." },
    { name: "Mike Ross", role: "Road Trip Enthusiast", text: "Best rental experience I've ever had. Affordable prices for such high-end luxury vehicles." }
  ];

  return (
    <div className="bg-[#020617] min-h-screen text-white overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-24 pb-16 md:py-0 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm mx-auto md:mx-0">
            ✨ Premium Car Rental Experience
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic leading-[1.1] tracking-tight font-sans text-center md:text-left">
            Drive Your <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-white text-transparent bg-clip-text drop-shadow-sm">
              Dream Car
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl mt-6 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
            Rent premium luxury cars at affordable prices with <span className="text-orange-500 font-semibold">DriveFleet</span>. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
            <button onClick={() => navigate("/explore-cars")} className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-md font-bold transition duration-300 shadow-lg shadow-orange-500/20 cursor-pointer text-white">
              Explore Fleet
            </button>
            <button onClick={() => navigate("/explore-cars")} className="border border-neutral-800 hover:border-orange-500/50 hover:bg-white/5 px-8 py-4 rounded-xl text-md font-semibold transition duration-300 backdrop-blur-sm text-gray-300 hover:text-white cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center relative z-10 w-full">
          <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-orange-600/20 to-amber-500/5 blur-[90px] rounded-full pointer-events-none" />
          <img src={carImg} alt="Luxury Car" className="relative w-full max-w-3xl object-contain drop-shadow-[0_30px_60px_rgba(249,115,22,0.15)]" />
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 px-4 border-t border-neutral-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Why Choose <span className="text-orange-500">DriveFleet?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <div key={index} className="bg-[#0f172a] p-8 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300 group hover:-translate-y-2">
                <div className="bg-orange-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="py-20 px-4 bg-[#090d16] border-t border-neutral-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              What Our <span className="text-orange-500">Customers Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((review, index) => (
              <div key={index} className="bg-[#0f172a] p-8 rounded-2xl border border-gray-800 hover:border-orange-500/30 transition-all duration-300">
                <div className="text-orange-500 mb-4 text-2xl">★★★★★</div>
                <p className="text-gray-300 italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-orange-500">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABLE CARS SECTION */}
      <div className="border-t border-neutral-900/40 bg-gradient-to-b from-[#020617] to-[#090d16] py-12">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <AvailableCars />
        )}
      </div>

    </div>
  );
};

export default Home;