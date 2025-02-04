import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Homepage = () => {
  return (
    <div className={styles.container}>
      <h1>Java Project Home</h1>
      <p>by Nick Smith</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/create-account">
          <button>Create Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
