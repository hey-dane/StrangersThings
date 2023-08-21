import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllPosts from "./Pages/AllPosts";
import SinglePostView from "./components/SinglePostView";
import LoginForm from "./Pages/Login";
import { fetchUserData } from "./Helpers/API";
import { getToken, isLoggedIn } from "./Helpers/userLogin";

function App() {
  const [userData, setUserData] = useState(null);

  // Function to load user data
  const loadUserData = async () => {
    try {
      const token = getToken();
      if (token) {
        // If a token exists, fetch user data
        const data = await fetchUserData(token);
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    // Load user data when the page loads
    loadUserData();
  }, []);

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return isLoggedIn();
  };

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} />{" "}
      {/* Pass isAuthenticated as a prop */}
      <Routes>
        <Route
          path="/AllPosts"
          element={<AllPosts isAuthenticated={isAuthenticated} />}
        />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/post/:postId" element={<SinglePostView />} />
      </Routes>
    </div>
  );
}

export default App;