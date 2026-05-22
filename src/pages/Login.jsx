import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        email,
        password,
      });

      // ✅ FIXED
      const userData = {
        id: res.data.user.id,
        token: res.data.token,
      };

      // 🔥 NEW FIX (IMPORTANT)
      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);

      toast.success("Login Successful 🚀");

      navigate("/");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <form
        onSubmit={handleLogin}
        className="w-96 bg-[#0f172a] p-8 rounded-xl"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Login
        </h1>

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
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-3 text-sm text-orange-400 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>

        </div>

        <button className="w-full bg-orange-500 py-3 rounded">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-orange-400 cursor-pointer"
          >
            Register
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;