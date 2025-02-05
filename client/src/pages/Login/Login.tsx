import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = { username, password };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      userContext?.setUser({ username: data.username, role: data.role });
      setSuccess("Login successful!");
      setError("");
      navigate("/");
    } catch (error) {
      setError("There was an error logging in!");
      setSuccess("");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/create-account">Create an account</Link>.
      </p>
      <p>
        <Link to="/change-password">Reset your password</Link>.
      </p>
    </div>
  );
};

export default Login;
