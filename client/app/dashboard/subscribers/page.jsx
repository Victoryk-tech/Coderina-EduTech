"use client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import FilterListIcon from "@mui/icons-material/FilterList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MdKeyboardArrowDown, MdCalendarToday } from "react-icons/md";
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
      // Select all subscribers
      const allSubscribers = subscribers.map((subscriber) => subscriber.email);
      setSelectedSubscribers(allSubscribers);
    } else {
      // Deselect all subscribers
      setSelectedSubscribers([]);
    }
  };

  const handleModalOpen = (event) => {
    const iconRect = event.target.getBoundingClientRect(); // Get icon's position
    setModalPosition({
      top: iconRect.bottom + window.scrollY,
      left: iconRect.left + window.scrollX,
    });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
    <>
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
              <MdKeyboardArrowDown className="inline ml-1" />{" "}
              {/* Icon beside "Subscription type" */}
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
              Days active(last 30 days)
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
                <PersonIcon
                  className="h-5 w-5 mr-2"
                  style={{ color: "gray" }}
                />
                {subscriber.email}
              </td>
              <td className="border-b border-border p-2">{subscriber.type}</td>
              <td className="border-b border-border p-2">
                {subscriber.activity}
              </td>
              <td className="border-b border-border p-2">{subscriber.date}</td>
              <td className="border-b border-border p-2">
                {subscriber.revenue}
              </td>
              <td>{subscriber.daysActive}</td>
              <td>
                <MoreHorizIcon
                  ref={iconRef}
                  onClick={handleModalOpen}
                  style={{
                    marginRight: "200px",
                    fontSize: "40px",
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
    </>
  );
};

const SubscribersTable = () => {
  const [subscribers, setSubscribers] = useState([
    {
      email: "kvngjohny10@gmail.com",
      type: "Author",
      activity: "Active",
      date: "March 14th, 2024",
      revenue: "$0.00",
      daysActive: 2,
    },
  ]);

  const [premiumSubscribers, setPremiumSubscribers] = useState([]);
  const [basicSubscribers, setBasicSubscribers] = useState([]);

  const user = { name: "Jane", email: "jane@mail.com" };

  const searchHandler = (e) => {
    const search = e.target.value;
    if (search === "") {
      setSubscribers(subscribers);
    } else {
      const filteredSubscribers = subscribers.filter((subscriber) =>
        subscriber.email.toUpperCase().includes(search)
      );
      setSubscribers(filteredSubscribers);
    }
  };

  return (
    <div>
      <div className="container mx-auto mb-48">
        <h1 className="text-2xl m-6 font-bold">{user.name + "s"} Substack</h1>
        <div className="flex justify-center items-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-12 w-full max-w-screen-lg px-4">
            {/* Card 1 */}
            <div className="text-lg font-semibold p-4 h-auto w-[300px] md:w-60 rounded-lg bg-gray-200 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-gray-600 text-lg">All Subscribers</h2>
                  <p className="text-gray-600 text-2xl">{subscribers.length}</p>
                </div>
                <PeopleAltIcon
                  className="h-10 w-10"
                  style={{ color: "gray" }}
                />
              </div>
            </div>
            {/* Card 2 */}
            <div className="text-lg font-semibold p-4 h-auto w-[300px] md:w-60 rounded-lg bg-gray-200 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-gray-600 text-lg font-semibold">
                    Basic Subscribers
                  </h2>
                  <p className="text-2xl">{basicSubscribers.length}</p>
                </div>
                <PeopleAltIcon
                  className="h-10 w-10"
                  style={{ color: "gray" }}
                />
              </div>
            </div>
            {/* Card 3 */}
            <div className="text-lg font-semibold p-4 h-auto w-[300px] md:w-60 rounded-lg bg-gray-200 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-gray-600 text-lg font-semibold">
                    Premium Subscribers
                  </h2>
                  <p className="text-2xl">{premiumSubscribers.length}</p>
                </div>
                <PeopleAltIcon
                  className="h-10 w-10"
                  style={{ color: "gray" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <LineChart />
        </div>
        <div className="flex gap-2">
          <h2 className="text-gray-600 text-2xl font-semibold">
            All subscribers ({subscribers.length})
          </h2>
          <span className="text-sm p-2 rounded-lg bg-gray-200 text-muted-foreground">
            Data updated 2 months ago
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            onChange={searchHandler}
            className="border border-border rounded-lg p-2 w-96"
          />
          <button className={`border m-3 p-2 rounded-lg`}>
            <FilterListIcon className="mr-2" />0 Filters
          </button>
          <button className={`border ml-2 p-2 rounded-lg`}>Columns</button>
          {/* <button className={`hover:bg-accent/80 mt-4 p-2 rounded-lg`}>
            Add Subscriber(s)
          </button>
          <button className={`hover:bg-accent/80 mt-4 p-2 rounded-lg ml-2`}>
            Manage group subscriptions
          </button> */}
        </div>
        <SubscriberTable subscribers={subscribers} />
      </div>
      <div
        role="button"
        aria-label="Open Chatbot"
        className="mb-28 flex justify-end  right-0 mr-4 "
        tabindex="1"
      >
        <button className="bg-gray-800 text-2xl rounded-full text-white p-6">
          Ask a question
        </button>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { writer } = context.query;
//   return {
//     props: { writer },
//   };
// }

export default SubscribersTable;
