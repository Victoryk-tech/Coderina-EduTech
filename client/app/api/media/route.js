import dbConnect from "../../lib/dbConnect";
import Media from "../../models/mediaModel";

export async function GET(req) {
  await dbConnect(); // Connect to the database

  try {
    // Get the `category` query parameter
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // Filter by category if provided
    const query = category ? { categories: category.toLowerCase() } : {};
    const mediaList = await Media.find(query); // Fetch media based on query

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

export async function POST(req) {
  try {
    await dbConnect(); // Connect to the database
    const body = await req.json(); // Parse request body
    const media = await Media.create(body);
    return new Response(JSON.stringify({ success: true, data: media }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req) {
  try {
    await dbConnect(); // Connect to the database
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // Retrieve the `id` from query params

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

    return new Response(JSON.stringify({ success: true, data: deletedMedia }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}
