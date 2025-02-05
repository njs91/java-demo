import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { UserContext } from "../../context/UserContext";

const Navigation = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          ☰
        </button>
        <ul
          className={`${styles.navList} ${isMobileMenuOpen ? styles.open : ""}`}
        >
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
      </div>
    </nav>
  );
};

export default Navigation;
