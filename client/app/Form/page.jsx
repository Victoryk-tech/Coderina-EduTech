"use client";

import React, { useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const Page = () => {
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   school: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   ideaDescription: "",
  //   idea: "",
  //   gender: "Male",
  //   link1: "",
  //   link2: "",
  // });
  const [formValues, setFormValues] = useState({
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
  const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  // const [errors, setErrors] = useState({});

  const handleValidation = (values) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^[0-9]{11,12}$/;

    if (!values.firstName) errors.firstName = "First name is required";
    if (!values.lastName) errors.lastName = "Last name is required";
    if (!values.email || !emailPattern.test(formValues.email))
      errors.email = "Valid email is required";
    if (!values.school) errors.school = "School is required";
    if (!values.phone || !phonePattern.test(formValues.phone))
      errors.phone = "Valid phone number is required";
    if (!values.address) errors.address = "Address is required";
    if (!values.idea) errors.idea = "Idea name is required";
    if (!values.ideaDescription)
      errors.ideaDescription = "Idea description is required";
    if (!values.link1) errors.link1 = "Link to website is required";
    if (!values.link2) errors.link2 = "Link to documents is required";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name]; // Clear the error for the current field
      return updatedErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = handleValidation(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    toast.dismiss();
    //Ensure gender value matches expected format (capitalize first letter)

    const payload = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      school: formValues.school,
      email: formValues.email,
      phone: formValues.phone,
      address: formValues.address,
      ideaDescription: formValues.ideaDescription,
      idea: formValues.idea,
      gender: formValues.gender,
      link1: formValues.link1,
      link2: formValues.link2,
    };

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Backend Response:", data);
      setLoading(false);

      if (data.success) {
        toast.success("Form submitted successfully!");
        setFormValues({
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
        setFormErrors({});
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
                value={formValues.firstName}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  formErrors.firstName
                    ? "border-red-500 text-red-500 text-[12px]"
                    : ""
                }`}
                placeholder="Enter your first name"
              />
              <p className="text-sm text-red-600 pl-1 font-medium">
                {formErrors.firstName}
              </p>
            </div>

            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  formErrors.lastName ? "border-red-500" : ""
                }`}
                placeholder="Enter your last name"
              />
              <p className="text-sm text-red-600 pl-1 font-medium">
                {formErrors.lastName}
              </p>
            </div>

            <div>
              <label className="block mb-1">School</label>
              <input
                type="text"
                name="school"
                value={formValues.school}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  formErrors.school ? "border-red-500" : ""
                }`}
                placeholder="Enter your school"
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  formErrors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  formErrors.phone ? "border-red-500" : ""
                }`}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  formErrors.address ? "border-red-500" : ""
                }`}
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className="block mb-1">Gender</label>
              <div className="flex items-center space-x-4">
                {["Male", "female", "other"].map((gender) => (
                  <label key={gender} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formValues.gender === gender}
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
                value={formValues.idea}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  formErrors.idea ? "border-red-500" : ""
                }`}
                placeholder="What's your idea?"
              />
            </div>

            <div>
              <label className="block mb-1">Idea Description</label>
              <textarea
                name="ideaDescription"
                value={formValues.ideaDescription}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded-lg outline-none ${
                  formErrors.ideaDescription ? "border-red-500" : ""
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
                value={formValues.link1}
                onChange={handleChange}
                className="w-full p-2 rounded-lg outline-none "
                placeholder="Add URL (optional)"
              />
              <p className="border-red-500 text-[11px]">{formErrors.link1}</p>
            </div>

            <div>
              <label className="block mb-1">Link to Documents</label>
              <input
                type="url"
                name="link2"
                value={formValues.link2}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg outline-none ${
                  formErrors.link2 ? "border-red-500" : ""
                }`}
                placeholder="Add URL (optional)"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white rounded-3xl py-2 cursor-pointer px-4 text-[16px] hover:text-black hover:bg-white"
            >
              {loading ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
