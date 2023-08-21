import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../Helpers/userLogin";
import LogoutButton from "./LogoutButton";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/AllPosts" className="nav-link">
            All Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Profile" className="nav-link">
            Profile
          </Link>
        </li>
        {/* Check if the user is logged in before rendering the LogoutButton */}
        {isLoggedIn() && (
          <li className="nav-item">
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
