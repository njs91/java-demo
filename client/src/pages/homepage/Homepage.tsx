import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./styles.module.scss";

const Homepage = () => {
  const { user } = useContext(UserContext) || {};

  const handleAddTestData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/test-data/add`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Test data added successfully!");
    } catch (error) {
      console.error("There was an error adding test data!", error);
      alert("There was an error adding test data!");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Java Project Home</h1>
      <p>By Nick Smith</p>
      {user ? (
        <>
          <p>Welcome {user.username}.</p>
          <p>
            <Link to="/user/profile">View your profile</Link>.
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
      <button onClick={handleAddTestData}>Add Test Data</button>
    </div>
  );
};

export default Homepage;
