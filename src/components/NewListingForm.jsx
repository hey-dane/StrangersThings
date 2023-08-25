import React, { useState } from "react";
import { makePost } from "../Helpers/API";

export default function NewListingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    try {
      const post = {
        title: title,
        description: description,
        price: price,
        willDeliver: willDeliver,
      };

      const response = await makePost(token, post);

      if (response.success) {
        // handle successful submission, saving to API and re-rendering onto the page.
        console.log("Listing submitted successfully!");
      } else {
        setError(response.error.message || "Failed to submit listing.");
      }
    } catch (error) {
      setError("An error occurred during submission.");
    }
  };

  return (
    <div>
      <h2>Create a New Listing</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Will Deliver:
          <input
            type="checkbox"
            checked={willDeliver}
            onChange={(e) => setWillDeliver(e.target.checked)}
          />
        </label>
        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
}
