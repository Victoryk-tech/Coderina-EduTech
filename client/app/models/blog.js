import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  comment: { type: String, required: true },
  replies: [
    {
      email: { type: String, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String },
  category: {
    type: String,
    enum: ["New Articles", "Publications", "Gallery"],
    required: true,
  },
  images: [String], // For gallery posts
  likesCount: { type: Number, default: 0 },
  comments: [CommentSchema], // Nested comments
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
