"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import focus from "../../public/focus.jpg";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // For navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        const { token, user } = response.data; // Assuming user info is returned from backend
        const username = user?.username || "User"; // Fallback if username is not provided

        // Save the token and username
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        toast.success("Login successful!");
        router.push(`/dashboard/overview?greeting=welcome`); // Add query param for greeting
      }
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <Toaster />
      <div className="w-full h-full opacity-50">
        <Image
          src={focus}
          alt="imagee"
          className="h-full w-full object-cover"
        />
      </div>
      <div className=" p-6  w-full  max-w-md md:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded pr-10 outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? (
                  <span>&#128065;</span> // Eye emoji for "visible"
                ) : (
                  <span>&#128584;</span> // Eye-slash emoji for "hidden"
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 rounded ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </section>
  );
};

export default LoginForm;
