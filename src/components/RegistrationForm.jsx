import React, { useState } from "react";
import { registerUser } from "../Helpers/API";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleUsernameUpdate = (e) => {
    const usernamePattern = /^[a-zA-Z0-9_-]{8,20}$/;
    const newUsername = e.target.value;

    setUsername(newUsername);

    if (!usernamePattern.test(newUsername)) {
      setUsernameError(
        "Username must be 8-20 characters and can only contain letters, digits, underscores, or hyphens."
      );
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordUpdate = (e) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const newPassword = e.target.value;

    setPassword(newPassword);

    if (!passwordPattern.test(newPassword)) {
      setPasswordError(
        "Password requirements: 8 characters, at least 1 number, 1 lowercase letter, and 1 uppercase letter."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordUpdate = (e) => {
    const newConfirmPassword = e.target.value;

    setConfirmPassword(newConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setUsernameError("");
    setPasswordError("");

    try {
      const response = await registerUser(username, password);
      const result = await response.json();

      if (result.success) {
        // Registration successful, do something with the token
      } else {
        setError(result.error.message || "Registration failed.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div>
      <h2>Register for access.</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameUpdate}
            required
          />
        </label>
        {usernameError && <p>{usernameError}</p>}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordUpdate}
            required
          />
        </label>
        {passwordError && <p>{passwordError}</p>}
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordUpdate}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
