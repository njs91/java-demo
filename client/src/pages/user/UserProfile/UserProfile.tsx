import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const Profile = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext?.user?.role === "admin") {
      navigate("/admin/management");
    }
  }, [userContext, navigate]);

  if (!userContext?.user) return null;

  return (
    <div>
      <h1>Welcome {userContext.user.username}</h1>
    </div>
  );
};

export default Profile;
