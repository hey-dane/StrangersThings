import React, { useState } from "react";
import { postMessage } from "../Helpers/API";

export default function NewMessage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    try {
      const response = await postMessage(token, postId, content);

      if (response.success) {
        // handle successful submission, saving to API and re-rendering onto the page.
        console.log("Message submitted successfully!");
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
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
          />
        </label>
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
    </div>
  );
}
