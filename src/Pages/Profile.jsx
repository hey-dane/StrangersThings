import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { myData, deletePost } from "../Helpers/API";
import { isLoggedIn } from "../Helpers/userLogin";

export default function Profile() {
  const { postId } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [profileData, setProfileData] = useState({
    posts: [],
    messages: [],
    username: "",
  });

  useEffect(() => {
    // Check if the user is logged in before loading profile data
    if (isLoggedIn()) {
      loadProfileData();
    } else {
      // If not logged in, redirect to the login page
      navigate("/login");
    }
  }, []);

  const loadProfileData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const userData = await myData(token);
        setProfileData(userData.data);
      }
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await deletePost(token, postId);

      if (response.success) {
        console.log("Post deleted successfully!");

        const deletedPostIds =
          JSON.parse(sessionStorage.getItem("deletedPostIds")) || [];
        sessionStorage.setItem(
          "deletedPostIds",
          JSON.stringify([...deletedPostIds, postId])
        );

        setProfileData((prevData) => {
          const updatedPosts = prevData.posts.filter(
            (post) => post._id !== postId
          );
          const updatedMessages = prevData.messages.filter(
            (message) => message.post._id !== postId
          );
          return {
            ...prevData,
            posts: updatedPosts,
            messages: updatedMessages,
          };
        });
      } else {
        console.error("Error deleting post:", response.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const filteredPosts = profileData.posts.filter((post) => {
    const deletedPostIds =
      JSON.parse(sessionStorage.getItem("deletedPostIds")) || [];
    return !deletedPostIds.includes(post._id);
  });

  const messagesByPost = {};
  profileData.messages.forEach((message) => {
    if (!messagesByPost[message.post._id]) {
      messagesByPost[message.post._id] = [];
    }
    messagesByPost[message.post._id].push(message);
  });

  return (
    <div>
      <h2>Welcome, {profileData.username}</h2>
      <h3>Your Posts:</h3>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post._id}>
            {post.title}
            <button onClick={() => handleDelete(post._id)}>Delete</button>
            <h4>Messages:</h4>
            <ul>
              {messagesByPost[post._id] &&
                messagesByPost[post._id].map((message) => (
                  <li key={message._id}>
                    <strong>From: {message.fromUser.username}</strong>
                    <p>{message.content}</p>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
