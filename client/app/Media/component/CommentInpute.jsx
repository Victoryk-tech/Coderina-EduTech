import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiSend } from "react-icons/fi";

export default function CommentInput({
  email,
  setEmailModal,
  handleAction,
  isSubmitting,
  newComment,
  setNewComment,
}) {
  return (
    <div className="flex items-center justify-center border-[0.6px] rounded-2xl border-black p-2">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="w-full outline-none bg-transparent"
      />
      <button
        onClick={() => {
          if (!email.trim()) {
            setEmailModal(true); // Trigger email modal if no email is set
            return;
          }
          handleAction("comment", {
            email: email.trim(), // Use dynamic email from state
            comment: newComment,
          }).then(() => setNewComment(""));
        }}
        disabled={!newComment.trim() || isSubmitting} // Enable only if there's a comment and not submitting
        className={`text-blue-500 flex items-center ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? (
          <AiOutlineLoading3Quarters size={26} className="animate-spin" />
        ) : (
          <FiSend size={26} />
        )}
      </button>
    </div>
  );
}
