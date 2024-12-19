"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  username: "",
  email: "",
  address: "",
  phone: "",
  profilePicture: null,
  imagePreview: null,
};

const ProfilePage = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const { username, email, address, phone, profilePicture, imagePreview } =
    formData;

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users"); // Replace with actual endpoint
        const currentUser = response.data;

        setFormData({
          username: currentUser.username || "",
          email: currentUser.email || "",
          address: currentUser.address || "",
          phone: currentUser.phone || "",
          profilePicture: currentUser.profilePicture || null,
          imagePreview: null,
        });
      } catch (error) {
        toast.error("Failed to load user data.");
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = () => inputRef.current.click();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("address", address);
      if (profilePicture) data.append("profilePicture", profilePicture);

      const response = await axios.patch("/api/users", data); // Replace with actual endpoint
      toast.success("Profile updated successfully!");

      // Update form with latest data
      setFormData({
        ...formData,
        profilePicture: response.data.profilePicture,
        imagePreview: null,
      });
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const profileSrc = imagePreview || profilePicture || "/public/focus.jpg";

  return (
    <section className="text-sm bg-white py-10 px-4  h-full flex flex-col justify-center items-center">
      <Toaster />
      <div className=" p-5 h-full rounded max-w-md md:max-w-lg">
        <form onSubmit={handleSubmit}>
          {/* <div className="text-center">
            <div className="cursor-pointer" aria-label="Change profile picture">
              <div
                onClick={handleClick}
                className="h-40 w-40 rounded-full border-dashed border-2 border-gray-300 overflow-hidden"
              >
                <Image
                  src={profileSrc}
                  alt={`${username || "User"}'s profile`}
                  fill
                  className="h-full w-full object-cover"
                />

                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>
          </div> */}

          <div onClick={handleClick} className="cursor-pointer">
            <div className="h-40 w-40 rounded-full border-dashed border-2 border-gray-300 overflow-hidden">
              <Image
                src={profileSrc}
                alt={`${username || "User"}'s profile`}
                className="h-full w-full object-cover"
                width={40}
                height={40}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </div>

          <div className="mt-4 space-y-3">
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="address"
              value={address}
              placeholder="Address"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="phone"
              value={phone}
              placeholder="Phone"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 p-3 bg-green-600 text-white rounded shadow hover:shadow-lg"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
