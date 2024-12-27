import Form from "../../models/formModal";
import dbConnect from "../../lib/dbConnect"; // Utility for DB connection
import { ObjectId } from "mongodb";
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
    } = await req.json();

    // Validate the gender field
    if (!["male", "female", "other"].includes(gender.toLowerCase())) {
      return NextResponse.json(
        { success: false, message: "Invalid gender value" },
        { status: 400 }
      );
    }

    // Prepare registration data
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

    return NextResponse.json(
      { success: true, message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Error saving registration", error: error.message },
      { status: 500 } // Changed to 500 for server errors
    );
  }
}

// get

export async function GET() {
  try {
    await dbConnect();
    const registrations = await Form.find({});
    return NextResponse.json(
      { success: true, data: registrations },
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

// delete

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const result = await Form.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Form not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Form deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
