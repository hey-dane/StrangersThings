import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Navbar({ loggedIn, setLoggedIn }) {
  const handleLogout = (isLoggedOut) => {
    setLoggedIn(!isLoggedOut);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h4>Stranger's Things</h4>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/allposts" className="nav-link">
            All Posts
          </Link>
        </li>
        {loggedIn && (
          <li className="nav-item">
            <Link to="/createlisting" className="nav-link">
              Create Listing
            </Link>
          </li>
        )}
        {!loggedIn && (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
        {loggedIn ? (
          <>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <LogoutButton onLogout={handleLogout} />
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;
