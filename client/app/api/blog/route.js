import { NextResponse } from "next/server";
import Blog from "../../models/blog";
import connectDB from "../../lib/dbConnect";

export async function GET(req) {
  try {
    await connectDB();

    // Get the category from the URL query parameters using `nextUrl.searchParams`
    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const id = searchParams.get("id"); // Get the 'id' parameter for single blog post
    console.log("Received category:", category); // Log the category to ensure it is being captured
    console.log("Received id:", id); // Log the id to ensure it's being passed for single blog post

    // If an id is provided, fetch the specific blog post by ID
    if (id) {
      const blog = await Blog.findById(id);
      if (!blog) {
        return NextResponse.json(
          { success: false, message: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: blog }, { status: 200 });
    }

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category parameter is required." },
        { status: 400 }
      );
    }

    // Fetch blogs based on category (or all blogs if no category)
    const filter = category ? { category } : {};
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    // Extract data from the request body
    const { title, description, category, body, images } = await req.json();

    // Validation
    if (!title || !description || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description, and category are required.",
        },
        { status: 400 }
      );
    }

    // Ensure at least one image is provided for all categories
    if (!images || images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one image is required.",
        },
        { status: 400 }
      );
    }

    // Special handling for "Gallery" category
    if (category === "Gallery" && images.length < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery must include at least one image.",
        },
        { status: 400 }
      );
    }

    // Ensure "New Articles" and "Publications" include body content
    if ((category === "New Articles" || category === "Publications") && !body) {
      return NextResponse.json(
        {
          success: false,
          message: "Body content is required for this category.",
        },
        { status: 400 }
      );
    }

    // Create the blog post
    const newPost = new Blog({
      title,
      description,
      category,
      body: category === "Gallery" ? undefined : body,
      images,
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    // Respond with the created post
    return NextResponse.json(
      { success: true, data: savedPost },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
