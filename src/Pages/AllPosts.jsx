import React, { useState, useEffect } from "react";
import NewListingForm from "../components/NewListingForm";
import { fetchPosts } from "../Helpers/API";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAllPosts() {
      try {
        const token = sessionStorage.getItem("token");
        const postsData = await fetchPosts(token); // Fetch posts based on authentication
        setPosts(postsData.data.posts);
      } catch (error) {
        console.error("Error loading posts.", error);
      }
    }
    loadAllPosts();
  }, []);

  const handleClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  // Function to filter posts based on search term
  const filterPosts = () => {
    return posts.filter((post) => {
      // Customize this logic to match against the fields you want to search
      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const filteredPosts = filterPosts();

  return (
    <div id="all-posts-container">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="post"
              onClick={() => handleClick(post._id)} // Call handleClick on click
            >
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>{post.location}</p>
              <p>{post.willDeliver ? "Will Deliver" : "Local Pickup Only"}</p>
              <p>Price: {post.price}</p>
              <p>Seller: {post.author.username}</p>
              {post.message && post.message.length > 0 && (
                <p>Messages Available</p>
              )}
            </div>
          ))}
        </div>
      )}
      <NewListingForm />
    </div>
  );
}
