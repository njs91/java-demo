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

  return <div>Profile</div>;
};

export default Profile;
