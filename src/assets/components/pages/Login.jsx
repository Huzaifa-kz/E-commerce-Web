import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import Shope from "./images/Shope.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        localStorage.setItem("token", user.accessToken);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center mr-20 mb-20 h-full">
      <div className="mb-8 mr-48 mt-5">
        <img src={Shope} alt="shope" className="w-[52vw] h-[88vh]" />
      </div>
      <div>
        <form onSubmit={handleLogin} className="bg-white p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Log in to Exclusive</h2>
          <h1 className="mb-5">Enter your details below</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Phone Number"
            className="border-b border-gray-300 p-2 mb-4 w-full"
            required
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border-b border-gray-300 p-2 w-full"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
            </button>
          </div>

          <div className="flex items-center gap-9">
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded w-28 hover:bg-red-600"
            >
              Log in
            </button>
            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-red-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
