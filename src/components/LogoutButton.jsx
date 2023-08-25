import React from "react";
import { userLogout, isLoggedIn } from "../Helpers/userLogin";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userLogout();
      // Redirect user to the login page
      navigate("/Login");
      // Notify the parent component that logout was successful
      onLogout(true);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Render the logout button only if the user is logged in
  return isLoggedIn() ? <button onClick={handleLogout}>Logout</button> : null;
}
