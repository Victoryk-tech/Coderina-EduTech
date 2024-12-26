import { useEffect, useState } from "react";
import axios from "axios";
import News from "../../Home/News";

export default function MediaBlog() {
  const [blogs, setBlogs] = useState([]);
  const [likesAndComments, setLikesAndComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);

        // Fetch blogs filtered by "new Articles" category
        const res = await axios.get(`/api/blog?category=new Articles`);
        const fetchedBlogs = res.data.data;

        // Limit to the first 4 blogs
        setBlogs(fetchedBlogs.slice(0, 4));

        // Fetch likes and comments for each blog
        const likesAndCommentsData = {};
        await Promise.all(
          fetchedBlogs.slice(0, 4).map(async (blog) => {
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
  }, []);

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
    <div>
      <News
        blogs={blogs}
        formatTime={formatTime}
        handleLike={handleLike}
        likesAndComments={likesAndComments}
        loading={loading}
      />
    </div>
  );
}
