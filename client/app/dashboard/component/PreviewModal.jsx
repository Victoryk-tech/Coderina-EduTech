import React from "react";

export default function PostPreview({ title, content, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        {/* Preview Content */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="text-lg">
            <div dangerouslySetInnerHTML={{ __html: content }} />{" "}
            {/* Render HTML content */}
          </div>
        </div>
      </div>
    </div>
  );
}
