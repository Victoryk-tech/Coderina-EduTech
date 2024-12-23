import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

export default function MediaBody() {
  const [category, setCategory] = useState("new Articles");
  const [blogs, setBlogs] = useState([]);
  const [likesAndComments, setLikesAndComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs based on the selected category
  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/api/blog?category=${category}`);
        console.log("API Response:", res.data); // Log the response

        setBlogs(res.data.data); // Set the blogs data from the API response

        // Fetch likes and comments count for each blog post
        const likesAndCommentsData = {};
        for (const blog of res.data.data) {
          const { likesCount, commentsCount } =
            await fetchLikesAndCommentsCount(blog._id);
          likesAndCommentsData[blog._id] = { likesCount, commentsCount };
        }
        setLikesAndComments(likesAndCommentsData); // Store the likes and comments count in the state
      } catch (error) {
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [category]);

  // Function to fetch likes and comments count for a specific blog
  const fetchLikesAndCommentsCount = async (blogId) => {
    try {
      const res = await axios.get(`/api/comments?blogId=${blogId}`);
      return res.data.data;
    } catch (error) {
      console.error("Failed to fetch likes and comments count:", error);
      return { likesCount: 0, commentsCount: 0 }; // Return default values if error occurs
    }
  };

  // Function to handle like toggle
  const handleLike = async (blogId) => {
    const updatedLikesAndComments = { ...likesAndComments };
    const blogData = updatedLikesAndComments[blogId];

    if (!blogData) return;

    // Toggle the 'liked' state
    blogData.liked = !blogData.liked;

    // Update likes count based on the 'liked' state
    if (blogData.liked) {
      blogData.likesCount += 1; // Increase likes if liked
    } else {
      blogData.likesCount -= 1; // Decrease likes if unliked
    }

    // Update state with the new likes and comments
    setLikesAndComments(updatedLikesAndComments);

    // Optionally, send an API request to update the like on the server
    try {
      await axios.post(`/api/comments`, { blogId, liked: blogData.liked });
    } catch (error) {
      console.error("Failed to update like status on the server:", error);
    }
  };

  // Categories in the specified order
  const categories = ["new Articles", "publications", "gallery"];

  // Function to format the date similar to Instagram
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

    // If it's more than a month old, show the full date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return postDate.toLocaleDateString(undefined, options);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Media</h1>

      {/* Category Tabs */}
      <div className="flex space-x-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${
              cat === category ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading and Error Handling */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {blogs.length === 0 && !loading && !error ? (
          <p>No blogs available for this category.</p>
        ) : (
          blogs.map((blog) => {
            // Get likes and comments count for the blog post from state
            const { likesCount, commentsCount, liked } = likesAndComments[
              blog._id
            ] || {
              likesCount: 0,
              commentsCount: 0,
              liked: false,
            };

            return (
              <div key={blog._id} className="w-full flex justify-center">
                <div className=" h-[320px] w-full max-w-[350px] space-y-2">
                  {/* Display image if available */}
                  {blog.images?.length > 0 && (
                    <Image
                      src={blog.images[0]}
                      alt={blog.title}
                      width={262}
                      height={100}
                      className="rounded object-contain"
                    />
                  )}
                  <div className="">
                    {/* Show formatted time */}
                    <p className="text-[13px] font-medium mb-2">
                      {formatTime(blog.createdAt)}
                    </p>
                    <p className="text-[13px] font-medium mb-2">{blog.title}</p>
                  </div>

                  {/* Display likes and comments count */}
                  <div className="text-[13px] text-gray-500 flex items-center space-x-1">
                    {likesCount}{" "}
                    <CiHeart
                      onClick={() => handleLike(blog._id)}
                      className={`cursor-pointer ${
                        liked ? "text-red-500 scale-110" : ""
                      } transition-all`}
                      size={20}
                    />{" "}
                    | {commentsCount}
                    <Link href={`/Media/${blog._id}`}>
                      <p className="flex items-center">
                        <FaRegCommentDots
                          className="cursor-pointer"
                          size={20}
                        />
                      </p>
                    </Link>
                  </div>

                  <Link href={`/Media/${blog._id}`} className="">
                    <p className="text-blue-500 hover:underline text-[13px] pt-3">
                      Read More
                    </p>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
