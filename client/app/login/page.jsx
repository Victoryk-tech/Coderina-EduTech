//

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      // Store the username and greeting message in localStorage
      localStorage.setItem("username", response.data.user.username); // Store the username
      localStorage.setItem(
        "greeting",
        `Welcome back ${response.data.user.username}`
      );
      toast.success(response.data.message);

      // Save token to local storage or context
      localStorage.setItem("token", response.data.token);

      // Redirect based on role
      if (response.data.user.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignInForm;
