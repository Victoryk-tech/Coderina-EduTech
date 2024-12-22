import { verifyAdmin } from "../../utils/middleware";
import dbConnect from "../../lib/dbConnect";
import Media from "../../models/mediaModel";

// Fetch all media or filter by category
// Fetch all media, filter by category, or fetch by ID
export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const category = searchParams.get("category");

    // Fetch by ID
    if (id) {
      const media = await Media.findById(id);
      if (!media) {
        return new Response(
          JSON.stringify({ success: false, error: "Media not found" }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify({ success: true, data: media }), {
        status: 200,
      });
    }

    // Fetch all media or filter by category
    const query = category ? { category: category.toLowerCase() } : {};
    const mediaList = await Media.find(query);

    return new Response(JSON.stringify({ success: true, data: mediaList }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

// Create new media post (Admin-only operation)
export async function POST(req) {
  await dbConnect();

  return verifyAdmin(req, async (res) => {
    try {
      const { title, description, category, images, body } = await req.json();

      // Validate category-specific fields
      if (category === "gallery" && (!images || images.length > 10)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Gallery must include up to 10 images.",
          }),
          { status: 400 }
        );
      }

      if (
        (category === "publications" || category === "news articles") &&
        (!images || images.length > 3)
      ) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `${category} can include up to 3 images.`,
          }),
          { status: 400 }
        );
      }

      const newMedia = new Media({
        title,
        description,
        category,
        images,
        body,
      });

      const savedMedia = await newMedia.save();

      return new Response(JSON.stringify({ success: true, data: savedMedia }), {
        status: 201,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }
  });
}

// Update media post (Admin-only operation)
export async function PUT(req) {
  await dbConnect();

  return verifyAdmin(req, async (res) => {
    try {
      const { id, title, description, category, images, body } =
        await req.json();

      const updatedMedia = await Media.findByIdAndUpdate(
        id,
        { title, description, category, images, body },
        { new: true, runValidators: true }
      );

      if (!updatedMedia) {
        return new Response(
          JSON.stringify({ success: false, error: "Media not found" }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: updatedMedia }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }
  });
}

// Delete media post (Admin-only operation)
export async function DELETE(req) {
  await dbConnect();

  return verifyAdmin(req, async (res) => {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
        return new Response(
          JSON.stringify({ success: false, error: "ID is required" }),
          { status: 400 }
        );
      }

      const deletedMedia = await Media.findByIdAndDelete(id);

      if (!deletedMedia) {
        return new Response(
          JSON.stringify({ success: false, error: "Media not found" }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: deletedMedia }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }
  });
}

// Handle likes and comments (Both Admin and User)
export async function PATCH(req) {
  await dbConnect();

  try {
    const { id, action, email, comment, reply } = await req.json();

    const media = await Media.findById(id);

    if (!media) {
      return new Response(
        JSON.stringify({ success: false, error: "Media not found" }),
        { status: 404 }
      );
    }

    if (action === "like") {
      if (media.likes.includes(email)) {
        media.likes = media.likes.filter((userEmail) => userEmail !== email);
      } else {
        media.likes.push(email);
      }
      await media.save();
      return new Response(JSON.stringify({ success: true, data: media }), {
        status: 200,
      });
    }

    if (action === "comment") {
      if (!email || !comment) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Email and comment required",
          }),
          { status: 400 }
        );
      }

      media.comments.push({ email, comment });
      await media.save();
      return new Response(JSON.stringify({ success: true, data: media }), {
        status: 200,
      });
    }

    if (action === "reply") {
      const targetComment = media.comments.id(reply.commentId);
      if (!targetComment) {
        return new Response(
          JSON.stringify({ success: false, error: "Comment not found" }),
          { status: 404 }
        );
      }

      targetComment.replies.push({ email, comment: reply.comment });
      await media.save();
      return new Response(JSON.stringify({ success: true, data: media }), {
        status: 200,
      });
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid action" }),
      { status: 400 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
