"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { RiMenu2Fill } from "react-icons/ri";
import { SlEarphones } from "react-icons/sl";
import { IoVideocamOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { LoadingSkeleton } from "../../shared/Spinner";
import { GoDash } from "react-icons/go";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import DropdownButton from "../component/DropdownButton";
import Link from "next/link";
import BlogSum from "./BlogSum";
import { IoIosArrowRoundForward } from "react-icons/io";

const MetricCard = ({ title, total, last30Days, inCurrentMonth, loading }) => (
  <div className="border cursor-pointer border-gray-200 p-4 rounded-lg w-[420px] hover:bg-gray-100 ">
    {loading ? (
      <LoadingSkeleton />
    ) : (
      <>
        <div className="flex justify-between mb-4">
          <p>{title}</p>
          <AiOutlineExclamationCircle />
        </div>
        <div className="flex justify-between items-center">
          <p className="font-[800] text-3xl">{total}</p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-1 text-xs bg-gray-100 rounded-lg  px-2 py-1 border border-gray-300">
              <GoDash />

              <p>{last30Days} in the last 30days</p>
            </div>
            <div className="flex items-center gap-1 text-xs bg-gray-100 rounded-lg  px-2 py-1 border border-gray-300">
              <GoDash />

              <p>{inCurrentMonth} in the last 30days</p>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
);

const Overview = () => {
  const [loading, setLoading] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [posts, setPosts] = useState([]);
  const [last30DaysSubscribers, setLast30DaysSubscribers] = useState(0);
  const [postsInCurrentMonth, setPostsInCurrentMonth] = useState(0);
  const [registeredInCurrentMonth, setRegisteredInCurrentMonth] = useState(0);
  const [categoryPostCounts, setCategoryPostCounts] = useState({});

  const dropdownItems = [
    { label: "Post", href: "#", icon: RiMenu2Fill },
    { label: "Audio", href: "#", icon: SlEarphones },
    { label: "Video", href: "#", icon: IoVideocamOutline },
    { label: "Thread", href: "#", icon: FiMessageSquare },
    { label: "New note", href: "#", icon: SlNote },
  ];

  // fetch posts

  const [totalBlogs, setTotalBlogs] = useState(0);
  const [blogs, setBlogs] = useState([]);

  // fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/allBlogs`);
        const data = await response.json();

        if (response.ok) {
          setBlogs(data.data);

          setTotalBlogs(data.totalBlogs);
        } else {
          console.error("Failed to fetch blogs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

  // Fetch form submissions
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

  // Filter subscribers who subscribed in the last 30 days
  const filterLast30DaysSubscribers = (subscribers) => {
    const thirtyDaysAgo = subDays(new Date(), 30);
    const filteredSubscribers = subscribers.filter((subscriber) => {
      const subscriptionDate = new Date(subscriber.subscriptionDate);
      return subscriptionDate >= thirtyDaysAgo;
    });
    setLast30DaysSubscribers(filteredSubscribers.length);
  };

  // Filter posts made in the current month

  // Filter form submissions made in the current month
  // Filter registrations made in the current month
  const filterRegistrationsInCurrentMonth = (registrations) => {
    const startOfThisMonth = startOfMonth(new Date());
    const endOfThisMonth = endOfMonth(new Date());
    const filteredRegistrations = registrations.filter((registration) => {
      const submissionDate = new Date(registration.submissionDate); // Assuming the registration has submissionDate
      return (
        submissionDate >= startOfThisMonth && submissionDate <= endOfThisMonth
      );
    });
    setRegisteredInCurrentMonth(filteredRegistrations.length);
  };

  useEffect(() => {
    fetchSubscribers();

    fetchRegistrations();
  }, []);

  useEffect(() => {
    if (subscribers && subscribers.length > 0) {
      filterLast30DaysSubscribers(subscribers);
    }
  }, [subscribers]);

  useEffect(() => {
    if (registrations && registrations.length > 0) {
      filterRegistrationsInCurrentMonth(registrations);
    }
  }, [registrations]);

  return (
    <div className=" lg:mx-[2.6rem] h-full bg-white mt-9  text-gray-700  md:max-w-full max-w-md">
      <Toaster />

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-700">Home</h1>
        <div className="flex gap-3">
          {" "}
          <Link
            href="/"
            className=" py-2 px-3 rounded-md hover:bg-[#ccce] bg-[#EEE]"
          >
            View site
          </Link>
          <div className="relative inline-block text-left">
            <DropdownButton buttonText="New post" items={dropdownItems} />
          </div>
        </div>
      </div>
      <h1 className="mt-8 text-lg font-semibold">Overview</h1>

      <div className="flex justify-between flex-wrap items-center mt-4 gap-4 ">
        <MetricCard
          title="All Subscribers"
          total={subscribers ? subscribers.length : 0}
          last30Days={last30DaysSubscribers}
          loading={loading}
        />

        <MetricCard
          title="All Posts"
          total={totalBlogs}
          inCurrentMonth={postsInCurrentMonth}
          loading={loading}
        />

        <MetricCard
          title="COUCH Registration"
          total={registrations ? registrations.length : 0}
          inCurrentMonth={registeredInCurrentMonth}
          loading={loading}
        />
      </div>

      <div className="flex justify-between py-16">
        {" "}
        <h1 className="text-xl font-semibold">Recent posts</h1>{" "}
        <div className="text-sm flex gap-1 items-center cursor-pointer">
          <Link href="/posts"> View all</Link>
          <IoIosArrowRoundForward color="#707070ee" size={20} />
        </div>
      </div>
      <div className="">{loading ? <LoadingSkeleton /> : <BlogSum />}</div>
    </div>
  );
};

export default Overview;
