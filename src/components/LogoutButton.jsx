import React from "react";
import { userLogout, isLoggedIn } from "../Helpers/userLogin";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userLogout();
      navigate("/Login");
      onLogout(true);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return isLoggedIn() ? <button onClick={handleLogout}>Logout</button> : null;
}
