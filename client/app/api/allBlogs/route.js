import { NextResponse } from "next/server";
import Blog from "../../models/blog";
import connectDB from "../../lib/dbConnect";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Retrieve all blog posts
    const blogs = await Blog.find({});

    // Return the response with the blogs and their total count
    return NextResponse.json(
      { success: true, data: blogs, totalBlogs: blogs.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
