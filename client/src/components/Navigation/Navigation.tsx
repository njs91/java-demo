import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const links = [
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
