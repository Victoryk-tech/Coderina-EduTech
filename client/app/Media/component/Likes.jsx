import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";

const LikeAndComment = ({ likes = 0, comments = 0, liked, toggleLike }) => {
  return (
    <div className="flex items-center justify-start space-x-1 mb-2">
      {/* Likes */}
      <div className="flex items-center space-x-1">
        <p>{likes}</p>
        <CiHeart
          size={23}
          color={liked ? "red" : "black"}
          onClick={toggleLike}
          style={{ cursor: "pointer" }}
        />
      </div>
      <p>|</p>
      {/* Comments */}
      <div className="flex items-center space-x-1">
        <p>{comments}</p>
        <FaRegCommentDots size={20} />
      </div>
    </div>
  );
};

export default LikeAndComment;
