import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

interface PrivateRouteProps {
  redirectPath?: string;
  inverse?: boolean;
}

const PrivateRoute = ({
  redirectPath = "/",
  inverse = false,
}: PrivateRouteProps) => {
  const userContext = useContext(UserContext);

  if (inverse) {
    return userContext?.user ? <Navigate to={redirectPath} /> : <Outlet />;
  }

  return userContext?.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
