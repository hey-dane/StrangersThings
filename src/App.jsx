import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllPosts from "./Pages/AllPosts";
import SinglePostView from "./components/SinglePostView";
import LoginForm from "./Pages/Login";
import { fetchUserData } from "./Helpers/API";
import { getToken, isLoggedIn } from "./Helpers/userLogin";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import NewListingForm from "./Pages/NewListingForm";

function App() {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn()); // Initialize the state

  const loadUserData = async () => {
    try {
      const token = getToken();
      if (token) {
        const data = await fetchUserData(token);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const isAuthenticated = () => {
    return isLoggedIn();
  };

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/allposts"
          element={<AllPosts isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/login"
          element={<LoginForm setLoggedIn={setLoggedIn} />}
        />
        <Route path="/post/:postId" element={<SinglePostView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createlisting" element={<NewListingForm />} />
      </Routes>
    </div>
  );
}

export default App;
