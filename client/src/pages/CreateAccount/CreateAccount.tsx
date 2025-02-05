import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = { username, password, role };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await response.json();
      setSuccess("Account created successfully!");
      setError("");
    } catch (error) {
      setError(
        (error as Error).message || "There was an error creating the account!"
      );
      setSuccess("");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>.
      </p>
    </div>
  );
};

export default CreateAccount;
