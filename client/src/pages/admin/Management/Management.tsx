import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import CreateProduct from "./CreateProduct";
import styles from "./styles.module.scss";

/*
    lists users and products
    
    functionality:
    - CRUD a product:
      - create nearly done - needs image upload
      - need read
      - need update
      - need delete
    - CRUD a user:
      - need create
      - need read
      - need update
      - need delete
    - filter by order/cost/whatever
    - search for a user
  */

const AdminManagement = () => {
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "user") {
      navigate("/user/profile");
    }
  }, [user, navigate]);

  if (!user) return null;

  const { username, role } = user;

  return (
    <div className={styles.adminManagement}>
      <div className={styles.header}>
        <h1>Admin Management</h1>
        <p>
          Welcome {username}. Your role: {role}
        </p>
        <p>
          <Link to="/change-password">Change your password</Link>.
        </p>
      </div>

      <CreateProduct />
    </div>
  );
};

export default AdminManagement;
