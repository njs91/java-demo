import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { UserContext } from "../../context/UserContext";

const Navigation = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userContext?.setUser(null);
    navigate("/login");
  };

  const links = userContext?.user
    ? [
        { name: "Home", url: "/" },
        { name: "Profile", url: "/user/profile" },
        { name: "Products", url: "/products" },
        { name: "Basket", url: "/user/basket" },
        { name: "Logout", url: "#", onClick: handleLogout },
      ]
    : [
        { name: "Home", url: "/" },
        { name: "Login", url: "/login" },
      ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.url} className={styles.navItem}>
            {link.onClick ? (
              <span onClick={link.onClick} className={styles.navLink}>
                {link.name}
              </span>
            ) : (
              <Link to={link.url} className={styles.navLink}>
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
