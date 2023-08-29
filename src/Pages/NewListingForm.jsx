import React, { useState } from "react";
import { makePost } from "../Helpers/API";

export default function NewListingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
        setSuccessMessage("Listing submitted successfully!");
        setTitle("");
        setDescription("");
        setPrice("");
        setWillDeliver(false);
      } else {
        setError(response.error.message || "Failed to submit listing.");
      }
    } catch (error) {
      setError("An error occurred during submission.");
    }
  };

  return (
    <div id="main" className="create-listing">
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
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
