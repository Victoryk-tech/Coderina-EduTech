"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { CiEdit, CiHeart } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { IoTrash } from "react-icons/io5";
import { VscReply } from "react-icons/vsc";
import { MdOutlineExpandMore } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

export default function BlogDetails() {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Fetch the dynamic ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [visibleComments, setVisibleComments] = useState(3);
  const [emailModal, setEmailModal] = useState(false);
  const [email, setEmail] = useState("");

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 3); // Load 3 more comments
  };

  useEffect(() => {
    if (id) {
      async function fetchBlogDetails() {
        try {
          setLoading(true);
          setError(null);

          const res = await axios.get(`/api/auth/blog?id=${id}`); // Replace with your API endpoint
          setBlog(res.data.data); // Update the blog state with fetched data
        } catch (error) {
          setError("Failed to fetch blog details. Please try again later.");
        } finally {
          setLoading(false);
        }
      }

      fetchBlogDetails();
    }
  }, [id]);

  const handleAction = async (action, payload) => {
    try {
      const res = await axios.post("/api/comments", {
        blogId: id,
        action,
        ...payload,
      });
      setBlog(res.data.data);

      if (action === "comment") {
        setNewComment(""); // Clear the comment textarea after sending
        toast.success("Comment posted successfully!");
      } else if (action === "like") {
        setLiked(!liked); // Toggle the local "liked" state
        toast.success(liked ? "Like removed!" : "Liked the blog!");
      }
    } catch (error) {
      console.error("Failed to perform action:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleEdit = async () => {
    if (!reply.trim()) return; // Prevent empty edits

    try {
      const res = await axios.patch("/api/comments", {
        blogId: id,
        commentId: editCommentId,
        email: "user@example.com", // Add dynamic email
        updatedComment: reply,
      });

      if (res.data.success) {
        setBlog(res.data.data);
        setEditCommentId(null); // Clear edit mode
        setReply(""); // Reset reply input
        toast.success("Comment edited successfully!");
      }
    } catch (error) {
      console.error("Failed to edit comment:", error.message);
      toast.error("Failed to edit the comment.");
    }
  };

  const toggleLike = async () => {
    if (!email) {
      setEmailModal(true); // Open email modal if no email is provided
      return;
    }

    // Toggle the liked state locally
    setLiked((prev) => !prev);

    // Update the likes count locally
    const updatedLikesCount = liked ? blog.likesCount - 1 : blog.likesCount + 1;
    setBlog((prevBlog) => ({
      ...prevBlog,
      likesCount: updatedLikesCount,
    }));

    // Send the like action to the server
    try {
      await handleAction("like", { email });
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert the likes count in case of an error
      setBlog((prevBlog) => ({
        ...prevBlog,
        likesCount: liked ? prevBlog.likesCount + 1 : prevBlog.likesCount - 1,
      }));
    }
  };

  const toggleReplies = (commentId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReply = async (commentId) => {
    if (!reply.trim()) return; // Prevent empty replies

    try {
      const res = await axios.post("/api/comments", {
        blogId: id,
        action: "reply",
        email,
        comment: reply,
        replyTo: commentId,
      });

      if (res.data.success) {
        setBlog(res.data.data);
        setReply(""); // Reset the reply input
        toast.success("Reply posted successfully!");
      }
    } catch (error) {
      console.error("Failed to reply to comment:", error.message);
      toast.error("Failed to post reply.");
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

    // If it's more than a month old, show the full date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return postDate.toLocaleDateString(undefined, options);
  };

  // Handle undefined `id`
  if (!id) {
    return <p>Loading...</p>; // Wait for the ID to be available
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 md:py-24 font-Geist">
      <div className="max-w-4xl mx-auto">
        {blog && (
          <>
            {/* Blog Title */}
            <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

            {/* Blog Image */}
            {blog.images?.length > 0 && (
              <Image
                src={blog.images[0]}
                alt={blog.title}
                width={800}
                height={400}
                className="rounded-lg object-cover mb-6"
              />
            )}

            {/* Like and Comments Count */}
            <div className="flex items-center justify-start space-x-1 mb-2">
              <p className="flex items-center space-x-1">
                {blog.likesCount}
                <CiHeart
                  size={23}
                  color={liked ? "red" : "black"}
                  onClick={toggleLike}
                />
              </p>
              <p>|</p>
              <div className="flex items-center space-x-1">
                <p>{blog.comments ? blog.comments.length : 0}</p>{" "}
                <FaRegCommentDots size={20} />
              </div>
            </div>

            {/* Blog Description */}
            <p className="text-lg font-medium text-gray-600 mb-4">
              {blog.description}
            </p>

            {/* Blog Body */}
            <div className="text-gray-800 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: blog.body }} />
            </div>

            {/* Add New Comment */}
            <div className="mt-16 border-t-[0.8px] border-gray-300 py-4">
              <div className="flex items-center justify-center border-[0.6px] rounded-2xl border-black p-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full outline-none bg-transparent"
                />
                <button
                  onClick={() =>
                    handleAction("comment", {
                      email,
                      comment: newComment,
                    })
                  }
                  disabled={!newComment.trim()}
                  className={`px-4 py-2 rounded-md mt-2 ${
                    newComment.trim()
                      ? "bg-[#FBB12F] text-white cursor-pointer"
                      : "text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FiSend size={24} />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <div className="flex items-center justify-start space-x-1 font-medium font-Inter mb-6 md:mb-9">
                <p className="text-[15px]">Recent comments</p>{" "}
                <MdOutlineExpandMore size={23} />
              </div>
              {blog.comments?.slice(0, visibleComments).map((comment) => (
                <div key={comment._id} className="mb-4 border-b pb-4">
                  <div className="flex items-center justify-start space-x-8">
                    <p className="font-semibold text-[15px]">{comment.email}</p>
                    <p className="text-[11px] font-normal font-Inter">
                      {formatTime(comment.createdAt)}
                    </p>
                  </div>
                  {editCommentId === comment._id ? (
                    <div className="w-[70%] md:w-[30%] px-2 flex items-center justify-center border-gray-400 border-[0.7px] rounded-3xl">
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className="w-full outline-none bg-transparent"
                      />
                      <button
                        onClick={handleEdit}
                        className="text-gray-500 px-4 py-2 rounded-md"
                      >
                        <FiSend size={20} />
                      </button>
                    </div>
                  ) : (
                    <p className="font-normal text-[14px]">{comment.comment}</p>
                  )}

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleReply(comment._id)}
                      className="text-blue-500"
                    >
                      <VscReply />
                    </button>
                    <button
                      onClick={() => setEditCommentId(comment._id)}
                      className="text-green-500"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() =>
                        handleAction("delete", {
                          email,
                          commentId: comment._id,
                        })
                      }
                      className="text-red-500"
                    >
                      <IoTrash />
                    </button>
                  </div>

                  {comment.replies?.length > 0 && (
                    <div className="pl-4 mt-2 border-l">
                      <button
                        onClick={() => toggleReplies(comment._id)}
                        className="text-blue-500"
                      >
                        {visibleReplies[comment._id]
                          ? "Hide Replies"
                          : `View ${comment.replies.length} Replies`}
                      </button>
                      {visibleReplies[comment._id] &&
                        comment.replies.map((reply) => (
                          <p key={reply._id}>
                            <span className="font-bold">{reply.email}:</span>{" "}
                            {reply.comment}
                          </p>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              {visibleComments < (blog.comments ? blog.comments.length : 0) && (
                <p
                  onClick={loadMoreComments}
                  className="text-black-500 mt-6 cursor-pointer text-[14px]"
                >
                  See More....
                </p>
              )}
            </div>

            {/* Email Modal */}
            {emailModal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold">Enter your Email</h3>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border rounded-md mt-4"
                  />
                  <button
                    onClick={() => {
                      setEmailModal(false);
                      if (email) toggleLike();
                    }}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
}
