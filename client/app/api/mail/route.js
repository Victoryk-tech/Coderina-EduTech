import sendEmail from "../../utils/sendEmail";
import { NextResponse } from "next/server";

// This function handles the POST request to send updates
export async function POST(req) {
  try {
    // Parse JSON data from the request body
    const { selectedSubscribers, subject, message } = await req.json();

    if (
      !selectedSubscribers ||
      !Array.isArray(selectedSubscribers) ||
      selectedSubscribers.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid or empty list of subscribers" },
        { status: 400 }
      );
    }

    if (!subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: subject or message",
        },
        { status: 400 }
      );
    }

    // Call the sendEmail function to send the update emails
    const response = await sendEmail(selectedSubscribers, subject, message);

    if (response.success) {
      return NextResponse.json(
        { success: true, message: "Update sent successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: response.message || "Failed to send update",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in sending update:", error);

    // Handle unexpected errors and return a 500 response
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
