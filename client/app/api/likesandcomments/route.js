import { NextResponse } from "next/server";
import connectDB from "../../lib/dbConnect";
import Blog from "../../models/blog";

connectDB();

// Handle GET requests
export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    const blog = await Blog.findById(id).populate("comments.replies").exec();
    return NextResponse.json({ data: blog });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(req) {
  const { blogId, action, email, comment, replyTo } = await req.json();
  console.log({ blogId, action, email, comment });
  try {
    const blog = await Blog.findById(blogId);

    if (action === "like") {
      blog.likes.push(email);
      await blog.save();
      return NextResponse.json({ data: blog });
    }

    if (action === "comment") {
      blog.comments.push({ email, comment, timestamp: new Date() });
      await blog.save();
      return NextResponse.json({ data: blog });
    }

    if (action === "reply") {
      const targetComment = blog.comments.id(replyTo);
      targetComment.replies.push({ email, comment, timestamp: new Date() });
      await blog.save();
      return NextResponse.json({ data: blog });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to perform action" },
      { status: 500 }
    );
  }
}

// Handle PATCH requests
export async function PATCH(req) {
  const { blogId, commentId, email, updatedComment } = await req.json();

  try {
    const blog = await Blog.findById(blogId);
    const comment = blog.comments.id(commentId);

    if (comment.email === email) {
      comment.comment = updatedComment;
      await blog.save();
      return NextResponse.json({ data: blog });
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to edit comment" },
      { status: 500 }
    );
  }
}

// Handle DELETE requests
export async function DELETE(req) {
  const { blogId, commentId, email } = await req.json();

  try {
    const blog = await Blog.findById(blogId);
    const comment = blog.comments.id(commentId);

    if (comment.email === email) {
      comment.remove();
      await blog.save();
      return NextResponse.json({ data: blog });
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
