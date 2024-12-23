import { NextResponse } from "next/server";
import Blog from "../../models/blog";
import connectDB from "../../lib/dbConnect";

export async function GET(req) {
  try {
    // Ensure database connection
    await connectDB();

    // Extract query parameters from the URL
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const id = url.searchParams.get("id");

    // Debugging logs
    console.log("Query Params - Category:", category, "ID:", id);

    // Handle single blog retrieval by ID
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

    // Ensure the category is provided
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category parameter is required." },
        { status: 400 }
      );
    }

    // Fetch blogs filtered by category
    const blogs = await Blog.find({ category }).sort({ createdAt: -1 });

    // Handle no blogs found
    if (blogs.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          message: "No blogs found for this category.",
        },
        { status: 200 }
      );
    }

    // Respond with the blogs
    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}

// post

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection is made

    // Extract data from the request body
    const { title, description, category, body, images } = await req.json();

    // Validation: Ensure required fields are present
    if (!title || !description || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description, and category are required.",
        },
        { status: 400 }
      );
    }

    // Validate image array for non-gallery categories
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
    if (category === "gallery" && images.length < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "gallery must include at least one image.",
        },
        { status: 400 }
      );
    }

    // Ensure "New Articles" and "Publications" include body content
    if ((category === "new Articles" || category === "publications") && !body) {
      return NextResponse.json(
        {
          success: false,
          message: "Body content is required for this category.",
        },
        { status: 400 }
      );
    }

    // Prepare the blog post object
    const newPost = new Blog({
      title,
      description,
      category,
      body: category === "gallery" ? undefined : body,
      images: images.map((img) => img.toString()), // Ensure it's an array of strings
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    // Respond with the created post data
    return NextResponse.json(
      { success: true, data: savedPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error); // Log error for debugging
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update a blog post completely
export async function PUT(req) {
  try {
    await connectDB();
    const { id, title, description, category, body, images } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required." },
        { status: 400 }
      );
    }

    if (!title || !description || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description, and category are required.",
        },
        { status: 400 }
      );
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image is required." },
        { status: 400 }
      );
    }

    const updatedPost = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        body: category === "gallery" ? undefined : body,
        images,
      },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Partially update a blog post
export async function PATCH(req) {
  try {
    await connectDB();
    const { id, title, description, category, body, images } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required." },
        { status: 400 }
      );
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (body) updateData.body = category === "gallery" ? undefined : body;
    if (images && images.length > 0) updateData.images = images;

    const updatedPost = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post
export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID parameter is required." },
        { status: 400 }
      );
    }

    const deletedPost = await Blog.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog post deleted successfully." },
      { status: 200 }
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
