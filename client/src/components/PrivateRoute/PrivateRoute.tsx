import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const PrivateRoute = () => {
  const userContext = useContext(UserContext);

  return userContext?.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
