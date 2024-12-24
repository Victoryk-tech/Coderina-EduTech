// LikeAndCommentStats.js
import { CiHeart } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa6";

const LikeAndCommentStats = ({ likes, comments, liked, toggleLike }) => {
  return (
    <div className="flex items-center justify-start space-x-1 mb-2">
      <p className="flex items-center space-x-1">
        {likes?.length || 0}
        <CiHeart
          size={23}
          color={liked ? "red" : "black"}
          onClick={toggleLike}
        />
      </p>
      <p>|</p>
      <div className="flex items-center space-x-1">
        <p>{comments?.length || 0}</p>
        <FaRegCommentDots size={20} />
      </div>
    </div>
  );
};

export default LikeAndCommentStats;
