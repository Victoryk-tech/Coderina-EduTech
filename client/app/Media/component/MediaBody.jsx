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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div key={blog._id} className="border p-4 rounded shadow-sm">
                {/* Display image if available */}
                {blog.images?.length > 0 && (
                  <Image
                    src={blog.images[0]}
                    alt={blog.title}
                    width={300}
                    height={200}
                    className="rounded"
                  />
                )}
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.description}</p>

                {/* Display likes and comments count */}
                <div className="text-sm text-gray-500 flex items-center space-x-1">
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
                      <FaRegCommentDots className="cursor-pointer" size={20} />
                    </p>
                  </Link>
                </div>

                <Link href={`/Media/${blog._id}`}>
                  <p className="text-blue-500 hover:underline">Read More</p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
