import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../api/authApi";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ name, email, password });

      toast.success("Signup Successful 🚀");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <form onSubmit={handleSignup} className="w-96 bg-[#0f172a] p-8 rounded-xl">

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Register
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-3 mb-4 bg-black rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 bg-black rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-6">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full p-3 bg-black rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-orange-400 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>

        </div>

        <button className="w-full bg-orange-500 py-3 rounded">
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm">
          Already have account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-400 cursor-pointer"
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
};

export default Signup;