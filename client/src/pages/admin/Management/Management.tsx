import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const AdminManagement = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext?.user?.role === "user") {
      navigate("/user/profile");
    }
  }, [userContext, navigate]);

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
      {/* Add your management functionalities here */}
    </div>
  );
};

export default AdminManagement;
