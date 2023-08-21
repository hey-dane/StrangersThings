import React, { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import { userLogin } from "../Helpers/userLogin";
import { login } from "../Helpers/API";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the username and password before making the API request
    console.log("Username:", username);
    console.log("Password:", password);

    // Perform authentication and get token
    try {
      const response = await login(username, password);
      console.log("Login Response:", response);

      const result = response;

      if (result.data.token) {
        // Store token on successful login (implement your logIn function accordingly)
        userLogin(result.data.token);
      } else {
        setError(result.error.message || "Login failed.");
      }
    } catch (error) {
      // Log any errors for debugging
      console.error("An error occurred during login:", error);
      setError("An error occurred during login.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <RegistrationForm />
    </div>
  );
}
