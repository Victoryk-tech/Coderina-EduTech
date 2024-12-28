import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import focus from "../../public/focus.jpg";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const Log = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Both email and password are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("api/auth/login", { email, password });

      const { user, message, token } = response.data;

      // Store username and token locally
      sessionStorage.setItem("username", user?.username || "");
      sessionStorage.setItem(
        "greeting",
        `Welcome back ${user?.username || ""}`
      );
      sessionStorage.setItem("token", token || "");

      toast.success(message || "Welcome! You have successfully logged in");

      // Redirect based on role
      router.push(user?.role === "admin" ? "/dashboard" : "/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex items-center justify-start bg-white">
      <Toaster />
      <div className="hidden md:block h-screen md:w-[50%]">
        <Image src={focus} alt="login" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center justify-center px-2 md:px-4 lg:px-16">
        <div className="min-h-screen flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full"
          >
            <h2 className="text-3xl text-center text-gray-800 mb-6 font-semibold">
              Sign In
            </h2>

            {/* Email Input */}
            <div className="relative mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
              <FaEnvelope
                className="absolute left-3 top-4 text-gray-500"
                aria-hidden="true"
              />
            </div>

            {/* Password Input */}
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-500 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full p-3 bg-indigo-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300 ${
                isSubmitting ? "bg-indigo-400 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg
                  className="w-6 h-6 mx-auto animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path d="M4 12h2a8 8 0 0 1 8 8v2" />
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Log;
