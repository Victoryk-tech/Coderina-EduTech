"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  email: "",
  password: "",
  username: "",
};
const SignInPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter(); // Initialize useRouter
  const { email, password, username } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/users", formData);

      if (res.status === 201) {
        const { token } = res.data;
        localStorage.setItem("token", token); // Store token in localStorage
        localStorage.setItem("username", user.username);
        toast.success("User created successfully!");
        setFormData(initialState);

        router.push(`/dashboard/overview?greeting=hello`);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "An error occurred during sign-in.";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-4 bg-gray-100 h-screen flex flex-col justify-center items-center">
      <Toaster />
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 mt-2 text-center">{errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default SignInPage;
