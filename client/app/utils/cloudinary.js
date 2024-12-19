import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const handleUpload = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Automatically determines the resource type (image, video, etc.)
    });
    return res;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error; // Ensure errors are propagated
  }
};

module.exports = handleUpload;
