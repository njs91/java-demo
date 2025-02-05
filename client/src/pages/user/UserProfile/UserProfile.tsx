import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const UserProfile = () => {
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/management");
    }
  }, [user, navigate]);

  if (!user) return null;

  const { username, role } = user;

  return (
    <div>
      <h1>Welcome {username}</h1>
      <p>Your role: {role}</p>
    </div>
  );
};

export default UserProfile;
