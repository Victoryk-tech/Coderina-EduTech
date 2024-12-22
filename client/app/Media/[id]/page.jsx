"use client";

import React from "react";

import Blog from "../../models/blog";
import connectDB from "../../lib/dbConnect";

const Page = async ({ params }) => {
  const { id } = params;

  // Connect to the database
  await connectDB();

  // Fetch the blog from the database
  const blog = await Blog.findById(id);

  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
      <div>{blog.body}</div>
    </div>
  );
};

export default Page;
