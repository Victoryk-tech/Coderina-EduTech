import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

const sendUpdates = async () => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(MONGODB_DB);
    const subscribers = await db.collection("subscribers").find({}).toArray();

    // Send updates to each subscriber
    for (const subscriber of subscribers) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: "Latest Updates",
        text: `Hello,\n\nWe have an exciting update for you! Stay tuned for more.\n\nBest Regards,\nYour Team`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${subscriber.email}`);
    }

    client.close();
  } catch (error) {
    console.error("Error sending updates:", error);
  }
};

export default sendUpdates;
