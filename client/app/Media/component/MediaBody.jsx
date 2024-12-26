import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import LikeAndComment from "./Likes";
import ImageModal from "./ImageModal";

export default function MediaBody() {
  const [category, setCategory] = useState("new Articles");
  const [blogs, setBlogs] = useState([]);
  const [likesAndComments, setLikesAndComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const openModal = (images) => {
    setSelectedImages(images);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImages([]);
  };

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);

        // Fetch blogs by category
        const res = await axios.get(`/api/blog?category=${category}`);
        const fetchedBlogs = res.data.data;
        setBlogs(fetchedBlogs);

        // Fetch likes and comments for each blog
        const likesAndCommentsData = {};
        await Promise.all(
          fetchedBlogs.map(async (blog) => {
            const data = await fetchLikesAndComments(blog._id);
            likesAndCommentsData[blog._id] = data;
          })
        );
        setLikesAndComments(likesAndCommentsData);
      } catch (error) {
        setError("Failed to fetch blogs. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [category]);

  const fetchLikesAndComments = async (blogId) => {
    try {
      const res = await axios.get(`/api/likesandcomments?id=${blogId}`);
      const blogData = res.data.data;

      return {
        likesCount: blogData.likes.length,
        commentsCount: blogData.comments.length,
        liked: false,
      };
    } catch (error) {
      console.error("Failed to fetch likes and comments count:", error);
      return { likesCount: 0, commentsCount: 0, liked: false }; // Fallback data
    }
  };

  const handleLike = async (blogId) => {
    const updatedLikesAndComments = { ...likesAndComments };
    const blogData = updatedLikesAndComments[blogId];

    if (!blogData) return;

    // Toggle the 'liked' state
    blogData.liked = !blogData.liked;

    // Update likes count based on the 'liked' state
    blogData.likesCount += blogData.liked ? 1 : -1;
    setLikesAndComments(updatedLikesAndComments);

    try {
      await axios.post(`/api/likesandcomments`, {
        blogId,
        action: "like",
        email: "user@example.com", // Replace with authenticated user's email
      });
    } catch (error) {
      console.error("Failed to update like status on the server:", error);
    }
  };

  const categories = ["new Articles", "publications", "gallery"];

  const formatTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now - postDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;

    return postDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="container mx-auto px-4 py-8 font-Geist">
      <div className="mb-6 md:mb-2 flex flex-col space-y-5 md:space-y-0 justify-start md:flex-row items-center md:justify-between py-4">
        <h1 className="text-3xl font-bold mb-6">Media</h1>
        <div className="flex space-x-2 text-nowrap bg-gray-200 rounded-full mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded text-[14px] ${
                cat === category
                  ? "bg-blue-500 text-white rounded-3xl"
                  : "bg-gray-200"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {blogs.length === 0 && !loading && !error ? (
          <p>No blogs available for this category.</p>
        ) : (
          blogs.map((blog) => {
            const { likesCount, commentsCount, liked } =
              likesAndComments[blog._id] || {};

            return (
              <div key={blog._id} className="w-full flex justify-center">
                <div className="h-[350px] w-full max-w-[350px] space-y-2">
                  {blog.images?.length > 0 && (
                    <Image
                      src={blog.images[0]}
                      alt={blog.title}
                      width={262}
                      height={100}
                      className="rounded-2xl object-contain"
                      onClick={() => openModal(blog.images)} // Open modal on click
                    />
                  )}
                  <div>
                    <p className="text-[12.6px] font-medium mb-2">
                      {formatTime(blog.createdAt)}
                    </p>
                    <p className="text-[13px] font-medium mb-1">{blog.title}</p>
                  </div>
                  <div className="h-14">
                    <LikeAndComment
                      likes={likesCount}
                      comments={commentsCount}
                      liked={liked}
                      toggleLike={() => handleLike(blog._id)}
                    />
                    <Link href={`/Media/${blog._id}`}>
                      <p className="text-blue-500 hover:underline text-[13px] pt-2">
                        Read More
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      <ImageModal
        images={selectedImages}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
