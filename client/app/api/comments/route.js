import { NextResponse } from "next/server";
import Blog from "../../models/blog";
import connectDB from "../../lib/dbConnect";

// POST: Add a new comment, reply, or like
export async function POST(req) {
  await connectDB();

  try {
    const { blogId, action, email, comment, replyTo, commentId } =
      await req.json();
    //const { blogId } = req.nextUrl.searchParams; // Get blogId from query params

    // Validate `blogId`
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Perform action based on `action` type
    if (action === "comment") {
      // Add a comment
      if (!email || !comment) {
        return NextResponse.json(
          { success: false, message: "Email and comment are required" },
          { status: 400 }
        );
      }
      blog.comments.push({ email, comment, replies: [] });
    } else if (action === "reply") {
      // Reply to a specific comment
      if (!email || !comment || !replyTo) {
        return NextResponse.json(
          {
            success: false,
            message: "Email, comment, and replyTo are required",
          },
          { status: 400 }
        );
      }
      const targetComment = blog.comments.id(replyTo);
      if (!targetComment) {
        return NextResponse.json(
          { success: false, message: "Comment not found" },
          { status: 404 }
        );
      }
      targetComment.replies.push({ email, comment });
    } else if (action === "like") {
      // Toggle like
      if (!email) {
        return NextResponse.json(
          { success: false, message: "Email is required for liking" },
          { status: 400 }
        );
      }

      // Update the likesCount based on whether the user has already liked the post
      if (blog.likes.includes(email)) {
        blog.likes = blog.likes.filter((e) => e !== email); // Unlike
        blog.likesCount -= 1; // Decrease like count
      } else {
        blog.likes.push(email); // Like
        blog.likesCount += 1; // Increase like count
      }
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action" },
        { status: 400 }
      );
    }

    // Save the updated blog
    await blog.save();
    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
