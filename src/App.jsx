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
import "bootstrap/dist/css/bootstrap.min.css";
import NewListingForm from "./Pages/NewListingForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loadUserData = async () => {
    try {
      const token = getToken();
      if (token) {
        const response = await fetchUserData(token);

        if (response && response.data && response.data.user) {
          setLoggedIn(true);
        } else {
          console.error("User data not available.");
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setLoggedIn(false);
    }
  };
  useEffect(() => {
    const token = getToken();

    const checkToken = async () => {
      if (token) {
        try {
          const response = await fetchUserData(token);

          if (response && response.data && response.data.user) {
            setLoggedIn(true);
          } else {
            console.error("User data not available.");
            setLoggedIn(false);
          }
        } catch (error) {
          console.error("Error loading user data:", error);
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={loggedIn} />} />
        <Route path="/AllPosts" element={<AllPosts />} />
        <Route path="/NewListingForm" element={<NewListingForm />} />
        <Route
          path="/Login"
          element={<LoginForm setLoggedIn={setLoggedIn} />}
        />
        <Route path="/post/:postId" element={<SinglePostView />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
