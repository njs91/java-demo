import React, { useState } from "react";
import { User } from "../../../context/UserContext";
import styles from "./styles.module.scss";

interface EditUserProps {
  user: User;
  handleUpdate: (updatedUser: User, newPassword: string) => void;
  handleCancel: () => void;
}

const EditUser: React.FC<EditUserProps> = ({
  user,
  handleUpdate,
  handleCancel,
}) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">(user.role);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedUser = { ...user, username, role };
    handleUpdate(updatedUser, password);
  };

  return (
    <div className={styles.editUser}>
      <h2>Edit User</h2>
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
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "user")}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUser;
