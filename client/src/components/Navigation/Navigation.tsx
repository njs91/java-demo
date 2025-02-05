import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { UserContext } from "../../context/UserContext";

const Navigation = () => {
  const userContext = useContext(UserContext);

  const links = userContext?.user
    ? [
        { name: "Home", url: "/" },
        { name: "Logout", url: "/logout" },
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
            <Link to={link.url} className={styles.navLink}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
