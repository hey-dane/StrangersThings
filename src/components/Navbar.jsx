import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Navbar({ loggedIn, setLoggedIn }) {
  const handleLogout = (isLoggedOut) => {
    setLoggedIn(!isLoggedOut);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/AllPosts" className="nav-link">
            All Posts
          </Link>
        </li>
        {loggedIn && (
          <li className="nav-item">
            <Link to="/NewListingForm" className="nav-link">
              Create Listing
            </Link>
          </li>
        )}
        {!loggedIn && (
          <li className="nav-item">
            <Link to="/Login" className="nav-link">
              Login
            </Link>
          </li>
        )}
        {loggedIn && (
          <li className="nav-item">
            <Link to="/Profile" className="nav-link">
              Profile
            </Link>
          </li>
        )}
        {loggedIn && (
          <li className="nav-item">
            <LogoutButton onLogout={handleLogout} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
