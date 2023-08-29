import React, { useState, useEffect } from "react";
import { fetchPosts } from "../Helpers/API";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    async function loadAllPosts() {
      try {
        const postsData = await fetchPosts(token);
        setPosts(postsData.data.posts);
      } catch (error) {
        console.error("Error loading posts.", error);
      }
    }
    loadAllPosts();
  }, [token]);

  const handleClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const filterPosts = () => {
    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const filteredPosts = filterPosts();

  return (
    <div id="main" className="all-posts">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="row">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="col-md-4 mb-3"
              onClick={() => handleClick(post._id)}
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(post._id);
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
      {token ? (
        <h3>Logged in: You can now send the seller a message.</h3>
      ) : (
        <h3>Login or register to send the seller a message.</h3>
      )}
    </div>
  );
}
