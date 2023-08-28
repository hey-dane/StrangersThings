import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePost, myData, deletePost } from "../Helpers/API";

export default function Profile() {
  const { postId } = useParams();
  const [profileData, setProfileData] = useState({
    posts: [],
    messages: [],
    username: "",
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const userData = await myData(token);
        setProfileData(userData.data); // Assuming your API response structure matches the expected state shape
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

        // Store the deleted post ID in sessionStorage
        const deletedPostIds =
          JSON.parse(sessionStorage.getItem("deletedPostIds")) || [];
        sessionStorage.setItem(
          "deletedPostIds",
          JSON.stringify([...deletedPostIds, postId])
        );

        // Update the profileData state to remove the deleted post and its associated messages
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

  // Filter out deleted posts
  const filteredPosts = profileData.posts.filter((post) => {
    const deletedPostIds =
      JSON.parse(sessionStorage.getItem("deletedPostIds")) || [];
    return !deletedPostIds.includes(post._id);
  });

  // Organize messages by post
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
