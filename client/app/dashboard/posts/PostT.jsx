"use client";
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

import DropdownButton from "../component/DropdownButton";
import Pagination from "../component/PostPagnation";
import ImageModal from "../../Media/component/ImageModal";
import Spinner from "../../shared/Spinner";
import PostCard from "./PostCard";

const Posts = () => {
  const [activeNav, setActiveNav] = useState("Published");
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([
    "gallery",
    "new Articles",
    "publications",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog", {
        params: {
          category: selectedCategory || "",
          page: currentPage,
        },
      });
      if (response.data.success) {
        setPosts(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, currentPage]);

  const formatTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return postDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleOpenModals = (images) => {
    setSelectedImages(images);
    setImageOpen(true);
  };

  const handleCloseModals = () => {
    setImageOpen(false);
    setSelectedImages([]);
  };

  const handleModalOpen = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blog?id=${id}`);
      toast.success("Post deleted successfully!");
      fetchPosts();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="lg:mx-[5.7rem] mt-8 text-gray-700">
      <Toaster />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <DropdownButton buttonText="New post" />
      </div>

      <div className="mt-[5rem] flex justify-between border-b border-gray-300 pb-5">
        <nav className="flex gap-6">
          {["Published", "Categories"].map((nav) => (
            <button
              key={nav}
              className={`text-sm ${
                activeNav === nav ? "font-bold text-gray-900" : "text-gray-600"
              }`}
              onClick={() => setActiveNav(nav)}
            >
              {nav}
            </button>
          ))}
        </nav>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center py-2 px-4 text-sm"
          >
            {selectedCategory || "Select category"} <MdKeyboardArrowDown />
          </button>
          {isOpen && (
            <ul
              ref={dropdownRef}
              className="absolute right-0 bg-white shadow-lg"
            >
              {categories.map((cat) => (
                <li key={cat}>
                  <button onClick={() => setSelectedCategory(cat)}>
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            formatTime={formatTime}
            handleOpenModals={handleOpenModals}
            handleModalOpen={handleModalOpen}
          />
        ))
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ImageModal
        images={selectedImages}
        isOpen={imageOpen}
        onClose={handleCloseModals}
      />
    </div>
  );
};

export default Posts;
