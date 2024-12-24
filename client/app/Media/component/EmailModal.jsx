// components/EmailModal.js
import React from "react";

const EmailModal = ({ email, setEmail, setEmailModal, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Please enter your email</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          placeholder="Email"
        />
        <div className="flex justify-between">
          <button
            onClick={() => setEmailModal(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(email)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
