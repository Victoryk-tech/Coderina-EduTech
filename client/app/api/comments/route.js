import { NextResponse } from "next/server";
import Blog from "../../models/blog";
import connectDB from "../../lib/dbConnect";

// Utility for responses
const respond = (success, message, data = null, status = 200) =>
  NextResponse.json({ success, message, data }, { status });

// Helper functions
const findBlog = async (blogId) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw new Error("Blog not found");
  return blog;
};

const findComment = (blog, commentId) => {
  const comment = blog.comments.id(commentId);
  if (!comment) throw new Error("Comment not found");
  return comment;
};

// PATCH Route
export async function PATCH(req) {
  await connectDB();

  try {
    const { blogId, commentId, email, updatedComment } = await req.json();
    const blog = await findBlog(blogId);
    const targetComment = findComment(blog, commentId);

    if (targetComment.email !== email) {
      return respond(
        false,
        "You are not authorized to edit this comment",
        null,
        403
      );
    }

    if (!updatedComment) {
      return respond(true, "Comment fetched successfully", targetComment, 200);
    }

    targetComment.comment = updatedComment;
    await blog.save();

    return respond(true, "Comment updated successfully", targetComment, 200);
  } catch (error) {
    return respond(false, `Error: ${error.message}`, null, 500);
  }
}

// POST Route
export async function POST(req) {
  await connectDB();

  try {
    const { blogId, action, email, comment, replyTo, commentId } =
      await req.json();
    const blog = await findBlog(blogId);

    if (action === "comment") {
      if (!email || !comment) throw new Error("Email and comment are required");
      blog.comments.push({ email, comment, replies: [] });
    } else if (action === "reply") {
      if (!email || !comment || !replyTo)
        throw new Error("Email, comment, and replyTo are required");
      const targetComment = findComment(blog, replyTo);
      targetComment.replies.push({ email, comment });
    } else if (action === "like") {
      if (!email) throw new Error("Email is required for liking");
      if (blog.likes.includes(email)) {
        blog.likes = blog.likes.filter((e) => e !== email);
        blog.likesCount = Math.max(0, blog.likesCount - 1);
      } else {
        blog.likes.push(email);
        blog.likesCount += 1;
      }
    } else if (action === "edit") {
      if (!email || !comment || !commentId)
        throw new Error("Email, comment, and commentId are required");
      const targetComment = findComment(blog, commentId);
      if (targetComment.email !== email)
        throw new Error("You are not authorized to edit this comment");
      targetComment.comment = comment;
    } else if (action === "delete") {
      if (!email || !commentId)
        throw new Error("Email and commentId are required");
      const targetComment = findComment(blog, commentId);
      if (targetComment.email !== email)
        throw new Error("You are not authorized to delete this comment");
      targetComment.remove();
    } else {
      return respond(false, "Invalid action", null, 400);
    }

    await blog.save();
    return respond(true, "Action performed successfully", blog, 200);
  } catch (error) {
    return respond(false, `Unexpected error: ${error.message}`, null, 500);
  }
}
