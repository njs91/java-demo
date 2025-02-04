import React, { useState } from "react";

/*
POST /users
{
    "username": "john_doe",
    "password": "password123",
    "role": "user"
}
*/

const AdminCreateAccount: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = { username, password, role };

    // http://localhost:8089/h2-console/login.do?jsessionid=271a506d96075a88f959be05f239a848

    try {
      // const response = await fetch(`${process.env.REACT_APP_SITE_URL}/users`, {
      const response = await fetch(`http://localhost:8089/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Admin account created:", data);
    } catch (error) {
      console.error("There was an error creating the admin account!", error);
    }
  };

  return (
    <div>
      <h1>Create Admin Account</h1>
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
    </div>
  );
};

export default AdminCreateAccount;
