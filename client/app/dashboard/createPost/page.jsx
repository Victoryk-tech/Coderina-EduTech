"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const createPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    category: "",
    body: "",
    images: [],
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const router = useRouter();

  const categories = ["gallery", "publications", "news articles"];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/media");
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      } else {
        toast.error("Failed to fetch posts");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.description || !newPost.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("description", newPost.description);
      formData.append("category", newPost.category);
      formData.append("body", newPost.body);
      selectedImages.forEach((image) => formData.append("images", image));

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Post created successfully");
        fetchPosts();
        setNewPost({
          title: "",
          description: "",
          category: "",
          body: "",
          images: [],
        });
        setSelectedImages([]);
      } else {
        toast.error(data.error || "Failed to create post");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/media?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Post deleted successfully");
        fetchPosts();
      } else {
        toast.error(data.error || "Failed to delete post");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* New Post Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Create New Post</h2>

        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        />

        <textarea
          placeholder="Description"
          value={newPost.description}
          onChange={(e) =>
            setNewPost({ ...newPost, description: e.target.value })
          }
          className="w-full p-2 border rounded mb-3"
        />

        <select
          value={newPost.category}
          onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {(newPost.category === "publications" ||
          newPost.category === "news articles") && (
          <textarea
            placeholder="Body"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            className="w-full p-2 border rounded mb-3"
          />
        )}

        {(newPost.category === "gallery" ||
          newPost.category === "publications") && (
          <div className="mb-3">
            <label className="block mb-1">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full border rounded"
            />
          </div>
        )}

        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </div>

      {/* Posts List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Manage Posts</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post._id} className="border-b py-3 flex justify-between">
                <div>
                  <h3 className="font-bold">{post.title}</h3>
                  <p>{post.description}</p>
                  <p className="text-sm text-gray-500">
                    Category: {post.categories.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default createPost;
