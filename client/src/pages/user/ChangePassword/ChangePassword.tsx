import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const ChangePassword = () => {
  const { user } = useContext(UserContext) || {};
  const [userId, setUserId] = useState(user?.userId || "");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/change-password?userId=${userId}&newPassword=${newPassword}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      setSuccess("Password changed successfully!");
      setError("");
    } catch (error) {
      setError("There was an error changing the password!");
      setSuccess("");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Change Password</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            readOnly
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      <p>
        Back to <Link to="/">home</Link>.
      </p>
    </div>
  );
};

export default ChangePassword;
