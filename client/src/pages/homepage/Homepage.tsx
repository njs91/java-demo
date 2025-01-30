import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const Homepage = () => {
  return (
    <div className={styles.container}>
      <h1>Java Project Home</h1>
      <p>by Nick Smith</p>
      <div>
        <h2>Admins:</h2>
        <Link to="/admin/login">
          <button className={styles.button}>Login</button>
        </Link>
        <Link to="/admin/create-account">
          <button className={styles.button}>Create Account</button>
        </Link>
      </div>
      <div>
        <h2>Users:</h2>
        <Link to="/user/login">
          <button className={styles.button}>Login</button>
        </Link>
        <Link to="/user/create-account">
          <button className={styles.button}>Create Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
