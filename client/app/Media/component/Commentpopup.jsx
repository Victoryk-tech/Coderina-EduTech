// components/CommentPopup.js
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

const CommentPopup = ({ email, handleAction, isSubmitting, onClose }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async () => {
    if (!newComment.trim() || isSubmitting) return;

    await handleAction("comment", {
      email,
      comment: newComment,
    });

    toast.success("Comment posted successfully!");
    setNewComment(""); // Clear the textarea after submission
    onClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full h-32 border border-gray-300 p-2 rounded-md"
          />
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim() || isSubmitting}
              className={`bg-blue-500 text-white py-2 px-4 rounded-md flex items-center ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <AiOutlineLoading3Quarters size={22} className="animate-spin" />
              ) : (
                <FiSend size={22} />
              )}
              Submit
            </button>
            <button onClick={onClose} className="text-red-500 font-semibold">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
