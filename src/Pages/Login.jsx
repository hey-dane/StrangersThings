import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import { userLogin } from "../Helpers/userLogin";
import { login } from "../Helpers/API";

export default function LoginForm({ setLoggedIn }) {
  // Accept setLoggedIn as a prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);

      if (response.success && response.data.token) {
        userLogin(response.data.token);
        setLoggedIn(true);

        navigate("/profile");
      } else {
        setError("Login failed.");
      }
    } catch (error) {
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
