import React, { useState } from "react";
import { postMessage } from "../Helpers/API";

export default function NewMessage({ postId }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    try {
      const response = await postMessage(token, postId, content);

      if (response.success) {
        setContent("");
        setSuccessMessage("Message submitted successfully!");
      } else {
        setError(response.error.message || "Failed to submit message.");
      }
    } catch (error) {
      setError("An error occurred during submission.");
    }
  };

  return (
    <div id="new-message">
      <form onSubmit={handleMessageSubmit}>
        <label>
          Message:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write Message Here"
            required
          />
        </label>
        <button type="submit">Send Message</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
