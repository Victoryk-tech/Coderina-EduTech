"use client";

import React, { Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoPerson, IoSchool, IoTrash } from "react-icons/io5";
import { IoIosSync } from "react-icons/io"; // For loader icon
import { CiMenuKebab } from "react-icons/ci";
import { HiDownload } from "react-icons/hi";
import { FiClock, FiDatabase } from "react-icons/fi";

const RegistrationsTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track the ID being deleted
  const [selectedRegistration, setSelectedRegistration] = useState(null); // Modal state
  const [showMenu, setShowMenu] = useState(false);
  const handleOpenModal = (registration) => {
    setSelectedRegistration(registration);
  };

  const handleCloseModal = () => {
    setSelectedRegistration(null);
  };

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
      setLoadingId(id); // Set loading state for the current registration
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
      setLoadingId(null);
    }
  };

  // Download individual registration details
  const downloadDetails = (registration) => {
    const fileName = `${registration.firstName}_${registration.lastName}_details.txt`;
    const details = `
    First Name: ${registration.firstName}
    Last Name: ${registration.lastName}
    Email: ${registration.email}
    School: ${registration.school}
    Phone: ${registration.phone || "N/A"}
    Address: ${registration.address || "N/A"}
    Idea: ${registration.idea}
    Idea Description: ${registration.ideaDescription || "N/A"}
    Gender: ${registration.gender || "N/A"}
    Link 1: ${registration.link1 || "N/A"}
    Link 2: ${registration.link2 || "N/A"}
    Submitted At: ${new Date(registration.createdAt).toLocaleString()}
  `;

    // Create a Blob and trigger download
    const blob = new Blob([details], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to download
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  // Convert registrations to CSV
  const downloadCSV = () => {
    if (registrations.length === 0) {
      toast.error("No registrations to download");
      return;
    }

    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "School",
      "Phone",
      "Address",
      "Idea",
      "Idea Description",
      "Gender",
      "Link 1",
      "Link 2",
      "Submitted At",
    ];

    const rows = registrations.map((reg) => [
      reg.firstName,
      reg.lastName,
      reg.email,
      reg.school,
      reg.phone,
      reg.address,
      reg.idea,
      reg.ideaDescription,
      reg.gender,
      reg.link1,
      reg.link2,
      new Date(reg.createdAt).toLocaleString(),
    ]);

    // Combine headers and rows into a CSV string
    const csvContent = [
      headers.join(","), // Header row
      ...rows.map((row) => row.map((field) => `"${field}"`).join(",")), // Data rows
    ].join("\n");

    // Create a Blob and a downloadable link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "registrations.csv";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="w-full  md:px-2 lg:px-4 py-6 overflow-hidden h-full">
      <Toaster />

      <div>
        <h1 className="text-2xl font-bold mb-4">Registrations</h1>
        <div className="mb-4 text-right font-medium">
          Total Registrations: {registrations.length}
        </div>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={downloadCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Download CSV
          </button>
        </div>
        <div className="">
          <table className="hidden md:block table-auto w-full border-collapse border border-gray-300 text-[14px]">
            <thead className="">
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
                <tr key={registration._id} className="text-[13px]">
                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1}
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

                  <td
                    aria-label="View Registration Details"
                    className="border border-gray-300 p-2 cursor-pointer"
                  >
                    <span className="">
                      <CiMenuKebab
                        className="hover:text-green-600"
                        onClick={() => setShowMenu(!showMenu)}
                      />
                    </span>

                    {/* three icons option */}

                    {showMenu && (
                      <div className="px-3 absolute bottom-16 right-3  w-32 bg-white shadow rounded-md py-2">
                        <div className="flex flex-col items-start justify-start gap-y-2 pb-2">
                          {loadingId === registration._id ? (
                            <IoIosSync className="animate-spin text-gray-500 text-xl" />
                          ) : (
                            <div
                              className="flex items-center space-x-1 text-red-600 "
                              onClick={() =>
                                deleteRegistration(registration._id)
                              }
                            >
                              <p className="text-[15px] font-semibold  hover:text-red-800 cursor-pointer">
                                Delete
                              </p>
                              <IoTrash className="text-red-600 hover:text-red-800 cursor-pointer text-lg" />
                            </div>
                          )}

                          <div
                            onClick={() => downloadDetails(registration)}
                            className="flex items-center space-x-1 text-blue-500 "
                          >
                            <p className="text-[15px] font-semibold  hover:text-blue-800 cursor-pointer">
                              Download
                            </p>
                            <HiDownload
                              className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                              title="Download Details"
                            />
                          </div>
                        </div>

                        <div
                          onClick={() => handleOpenModal(registration)}
                          className="flex items-center space-x-1 text-green-500 "
                        >
                          <p className="text-[15px] font-semibold  hover:text-green-800 cursor-pointer">
                            Details
                          </p>
                          <HiDownload
                            className="text-green-500 hover:text-green-700 cursor-pointer text-xl"
                            title="Download Details"
                          />
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center border border-gray-300 p-2"
                  >
                    No registrations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* cards for small screen */}
        <div className="block md:hidden space-y-3">
          {registrations.map((registration, index) => (
            <div
              key={registration._id}
              className="border cursor-pointer border-gray-200 p-2 rounded-lg w-[320px]"
            >
              <div className="border cursor-pointer border-gray-200 p-2 space-y-1 rounded-lg w-[300px] hover:bg-gray-100 ">
                <div className="flex items-center justify-start space-x-1">
                  <IoPerson />
                  <p className="">{registration.firstName}</p>
                </div>
                <div className="flex items-center justify-start space-x-1">
                  <IoPerson />
                  <p>{registration.lastName}</p>
                </div>
                <div className="flex items-center justify-start space-x-1">
                  <IoSchool />
                  <p>{registration.school}</p>
                </div>
                <div className="flex items-center justify-start space-x-1">
                  <FiClock />
                  <p> {new Date(registration.createdAt).toLocaleString()}</p>
                </div>

                <div className="flex  items-center justify-start gap-x-3 py-3">
                  {loadingId === registration._id ? (
                    <IoIosSync className="animate-spin text-gray-500 text-xl" />
                  ) : (
                    <div
                      className="flex items-center space-x-1 text-red-600 "
                      onClick={() => deleteRegistration(registration._id)}
                    >
                      <IoTrash className="text-red-600 hover:text-red-800 cursor-pointer text-lg" />
                    </div>
                  )}

                  <div
                    onClick={() => downloadDetails(registration)}
                    className="flex items-center space-x-1 text-blue-500 "
                  >
                    <HiDownload
                      className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                      title="Download Details"
                    />
                  </div>

                  <div
                    onClick={() => handleOpenModal(registration)}
                    className="flex items-center space-x-1 text-green-500 "
                  >
                    <FiDatabase
                      className="text-green-500 hover:text-green-700 cursor-pointer text-xl"
                      title="Download Details"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}{" "}
          {registrations.length === 0 && (
            <div>
              <h2
                colSpan={8}
                className="text-center border border-gray-300 p-2"
              >
                No registrations found
              </h2>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedRegistration && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-lg font-bold mb-4">Registration Details</h2>
              <p>
                <strong>First Name:</strong> {selectedRegistration.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedRegistration.lastName}
              </p>
              <p>
                <strong>School:</strong> {selectedRegistration.school}
              </p>
              <p>
                <strong>Email:</strong> {selectedRegistration.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRegistration.phone}
              </p>
              <p>
                <strong>Idea:</strong> {selectedRegistration.idea}
              </p>
              <p>
                <strong>Address:</strong> {selectedRegistration.address}
              </p>

              <p>
                <strong>Gender:</strong> {selectedRegistration.gender}
              </p>
              <p>
                <strong>Link 1:</strong> {selectedRegistration.link1}
              </p>
              <p>
                <strong>Link 2:</strong> {selectedRegistration.link2}
              </p>
              <p>
                <strong>Idea Description:</strong>{" "}
                {selectedRegistration.ideaDescription}
              </p>
              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(selectedRegistration.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 text-right">
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationsTable;

{
  /* <td
onClick={() => setShowMenu(!showMenu)}
aria-label="View Registration Details"
className="border border-gray-300 p-2 cursor-pointer relative"
>
<CiMenuKebab className="hover:text-green-600" />

{/* Menu Options */
}
// {showMenu && (
//   <div className="absolute right-8 top-6 mt-2 w-36 bg-white shadow-lg rounded-lg py-2 z-10">
//     <div className="flex flex-col items-start justify-start gap-y-2 pb-2">
//       {loadingId === registration._id ? (
//         <IoIosSync className="animate-spin text-gray-500 text-xl" />
//       ) : (
//         <div
//           className="flex items-center space-x-1 text-red-600"
//           onClick={() =>
//             deleteRegistration(registration._id)
//           }
//         >
//           <p className="text-[15px] font-semibold hover:text-red-800 cursor-pointer">
//             Delete
//           </p>
//           <IoTrash className="text-red-600 hover:text-red-800 cursor-pointer text-lg" />
//         </div>
//       )}

//       <div
//         onClick={() => downloadDetails(registration)}
//         className="flex items-center space-x-1 text-blue-500"
//       >
//         <p className="text-[15px] font-semibold hover:text-blue-800 cursor-pointer">
//           Download
//         </p>
//         <HiDownload
//           className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
//           title="Download Details"
//         />
//       </div>
//     </div>

//     <div
//       onClick={() => handleOpenModal(registration)}
//       className="flex items-center space-x-1 text-green-500"
//     >
//       <p className="text-[15px] font-semibold hover:text-green-800 cursor-pointer">
//         Details
//       </p>
//       <HiDownload
//         className="text-green-500 hover:text-green-700 cursor-pointer text-xl"
//         title="Details"
//       />
//     </div>
//   </div>
// )}

// {/* Modal */}
// {showModal && (
//   <div className="absolute right-[10rem] top-6 bg-white shadow-xl rounded-lg w-96 p-4 z-20">
//     <h3 className="text-lg font-bold">
//       Registration Details
//     </h3>
//     <p className="text-sm text-gray-600">
//       Here are the details for this registration:
//     </p>
//     {/* Add your registration details here */}
//     <button
//       onClick={() => setShowModal(false)}
//       className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//     >
//       Close
//     </button>
//   </div>
// )}
//</td>
