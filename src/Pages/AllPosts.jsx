import React, { useState, useEffect } from "react";
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
        <div className="row">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="col-md-4 mb-3"
              onClick={() => handleClick(post._id)} // Call handleClick on click
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  {/* <p>{post.location}</p>
                  <p>
                    {post.willDeliver ? "Will Deliver" : "Local Pickup Only"}
                  </p>
                  <p>Price: {post.price}</p>
                  <p>Seller: {post.author.username}</p> */}

                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent div click
                      handleClick(post._id); // Trigger the click event on the button
                    }}
                  >
                    See Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <h3>Login or register to send the seller a message.</h3>
    </div>
  );
}
