"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ProfilePage = ({ userId }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    profilePicture: null,
    imagePreview: null,
  });
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();
  const router = useRouter();

  const { username, email, address, phone, profilePicture, imagePreview } =
    formData;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        const user = response.data;

        setFormData({
          ...formData,
          username: user.username,
          email: user.email,
          address: user.address,
          phone: user.phone,
          profilePicture: user.profilePicture,
          imagePreview: null,
        });
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleClick = () => inputRef.current.click();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          profilePicture: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("address", address);
      data.append("phone", phone);
      if (profilePicture) data.append("profilePicture", profilePicture);

      const response = await axios.patch(`/api/user/${userId}`, data);
      toast.success("Profile updated successfully!");
      setFormData({
        ...formData,
        profilePicture: response.data.profilePicture,
        imagePreview: null,
      });
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="text-sm bg-white py-10 px-4 h-full flex flex-col justify-center items-center">
      <Toaster />
      <div className="p-5 h-full rounded max-w-md md:max-w-lg">
        <form onSubmit={handleSubmit}>
          <div onClick={handleClick} className="cursor-pointer">
            <div className="h-40 w-40 rounded-full border-dashed border-2 border-gray-300 overflow-hidden">
              <Image
                src={imagePreview || profilePicture || "/default-profile.jpg"}
                alt="Profile Picture"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mt-3"
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mt-3"
          />
          <input
            type="text"
            name="address"
            value={address}
            placeholder="Address"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mt-3"
          />
          <input
            type="text"
            name="phone"
            value={phone}
            placeholder="Phone"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mt-3"
          />
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-green-600 text-white rounded shadow hover:shadow-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
