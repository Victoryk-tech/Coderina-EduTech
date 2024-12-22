"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("New Articles");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [imageInput, setImageInput] = useState("");

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const uploadedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages([...images, ...uploadedImages]);
  };

  const handleAddImageByUrl = () => {
    if (imageInput.trim() !== "") {
      setImages([...images, imageInput]);
      setImageInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || images.length === 0) {
      toast.error("Title, description, and at least one image are required.");
      return;
    }

    if ((category === "New Articles" || category === "Publications") && !body) {
      toast.error("Body content is required for the selected category.");
      return;
    }

    const postData = {
      title,
      description,
      category,
      body: category === "Gallery" ? undefined : body,
      images,
    };

    try {
      const response = await axios.post("/api/blog", postData);
      if (response.data.success) {
        toast.success("Post created successfully!");
        // Reset form
        setTitle("");
        setDescription("");
        setCategory("New Articles");
        setBody("");
        setImages([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="New Articles">New Articles</option>
            <option value="Publications">Publications</option>
            <option value="Gallery">Gallery</option>
          </select>
        </div>

        {category !== "Gallery" && (
          <div>
            <label className="block text-sm font-medium mb-1">Body</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows="5"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block mb-2"
          />
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Uploaded ${idx}`}
                className="w-20 h-20 object-cover border rounded"
              />
            ))}
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Image URL"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="border rounded px-3 py-2 mr-2"
            />
            <button
              type="button"
              onClick={handleAddImageByUrl}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Image URL
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded font-bold"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}
