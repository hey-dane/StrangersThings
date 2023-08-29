import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myData, deletePost } from "../Helpers/API";
import { isLoggedIn } from "../Helpers/userLogin";

export default function Profile() {
  const { postId } = useParams();
  const navigate = useNavigate();
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
        // Filter out deleted posts using session storage
        const deletedPostIds =
          JSON.parse(sessionStorage.getItem("deletedPostIds")) || [];
        const filteredPosts = userData.data.posts.filter(
          (post) => !deletedPostIds.includes(post._id)
        );
        setProfileData({ ...userData.data, posts: filteredPosts });
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

  return (
    <div id="main" className="Profile">
      <h2>Welcome, {profileData.username}</h2>
      <h3>Your Posts:</h3>
      <ul>
        {profileData.posts.map((post) => (
          <li key={post._id}>
            {post.title}
            <button onClick={() => handleDelete(post._id)}>Delete</button>
            <h4>Messages:</h4>
            <ul>
              {profileData.messages
                .filter((message) => message.post._id === post._id)
                .map((message) => (
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
