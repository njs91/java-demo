import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const Homepage = () => {
  return (
    <div className={styles.container}>
      <h1>Java Project Home</h1>
      <p>by Nick Smith</p>
      <div>
        <Link to="/login">
          <button className={styles.button}>Login</button>
        </Link>
        <Link to="/create-account">
          <button className={styles.button}>Create Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
