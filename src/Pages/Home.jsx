import React from "react";

// Assuming isLoggedIn is a boolean variable that indicates if the user is logged in
const isLoggedIn = true; // You can replace this with your actual check

export default function Home() {
  return (
    <div id="home-content">
      <h1>Stranger's Things</h1>
      <h2>Your one-stop shop for things that don't belong to you...yet.</h2>
      {isLoggedIn ? (
        <h2>You're logged in, start buying Stranger's Things today!</h2>
      ) : (
        <h2>Login or register to start buying Stranger's Things today!</h2>
      )}
    </div>
  );
}
