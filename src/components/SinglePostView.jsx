import React, { useState, useEffect } from "react";
import { fetchSinglePost } from "../Helpers/API";
import { fetchPosts } from "../Helpers/API";
import { useParams, Link } from "react-router-dom";
import NewMessage from "./NewMessage";

export default function SinglePostView() {
  const [post, setPost] = useState([]);
  const { postId } = useParams();
  const isUserLoggedIn = !!sessionStorage.getItem("token"); // Check if user is logged in

  useEffect(() => {
    async function fetchPostData() {
      try {
        const token = sessionStorage.getItem("token");
        const fetchedPosts = await fetchPosts(token); // Fetch posts with messages
        const foundPost = fetchedPosts.data.posts.find(
          (post) => post._id === postId
        );

        if (foundPost) {
          console.log("Fetched post data:", foundPost);
          setPost(foundPost);
        } else {
          console.error("Post not found.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPostData();
  }, [postId]);

  return (
    <div
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card text-center mb-3"
        id="main"
        style={{ width: "18rem" }}
      >
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.description}</p>
          <p className="card-text">{post.location}</p>
          <p className="card-text">
            {post.willDeliver ? "Will Deliver" : "Local Pickup Only"}
          </p>
          <p className="card-text">Price: {post.price}</p>
          <p className="card-text">Seller: {post.author?.username}</p>

          {post.message && post.message.length > 0 && (
            <div>
              <p className="card-text">Messages:</p>
              {post.message.map((message) => (
                <div key={message._id}>
                  <p className="card-text">From: {message.fromUser.username}</p>
                  <p className="card-text">Content: {message.content}</p>
                </div>
              ))}
            </div>
          )}

          {isUserLoggedIn ? (
            <NewMessage postId={postId} />
          ) : (
            <div>
              <p className="bold-text">Login to send a message.</p>
              <Link to="/Login" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
