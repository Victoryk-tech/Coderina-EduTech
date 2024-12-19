//

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   if (!email || !password) {
  //     setError("Please fill in both fields.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("/api/auth/login", { email, password });

  //     if (response.status === 200) {
  //       const { user, token } = response.data;

  //       // Save token and user info in localStorage
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("username", user.username);
  //       localStorage.setItem("role", user.role);

  //       toast.success("Login successful!");

  //       // Redirect based on role
  //       if (user.role === "admin") {
  //         router.push(`/dashboard/overview?greeting=welcome`);
  //       } else {
  //         router.push("/");
  //       }
  //     }
  //   } catch (error) {
  //     const message = error.response?.data?.message || "An error occurred.";
  //     setError(message);
  //     toast.error(message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      // Save token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);
      localStorage.setItem("role", user.role);

      toast.success("Login successful!");
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      toast.error("Invalid credentials.");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } rounded`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
