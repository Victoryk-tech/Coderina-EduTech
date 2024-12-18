// utils/sendEmail.js
import nodemailer from "nodemailer";

const sendEmail = async (subscribers, subject, message) => {
  if (!subscribers || subscribers.length === 0) {
    return { success: false, message: "No recipients defined" };
  }

  // Check for missing environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return { success: false, message: "Email credentials are missing" };
  }

  // Create a transporter using an SMTP service (example with Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Create the email message
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: subscribers.join(", "), // Join multiple email addresses with commas
    subject: subject,
    text: message,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info); // Logging email info for debugging
    return { success: true, message: "Emails sent successfully", info };
  } catch (error) {
    console.error("Error sending email:", error); // More detailed error logging
    return { success: false, message: error.message };
  }
};

export default sendEmail;
