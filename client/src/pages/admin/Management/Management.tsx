import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

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

  /*
    lists users and products
    
    functionality:
    - CRUD a product
    - CRUD a user
    - filter by order/cost/whatever
    - search for a user
  */
  return (
    <div>
      <h1>Admin Management</h1>
      <p>
        Welcome {username}. Your role: {role}
      </p>
      <p>
        <Link to="/change-password">Change your password</Link>.
      </p>
    </div>
  );
};

export default AdminManagement;
