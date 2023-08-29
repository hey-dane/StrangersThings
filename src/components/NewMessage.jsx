import React, { useState } from "react";
import { postMessage } from "../Helpers/API";

export default function NewMessage({ postId }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = sessionStorage.getItem("token"); // Assuming token is only set when the user is logged in

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <form onSubmit={handleSubmit}>
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
        {successMessage && <p>Message sent!</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
