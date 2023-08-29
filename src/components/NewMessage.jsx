import React, { useState, useEffect } from "react";
import { postMessage } from "../Helpers/API";

export default function NewMessage({ postId }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    try {
      if (!content) {
        setError("Message content cannot be empty.");
        return;
      }

      const response = await postMessage(token, postId, content);

      if (response.success) {
        setContent("");
        setSuccessMessage("Message submitted successfully!");
      } else {
        setError(response.error.message || "Failed to submit message.");
      }
    } catch (err) {
      setError("An error occurred during submission.");
      console.error("Error:", err);
    }
  };

  return (
    <div id="new-message">
      <form onSubmit={handleMessageSubmit}>
        <label>
          Message:
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write Message Here"
            required
          />
        </label>
        <button type="submit">Send Message</button>
        {messageSent && <p>Message sent!</p>}
        {error && <p>{error}</p>}
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
