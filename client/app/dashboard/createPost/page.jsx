"use client";

import React, { useState } from "react";
import TextEditor from "../component/TextEditor";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import PostPreview from "../component/PreviewModal";

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [postVisibility, setPostVisibility] = useState("Everyone");
  const [allowComments, setAllowComments] = useState("Everyone");
  const [commentOrder, setCommentOrder] = useState("Top comments first");
  const [tags, setTags] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const draftLink =
    "https://michaelharry.threndin.com/p/4fca0ea1-f649-47e6-977d-d9301f38e466";

  const handleFilePicker = (callback, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute(
      "accept",
      meta.filetype === "image" ? "image/*" : "media/*"
    );
    input.onchange = function () {
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        const base64 = reader.result;
        callback(base64, { alt: file.name });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="bg-gray-white p-4">
      {/*================== header =====================*/}
      <header className="flex justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="hover:bg-[#ccce] bg-[#EEE] px-3 py-3 font-bold text-gray-600 rounded-lg flex items-center gap-2"
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="hover:bg-[#ccce] bg-[#EEE] px-3 py-2 rounded-lg font-semibold text-gray-600"
          >
            Preview
          </button>
          <button className="bg-[#ff9900] hover:bg-[#f48d2d] text-white px-3 py-2 rounded-lg">
            Continue
          </button>
        </div>
      </header>
      <div className=" flex  justify-center ">
        <main className="flex-grow p-6 max-w-4xl">
          <input
            className="w-full text-4xl font-bold border-none outline-none mb-4 bg-transparent"
            placeholder="Add a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          {/*===================== Editor ========================*/}
          <TextEditor
            handleFilePicker={handleFilePicker}
            content={content}
            onContentChange={handleContentChange}
          />
        </main>

        {/*============== Button to open Settings Modal ==============*/}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-6 hover:bg-[#ccce] bg-[#EEE] text-gray-700 font-semibold py-3 px-4 rounded-lg shadow-lg"
        >
          Post Settings
        </button>

        {/*================= Modal for Settings ================*/}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 z-50 relative">
              {/*============== Close Button ================*/}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>

              {/*============== Modal Content ===============*/}
              <h3 className="text-xl font-bold mb-4 border-b-2  border-b-gray-50 pb-2">
                Post Settings
              </h3>

              <div className="max-h-96 overflow-y-auto px-10">
                <div className="mb-6">
                  <label className="block font-medium text-gray-700 mb-2">
                    This post is for...
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setPostVisibility("Everyone")}
                      className={`${
                        postVisibility === "Everyone"
                          ? "bg-[#ff9900] hover:bg-[#f48d2d]"
                          : "hover:bg-[#ccce] bg-[#EEE]"
                      } text-white font-semibold py-2 px-4 rounded`}
                    >
                      Everyone
                    </button>
                    <button
                      onClick={() => setPostVisibility("Paid subscribers only")}
                      className={`${
                        postVisibility === "Paid subscribers only"
                          ? "bg-[#ff9900] hover:bg-[#f48d2d]"
                          : "hover:bg-[#ccce] bg-[#EEE]"
                      } text-white font-semibold py-2 px-4 rounded`}
                    >
                      Paid subscribers only
                    </button>
                  </div>
                </div>

                {/*=============== Comments Settings =================*/}
                <div className="mb-6">
                  <label className="block font-medium text-gray-700 mb-2">
                    Allow comments from...
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setAllowComments("Everyone")}
                      className={`${
                        allowComments === "Everyone"
                          ? "bg-[#ff9900] hover:bg-[#f48d2d]"
                          : "hover:bg-[#ccce] bg-[#EEE]"
                      } text-white font-semibold py-2 px-4 rounded`}
                    >
                      Everyone
                    </button>
                    <button
                      onClick={() => setAllowComments("No one")}
                      className={`${
                        allowComments === "No one"
                          ? "bg-[#ff9900] hover:bg-[#f48d2d]"
                          : "hover:bg-[#ccce] bg-[#EEE]"
                      } text-white font-semibold py-2 px-4 rounded`}
                    >
                      No one (disable comments)
                    </button>
                  </div>
                </div>

                {/*===================== Comment Order =====================*/}
                <div className="mb-6">
                  <label className="block font-medium text-gray-700 mb-2">
                    Order comments by…
                  </label>
                  <select
                    value={commentOrder}
                    onChange={(e) => setCommentOrder(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                  >
                    <option>Top comments first</option>
                    <option>Newest comments first</option>
                    <option>Oldest comments first</option>
                  </select>
                </div>

                {/*================ Tags Input ================*/}
                <div className="mb-6">
                  <label className="block font-medium text-gray-700 mb-2">
                    Add tags
                  </label>
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Select..."
                  />
                </div>

                {/*================== Send Test Email ====================*/}
                <div className="mb-6">
                  <label className="block font-medium text-gray-700 mb-2">
                    Send test email
                  </label>
                  <input
                    value="matrixcode00@gmail.com"
                    readOnly
                    className="w-full border border-gray-300 p-2 rounded bg-gray-100"
                  />
                  <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Send
                  </button>
                  <p className="text-sm text-gray-500 mt-1">
                    This will send two test emails: one with the version of the
                    post that your free subscribers will receive and another for
                    paid subscribers.
                  </p>
                </div>

                {/*==================== Secret Draft Link ================*/}
                <div className="mb-6">
                  <label className="block font-medium text-gray-700 mb-2">
                    Secret draft link
                  </label>
                  <input
                    value={draftLink}
                    readOnly
                    className="w-full border border-gray-300 p-2 rounded bg-gray-100"
                  />
                  <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Copy link
                  </button>
                  <p className="text-sm text-gray-500 mt-1">
                    This link allows you to share a secret draft link with
                    others before publishing. Anyone with the link will be able
                    to view the post and leave comments, but they won’t be able
                    to share it.
                  </p>
                </div>
                {/*====================== Danger Zone =====================*/}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-2">
                    Danger zone
                  </h3>
                  <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded">
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/*============== Preview Modal ==============*/}
        {isPreviewOpen && (
          <PostPreview
            title={title}
            content={content}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
