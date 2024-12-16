"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoTrash } from "react-icons/io5";
import { IoIosSync } from "react-icons/io"; // For loader icon

const RegistrationsTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch registrations
  const fetchRegistrations = async () => {
    try {
      const res = await fetch("/api/form", { method: "GET" });
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.data);
      } else {
        toast.error("Failed to fetch registrations");
      }
    } catch (error) {
      toast.error("Error fetching registrations");
    }
  };

  // Delete registration
  const deleteRegistration = async (id) => {
    try {
      setLoading(true);
      const res = await fetch("/api/form", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Registration deleted successfully");
        setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
      } else {
        toast.error(data.message || "Failed to delete registration");
      }
    } catch (error) {
      toast.error("Error deleting registration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="w-full px-4 py-6 overflow-hidden">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Registrations</h1>
      <div className="mb-4 text-right font-medium">
        Total Registrations:
        {registrations.length} {/* Display total count */}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-[15px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">School</th>
              <th className="border border-gray-300 p-2">Idea</th>
              <th className="border border-gray-300 p-2">Submitted At</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr key={registration._id}>
                <td className="border border-gray-300 p-2 text-center">
                  {index + 1} {/* Display row number */}
                </td>
                <td className="border border-gray-300 p-2">
                  {registration.firstName}
                </td>
                <td className="border border-gray-300 p-2">
                  {registration.lastName}
                </td>
                <td className="border border-gray-300 p-2">
                  {registration.email}
                </td>
                <td className="border border-gray-300 p-2">
                  {registration.school}
                </td>
                <td className="border border-gray-300 p-2">
                  {registration.idea}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(registration.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {loading === registration._id ? (
                    <IoIosSync className="animate-spin text-gray-500 text-2xl" />
                  ) : (
                    <IoTrash
                      onClick={() => deleteRegistration(registration._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer text-2xl"
                    />
                  )}
                  {/* <button
                    onClick={() => deleteRegistration(registration._id)}
                    className="text-red-600 hover:underline"
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button> */}

                  {/* <IoTrash
                    onClick={() => deleteRegistration(registration._id)}
                    className="text-red-600 hover:text-red-800"
                  /> */}
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center border border-gray-300 p-2"
                >
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationsTable;
