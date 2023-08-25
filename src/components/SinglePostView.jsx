import React, { useState, useEffect } from "react";
import { fetchSinglePost } from "../Helpers/API";
import { fetchPosts } from "../Helpers/API";
import { useParams } from "react-router-dom";
import NewMessage from "./NewMessage";

export default function SinglePostView() {
  const [post, setPost] = useState([]);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const { postId } = useParams();

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
    <div>
      <h2>Post</h2>
      <div key={post._id}>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <p>{post.location}</p>
        <p>{post.willDeliver ? "Will Deliver" : "Local Pickup Only"}</p>
        <p>Price: {post.price}</p>

        {post.message && post.message.length > 0 && (
          <div>
            <p>Messages:</p>
            {post.message.map((message) => (
              <div key={message._id}>
                <p>From: {message.fromUser.username}</p>
                <p>Content: {message.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <NewMessage postId={postId} />
    </div>
  );
}
