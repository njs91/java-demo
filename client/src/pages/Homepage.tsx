import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const Homepage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Homepage</h1>
      <div>
        <h2>Admin</h2>
        <Link to="/admin/login">
          <button>Login</button>
        </Link>
        <Link to="/admin/create-account">
          <button>Create Account</button>
        </Link>
      </div>
      <div>
        <h2>User</h2>
        <Link to="/user/login">
          <button>Login</button>
        </Link>
        <Link to="/user/create-account">
          <button>Create Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
