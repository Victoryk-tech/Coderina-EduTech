"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function BlogDetails() {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Fetch the dynamic ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the blog details once the ID is available
      async function fetchBlogDetails() {
        try {
          setLoading(true);
          setError(null);

          const res = await axios.get(`/api/auth/blog?id=${id}`); // Replace with your API endpoint
          setBlog(res.data.data); // Update the blog state with fetched data
        } catch (error) {
          setError("Failed to fetch blog details. Please try again later.");
        } finally {
          setLoading(false);
        }
      }

      fetchBlogDetails();
    }
  }, [id]);

  // Handle undefined `id`
  if (!id) {
    return <p>Loading...</p>; // Wait for the ID to be available
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 md:py-24 font-Geist">
      <div className="max-w-4xl mx-auto">
        {blog && (
          <>
            {/* Blog Title */}
            <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

            {/* Blog Image */}
            {blog.images?.length > 0 && (
              <Image
                src={blog.images[0]}
                alt={blog.title}
                width={800}
                height={400}
                className="rounded-lg object-cover mb-6"
              />
            )}

            {/* Blog Description */}
            <p className="text-lg text-gray-600 mb-4">{blog.description}</p>

            {/* Blog Body */}
            <div className="text-gray-800 leading-relaxed">
              {/* Assuming `body` contains HTML content */}
              <div dangerouslySetInnerHTML={{ __html: blog.body }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
