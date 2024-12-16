"use client";

import React, { useState } from "react";
import CustomButton from "../Home/CustomButton";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    school: "",
    email: "",
    phone: "",
    address: "",
    ideaDescription: "",
    idea: "",
    gender: "Male",
    link1: "",
    link2: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^[0-9]{11,12}$/;

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email || !emailPattern.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.school) newErrors.school = "School is required";
    if (!formData.phone || !phonePattern.test(formData.phone))
      newErrors.phone = "Valid phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.idea) newErrors.idea = "Idea name is required";
    if (!formData.ideaDescription)
      newErrors.ideaDescription = "Idea description is required";
    if (!formData.link1) newErrors.link1 = "Link to website is required";
    if (!formData.link2) newErrors.link2 = "Link to documents is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    setLoading(true);
    toast.dismiss();

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Backend Response:", data);
      setLoading(false);

      if (data.success) {
        toast.success("Form submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          school: "",
          email: "",
          phone: "",
          address: "",
          ideaDescription: "",
          idea: "",
          gender: "Male",
          link1: "",
          link2: "",
        });
      } else {
        toast.error(data.error || "Submission failed!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full font-Geist px-4 lg:px-20 py-8 bg-white">
      <Toaster />
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h4 className="font-bold lg:text-2xl">
            Register for the Coderina® University Challenge (COUCH)
          </h4>
          <p className="text-base">Fill the form to register</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#FDEFD9] p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.firstName ? "border-red-500" : ""
                }`}
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.lastName ? "border-red-500" : ""
                }`}
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label className="block mb-1">School</label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.school ? "border-red-500" : ""
                }`}
                placeholder="Enter your school"
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.address ? "border-red-500" : ""
                }`}
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className="block mb-1">Gender</label>
              <div className="flex items-center space-x-4">
                {["Male", "Female", "Other"].map((gender) => (
                  <label key={gender} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                    />
                    <span>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1">Idea Name</label>
              <input
                type="text"
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.idea ? "border-red-500" : ""
                }`}
                placeholder="What's your idea?"
              />
            </div>

            <div>
              <label className="block mb-1">Idea Description</label>
              <textarea
                name="ideaDescription"
                value={formData.ideaDescription}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.ideaDescription ? "border-red-500" : ""
                }`}
                rows={4}
                placeholder="What's your idea about?"
              ></textarea>
            </div>

            <div>
              <label className="block mb-1">Link to Website</label>
              <input
                type="url"
                name="link1"
                value={formData.link1}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.link1 ? "border-red-500" : ""
                }`}
                placeholder="Add URL (optional)"
              />
            </div>

            <div>
              <label className="block mb-1">Link to Documents</label>
              <input
                type="url"
                name="link2"
                value={formData.link2}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg outline-none ${
                  errors.link2 ? "border-red-500" : ""
                }`}
                placeholder="Add URL (optional)"
              />
            </div>
          </div>

          <div className="mt-6">
            <button disabled={loading}>
              {loading ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
