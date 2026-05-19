import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const signupUser = JSON.parse(localStorage.getItem("signupUser"));

    if (!signupUser) {
      alert("Please signup first");
      navigate("/signup");
      return;
    }

    if (
      signupUser.email === email &&
      signupUser.password === password
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify(signupUser)
      );

      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <form
        onSubmit={handleLogin}
        className="w-96 bg-[#0f172a] p-8 rounded-xl shadow-lg"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Login
        </h1>

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

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-orange-400 cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;