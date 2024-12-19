import { useEffect, useState } from "react";
import axios from "axios";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function MediaPage() {
  const [media, setMedia] = useState([]); // Stores media posts
  const [comment, setComment] = useState(""); // Stores new comments
  const [commentEmail, setCommentEmail] = useState(""); // Stores email for first-time comments
  const [showEmailInput, setShowEmailInput] = useState(false); // Toggle email input
  const [selectedPost, setSelectedPost] = useState(null); // Track which post to comment on

  // Fetch all media posts
  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await axios.get("/api/media");
        setMedia(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch media");
      }
    }
    fetchMedia();
  }, []);

  // Handle likes
  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`/api/media`, {
        id: postId,
        action: "like",
        email: commentEmail, // Email acts as a unique identifier
      });
      setMedia((prev) =>
        prev.map((item) =>
          item._id === postId ? { ...item, likes: res.data.data.likes } : item
        )
      );
    } catch (err) {
      toast.error("Failed to update like");
    }
  };

  // Handle comment submission
  const handleComment = async () => {
    if (!comment) return toast.error("Comment cannot be empty");
    if (!commentEmail) {
      setShowEmailInput(true);
      return;
    }

    try {
      const res = await axios.post(`/api/media`, {
        id: selectedPost,
        action: "comment",
        email: commentEmail,
        comment,
      });

      setMedia((prev) =>
        prev.map((item) =>
          item._id === selectedPost
            ? { ...item, comments: res.data.data.comments }
            : item
        )
      );
      setComment("");
      setShowEmailInput(false);
      setSelectedPost(null);
      toast.success("Comment added successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Media Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => (
          <div key={item._id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>

            {item.category === "gallery" && (
              <div className="grid grid-cols-2 gap-2">
                {item.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            )}

            {item.category === "publications" && (
              <Image
                src={item.image}
                alt="Publication"
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            {item.category === "news_articles" && (
              <div>
                <p>{item.body}</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <button
                className={`px-4 py-2 rounded ${
                  item.likes.includes(commentEmail)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleLike(item._id)}
              >
                {item.likes.includes(commentEmail) ? "Unlike" : "Like"} (
                {item.likes.length})
              </button>

              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => {
                  setSelectedPost(item._id);
                  setShowEmailInput(!commentEmail);
                }}
              >
                Comment
              </button>
            </div>

            <div className="mt-4">
              {item.comments.map((cmt, index) => (
                <div key={index} className="border-b py-2">
                  <p className="text-gray-800">{cmt.comment}</p>
                  <span className="text-sm text-gray-500">- {cmt.email}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comment Email Input */}
      {showEmailInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Enter Your Email</h3>
            <input
              type="email"
              value={commentEmail}
              onChange={(e) => setCommentEmail(e.target.value)}
              placeholder="Your email"
              className="border p-2 w-full mb-4"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleComment}
            >
              Submit
            </button>
            <button
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowEmailInput(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Comment Box */}
      {selectedPost && !showEmailInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add Your Comment</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here"
              className="border p-2 w-full mb-4"
            ></textarea>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleComment}
            >
              Submit
            </button>
            <button
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedPost(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
