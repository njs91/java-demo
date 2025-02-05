import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./styles.module.scss";

const Homepage = () => {
  const userContext = useContext(UserContext);

  return (
    <div className={styles.container}>
      <h1>Java Project Home</h1>
      <p>By Nick Smith</p>
      {userContext?.user ? (
        <>
          <p>
            Welcome {userContext.user.username}. Account type:{" "}
            {userContext.user.role}.
          </p>
          <p>
            <Link to="/change-password">Change your password</Link>.
          </p>
        </>
      ) : (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/create-account">
            <button>Create Account</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Homepage;
