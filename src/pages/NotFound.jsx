import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-6">
      <div className="text-center space-y-6">
        {/* 404 Animation */}
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 animate-pulse">
          404
        </h1>
        
        <h2 className="text-3xl font-bold">Page Not Found</h2>
        <p className="text-gray-400 max-w-md">
          Sorry! The page you are looking for does not exist on our server. Please go back to the home page.
        </p>

        {/* Back to Home Button */}
        <button 
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-orange-500/20"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;