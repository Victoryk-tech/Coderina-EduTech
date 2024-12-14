"use client";
import { useEffect, useRef, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MdKeyboardArrowDown } from "react-icons/md";
import Modal from "../component/Modal";
import LineChart from "../component/LineChart";

const SubscriberTable = ({ subscribers }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      const allSubscribers = subscribers.map((subscriber) => subscriber.email);
      setSelectedSubscribers(allSubscribers);
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleModalOpen = (event) => {
    const iconRect = event.target.getBoundingClientRect();
    setModalPosition({
      top: iconRect.bottom + window.scrollY,
      left: iconRect.left + window.scrollX,
    });
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  const handleSubscriberSelect = (email) => {
    if (selectedSubscribers.includes(email)) {
      setSelectedSubscribers(
        selectedSubscribers.filter((sub) => sub !== email)
      );
    } else {
      setSelectedSubscribers([...selectedSubscribers, email]);
    }
  };

  return (
    <table className="min-w-full border border-border">
      <thead>
        <tr className="hover:bg-gray-300">
          <th className="text-gray-600 border-b border-border p-2 text-left">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="mr-8"
            />
            Subscriber
          </th>
          <th className="text-gray-600 border-b border-border p-2 text-left">
            Subscription type
            <MdKeyboardArrowDown className="inline ml-1" />
          </th>
          <th className="text-gray-600 border-b border-border p-2 text-left">
            Activity
          </th>
          <th className="text-gray-600 border-b border-border p-2 text-left">
            Subscription date
          </th>
          <th className="text-gray-600 border-b border-border p-2 text-left">
            Revenue
          </th>
          <th className="text-gray-600 border-b border-border p-2 text-left">
            Days active (last 30 days)
          </th>
        </tr>
      </thead>
      <tbody>
        {subscribers.map((subscriber, index) => (
          <tr key={index} className="hover:bg-gray-200">
            <td className="border-b border-border p-2">
              <input
                type="checkbox"
                checked={selectedSubscribers.includes(subscriber.email)}
                onChange={() => handleSubscriberSelect(subscriber.email)}
                className="mr-8"
              />
              <PersonIcon className="h-5 w-5 mr-2" style={{ color: "gray" }} />
              {subscriber.email}
            </td>
            <td className="border-b border-border p-2">{subscriber.type}</td>
            <td className="border-b border-border p-2">
              {subscriber.activity}
            </td>
            <td className="border-b border-border p-2">
              {new Date(subscriber.subscribedAt).toLocaleString()}
            </td>
            <td className="border-b border-border p-2">{subscriber.revenue}</td>
            <td>{subscriber.daysActive}</td>
            <td>
              <MoreHorizIcon
                ref={iconRef}
                onClick={handleModalOpen}
                style={{
                  fontSize: "24px",
                  color: "gray",
                  cursor: "pointer",
                }}
              />
              <Modal
                isOpen={modalOpen}
                onClose={handleModalClose}
                position={modalPosition}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SubscribersTable = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch("/api/subscribers");
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };
    fetchSubscribers();
  }, []);

  const filteredSubscribers = search
    ? subscribers.filter((subscriber) =>
        subscriber.email.toLowerCase().includes(search.toLowerCase())
      )
    : subscribers;

  return (
    <div>
      <h1 className="text-2xl m-6 font-bold">Subscribers Dashboard</h1>
      <input
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-border rounded-lg p-2 w-full max-w-md mb-4"
      />
      <SubscriberTable subscribers={filteredSubscribers} />
    </div>
  );
};

export default SubscribersTable;
