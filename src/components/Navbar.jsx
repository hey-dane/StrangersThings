import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { isLoggedIn, userLogout } from "../Helpers/userLogin"; // Import the isLoggedIn and userLogout functions

function Navbar() {
  const handleLogout = () => {
    // Handle the logout state change here
    userLogout(); // Log the user out
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

        {isLoggedIn() ? (
          <>
            <li className="nav-item">
              <Link to="/NewListingForm" className="nav-link">
                Create Listing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <LogoutButton onLogout={handleLogout} />
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/Login" className="nav-link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
