import cron from "node-cron";
import sendUpdates from "./sendMessages";

// Schedule updates to run daily at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("Sending updates...");
  await sendUpdates();
});

export default function handler(req, res) {
  res.status(200).json({ message: "Update scheduler is running!" });
}
