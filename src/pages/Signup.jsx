import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem(
      "signupUser",
      JSON.stringify({ name, email, password })
    );

    alert("Signup Successful");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <form
        onSubmit={handleSignup}
        className="w-96 bg-[#0f172a] p-8 rounded-xl shadow-lg"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Register
        </h1>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-3 mb-4 rounded bg-black outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 rounded bg-black outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full p-3 rounded bg-black outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-sm text-orange-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold"
        >
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