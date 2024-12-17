"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoTrash } from "react-icons/io5";
import { IoIosSync } from "react-icons/io"; // For loader icon
import { CiMenuKebab } from "react-icons/ci";

const RegistrationsTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null); // State to track the selected

  const handleOpenModal = (registration) => {
    setSelectedRegistration(registration); // Set the selected registration data
  };

  const handleCloseModal = () => {
    setSelectedRegistration(null); // Reset the selected registration data
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
    <div className="w-full px-4 py-6 overflow-hidden h-screen">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Registrations</h1>
      <div className="mb-4 text-right font-medium">
        Total Registrations:
        {registrations.length} {/* Display total count */}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-[14px]">
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
                    <IoIosSync className="animate-spin text-gray-500 text-xl" />
                  ) : (
                    <IoTrash
                      onClick={() => deleteRegistration(registration._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer text-xl"
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
                <td
                  onClick={() => handleOpenModal(registration)}
                  aria-label="View Registration Details"
                  className="border border-gray-300 p-2"
                >
                  <CiMenuKebab className="hover:text-green-600" />
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

// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { IoTrash } from "react-icons/io5";
// import { IoIosSync } from "react-icons/io"; // For loader icon
// import { CiMenuKebab } from "react-icons/ci";

// const RegistrationsTable = ({ registrations: propRegistrations }) => {
//   const [registrations, setRegistrations] = useState(propRegistrations);
//   const [loadingId, setLoadingId] = useState(null); // Track loading state for each registration
//   const [selectedRegistration, setSelectedRegistration] = useState(null); // State to track selected registration

//   const handleOpenModal = (registration) => {
//     setSelectedRegistration(registration); // Set the selected registration data
//   };

//   const handleCloseModal = () => {
//     setSelectedRegistration(null); // Reset the selected registration data
//   };

//   // Fetch registrations
//   const fetchRegistrations = async () => {
//     try {
//       const res = await fetch("/api/form", { method: "GET" });
//       const data = await res.json();
//       if (data.success) {
//         setRegistrations(data.data);
//       } else {
//         toast.error("Failed to fetch registrations");
//       }
//     } catch (error) {
//       toast.error("Error fetching registrations");
//     }
//   };

//   // Delete registration
//   const deleteRegistration = async (id) => {
//     try {
//       setLoadingId(id); // Set loading for this specific registration
//       const res = await fetch("/api/form", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Registration deleted successfully");
//         setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
//       } else {
//         toast.error(data.message || "Failed to delete registration");
//       }
//     } catch (error) {
//       toast.error("Error deleting registration");
//     } finally {
//       setLoadingId(null); // Reset loading state
//     }
//   };

//   useEffect(() => {
//     if (!propRegistrations || propRegistrations.length === 0) {
//       fetchRegistrations(); // Fetch registrations if prop is empty
//     }
//   }, [propRegistrations]);

//   return (
//     <div className="w-full px-4 py-6 overflow-hidden h-screen">
//       <Toaster />
//       <h1 className="text-2xl font-bold mb-4">Registrations</h1>
//       <div className="mb-4 text-right font-medium">
//         Total Registrations:
//         {registrations && registrations.length > 0
//           ? registrations.length
//           : 0}{" "}
//         {/* Display total count */}
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300 text-[14px]">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">#</th>
//               <th className="border border-gray-300 p-2">First Name</th>
//               <th className="border border-gray-300 p-2">Last Name</th>
//               <th className="border border-gray-300 p-2">Email</th>
//               <th className="border border-gray-300 p-2">School</th>
//               <th className="border border-gray-300 p-2">Idea</th>
//               <th className="border border-gray-300 p-2">Submitted At</th>
//               <th className="border border-gray-300 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {registrations.map((registration, index) => (
//               <tr key={registration._id}>
//                 <td className="border border-gray-300 p-2 text-center">
//                   {index + 1} {/* Display row number */}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {registration.firstName}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {registration.lastName}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {registration.email}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {registration.school}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {registration.idea}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {new Date(registration.createdAt).toLocaleString()}
//                 </td>
//                 <td className="border border-gray-300 p-2 text-center">
//                   {loadingId === registration._id ? (
//                     <IoIosSync className="animate-spin text-gray-500 text-xl" />
//                   ) : (
//                     <IoTrash
//                       onClick={() => deleteRegistration(registration._id)}
//                       className="text-red-600 hover:text-red-800 cursor-pointer text-xl"
//                       aria-label="Delete Registration"
//                     />
//                   )}
//                 </td>
//                 <td
//                   className="border border-gray-300 p-2"
//                   onClick={() => handleOpenModal(registration)}
//                   aria-label="View Registration Details"
//                 >
//                   <CiMenuKebab className="hover:text-green-600" />
//                 </td>
//               </tr>
//             ))}
//             {registrations.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="text-center border border-gray-300 p-2"
//                 >
//                   No registrations found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Modal */}
//         {selectedRegistration && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//               <h2 className="text-lg font-bold mb-4">Registration Details</h2>
//               <p>
//                 <strong>First Name:</strong> {selectedRegistration.firstName}
//               </p>
//               <p>
//                 <strong>Last Name:</strong> {selectedRegistration.lastName}
//               </p>
//               <p>
//                 <strong>School:</strong> {selectedRegistration.school}
//               </p>
//               <p>
//                 <strong>Email:</strong> {selectedRegistration.email}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {selectedRegistration.phone}
//               </p>
//               <p>
//                 <strong>Address:</strong> {selectedRegistration.address}
//               </p>
//               <p>
//                 <strong>Idea Description:</strong>{" "}
//                 {selectedRegistration.ideaDescription}
//               </p>
//               <p>
//                 <strong>Idea:</strong> {selectedRegistration.idea}
//               </p>
//               <p>
//                 <strong>Gender:</strong> {selectedRegistration.gender}
//               </p>
//               <p>
//                 <strong>Link 1:</strong> {selectedRegistration.link1}
//               </p>
//               <p>
//                 <strong>Link 2:</strong> {selectedRegistration.link2}
//               </p>
//               <p>
//                 <strong>Submitted At:</strong>{" "}
//                 {new Date(selectedRegistration.createdAt).toLocaleString()}
//               </p>
//               <div className="mt-4 text-right">
//                 <button
//                   onClick={handleCloseModal}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegistrationsTable;
