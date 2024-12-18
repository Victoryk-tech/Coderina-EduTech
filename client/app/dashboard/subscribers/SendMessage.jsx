import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SendMessage = ({ selectedSubscribers }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      alert("Please fill in both subject and message");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedSubscribers, subject, message }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Update sent successfully");
      } else {
        toast.error("Failed to send update");
      }
    } catch (error) {
      toast.error("Error sending update");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Toaster />
      <h2 className="text-xl font-bold mb-4">Send Update</h2>

      {/* Display selected recipients' emails */}
      {selectedSubscribers && selectedSubscribers.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold">Recipients:</h3>
          <div className="space-y-2">
            {selectedSubscribers.map((email, index) => (
              <span key={email} className="text-gray-600 block">
                {email} {/* Display the email field */}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Email sending form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)} // Update state
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            rows="5"
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
              sending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
