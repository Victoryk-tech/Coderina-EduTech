"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Modal from "react-modal";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [maxImages, setMaxImages] = useState(5);
  const [imageUrl, setImageUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imagePreviewIndex, setImagePreviewIndex] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles),
  });

  const handleImageUpload = async (acceptedFiles) => {
    if (imageCount + acceptedFiles.length <= maxImages) {
      try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => formData.append("file", file));
        console.log("Form Data: ", formData);

        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const uploadedImageUrls = Array.isArray(response.data.urls)
          ? response.data.urls
          : [response.data.urls];

        setImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
        setImageCount(imageCount + acceptedFiles.length);
        toast.success("Images uploaded successfully!");
      } catch (error) {
        toast.error("Error uploading images.");
      }
    } else {
      toast.error(`You can only upload ${maxImages} images.`);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImageCount(updatedImages.length);
  };

  const handleImageUrlAdd = () => {
    const imageUrlPattern = /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i;
    if (imageUrlPattern.test(imageUrl)) {
      setImages((prevImages) => [...prevImages, imageUrl]);
      setImageCount(imageCount + 1);
      setImageUrl(""); // Clear the URL field
      toast.success("Image URL added successfully!");
    } else {
      toast.error("Please enter a valid image URL.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append text data (title, description, etc.)
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("body", body);

    // Append images (both file and URL)
    images.forEach((image) => {
      // If the image is a URL, append it as a string
      if (typeof image === "string") {
        formData.append("images", image);
      } else {
        // If the image is a file, append the file object
        formData.append("images", image);
      }
    });

    try {
      const response = await axios.post("/api/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        toast.success("Post created successfully!");
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating post.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setBody("");
    setImages([]);
    setImageCount(0);
  };

  const openModal = (index) => {
    setImagePreviewIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setMaxImages(e.target.value === "Gallery" ? 10 : 5);
            }}
            required
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select a category</option>
            <option value="Gallery">Gallery</option>
            <option value="New Articles">New Articles</option>
            <option value="Publications">Publications</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required={
              category === "New Articles" || category === "Publications"
            }
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drag & drop images here, or click to select files
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium">
            Uploaded Images ({imageCount}/{maxImages})
          </h3>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`uploaded-${index}`}
                  width={300}
                  height={300}
                  className="rounded-md"
                  onClick={() => openModal(index)}
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
          <button
            type="button"
            onClick={handleImageUrlAdd}
            className="mt-2 p-2 bg-blue-600 text-white rounded-md"
          >
            Add Image URL
          </button>
        </div>

        <button
          type="submit"
          disabled={imageCount === 0}
          className="mt-4 w-full p-3 bg-blue-600 text-white font-semibold rounded-md disabled:bg-gray-400"
        >
          Create Post
        </button>
      </form>

      {/* Image Preview Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Preview"
      >
        <div className="relative">
          <Image
            src={images[imagePreviewIndex]}
            alt={`image-preview-${imagePreviewIndex}`}
            width={500}
            height={500}
            className="rounded-md"
          />
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            X
          </button>
        </div>
      </Modal>

      <Toaster />
    </div>
  );
};

export default CreatePost;
