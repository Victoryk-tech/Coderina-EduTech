"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoClose, IoSend, IoTrash } from "react-icons/io5";
import { IoIosSync } from "react-icons/io"; // Loader icon
import LineChart from "../component/LineChart";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SendMessage from "./SendMessage";

const SubscribersTable = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null); // Track the ID being deleted
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);

  // Handle selecting all subscribers
  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    if (!selectAll) {
      // Select all subscribers and store their email addresses
      setSelectedSubscribers(subscribers.map((subscriber) => subscriber.email));
    } else {
      // Deselect all subscribers
      setSelectedSubscribers([]);
    }
  };

  // Handle selecting a specific subscriber
  const handleSubscriberSelect = (email) => {
    setSelectedSubscribers((prevSelected) => {
      if (prevSelected.includes(email)) {
        return prevSelected.filter((sub) => sub !== email);
      } else {
        return [...prevSelected, email];
      }
    });
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Fetch subscribers
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/subscribers", { method: "GET" });
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.subscribers); // Set the subscribers data
      } else {
        toast.error("Failed to fetch subscribers");
      }
    } catch (error) {
      toast.error("Error fetching subscribers");
    } finally {
      setLoading(false);
    }
  };

  // Delete subscriber
  const deleteSubscriber = async (id) => {
    try {
      setDeleting(id); // Set the deleting ID
      const res = await fetch("/api/subscribers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Subscriber deleted successfully");
        setSubscribers((prev) =>
          prev.filter((subscriber) => subscriber._id !== id)
        );
      } else {
        toast.error(data.message || "Failed to delete subscriber");
      }
    } catch (error) {
      toast.error("Error deleting subscriber");
    } finally {
      setDeleting(null); // Reset the deleting ID
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="w-full px-4 py-10 h-full bg-white">
      <Toaster />

      <h1 className="text-2xl font-bold mb-4">Subscribers</h1>
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-12 w-full max-w-screen-lg px-4">
          {/* Card 1 */}
          <div className="text-lg font-semibold p-4 h-auto w-[300px] md:w-60 rounded-lg bg-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 text-lg">All Subscribers</h2>
                <p className="text-gray-600 text-2xl">{subscribers.length}</p>
              </div>
              <PeopleAltIcon className="h-10 w-10" style={{ color: "gray" }} />
            </div>
          </div>
          {/* Card 2 */}
          <div className="text-lg font-semibold p-4 h-auto w-[300px] md:w-60 rounded-lg bg-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 text-lg font-semibold">
                  All Messages sent
                </h2>
                <p className="text-2xl">{subscribers.length}</p>
              </div>
              <PeopleAltIcon className="h-10 w-10" style={{ color: "gray" }} />
            </div>
          </div>
          {/* Card 3 */}
          <div className="text-lg font-semibold p-4 h-auto w-[300px] md:w-60 rounded-lg bg-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-600 text-lg font-semibold">
                  Most Subscribered month
                </h2>
                <p className="text-2xl">{subscribers.length}</p>
              </div>
              <PeopleAltIcon className="h-10 w-10" style={{ color: "gray" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <LineChart />
      </div>

      {/* Send update button, enabled only if there are selected subscribers */}
      <h1
        className={`mb-2 text-right font-medium p-3 w-[10rem] text-white rounded-2xl bg-red-700 cursor-pointer ${
          selectedSubscribers.length > 0
            ? "opacity-100"
            : "opacity-50 cursor-not-allowed"
        }`}
        onClick={toggleModal}
        aria-label="Send update"
        disabled={selectedSubscribers.length === 0}
      >
        <p className="text-[14px] text-nowrap text-center flex items-center justify-between">
          Send update <IoSend />
        </p>
      </h1>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[80%] md:w-[40%]">
            <p
              className="absolute top-2 right-2 text-black text-xl font-bold rounded-2xl p-2 bg-white"
              onClick={toggleModal}
              aria-label="Close modal"
            >
              <IoClose />
            </p>
            <SendMessage selectedSubscribers={selectedSubscribers} />
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    aria-label="Select all subscribers"
                  />
                </th>
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Subscribed At</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={subscriber._id}>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedSubscribers.includes(subscriber.email)}
                      onChange={() => handleSubscriberSelect(subscriber.email)}
                      aria-label={`Select subscriber ${subscriber.email}`}
                    />
                  </td>

                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {subscriber.email}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(subscriber.subscribedAt).toLocaleString()}
                  </td>

                  <td className="border border-gray-300 p-2 text-center">
                    {deleting === subscriber._id ? (
                      <IoIosSync className="animate-spin text-gray-500 text-xl" />
                    ) : (
                      <IoTrash
                        onClick={() => deleteSubscriber(subscriber._id)}
                        aria-label={`Delete subscriber ${subscriber.email}`}
                        className="text-red-600 hover:text-red-800 cursor-pointer text-xl"
                      />
                    )}
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center border border-gray-300 p-2"
                  >
                    No subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscribersTable;
