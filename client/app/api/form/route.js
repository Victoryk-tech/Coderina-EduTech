import Form from "../../models/formModal";
import dbConnect from "../../lib/dbConnect"; // Utility for DB connection
// Import the Form model
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    const {
      firstName,
      lastName,
      school,
      email,
      phone,
      address,
      ideaDescription,
      idea,
      gender,
      link1,
      link2,

      // Default to empty object if not provided
    } = await req.json();

    // Prepare registration data, only include fields if they have values
    const formData = {
      firstName,
      lastName,
      school,
      email,
      phone,
      address,
      ideaDescription,
      idea,
      gender,
      link1,
      link2,
    };

    // Save registration data to MongoDB
    const newRegistration = new Form(formData);
    await newRegistration.save();
    console.log("Registration successful");
    if (!["male", "female", "other"].includes(gender)) {
      return NextResponse.json(
        { success: true, message: "Registration successful" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Error saving registration", error: error.message },
      { status: 500 } // Changed to 500 for server errors
    );
  }
}
