import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import AdminManagement from "./pages/admin/Management/Management";
import UserCreateAccount from "./pages/user/CreateAccount/CreateAccount";
import UserShopping from "./pages/user/Shopping/Shopping";
import UserBasket from "./pages/user/Basket/Basket";
import Homepage from "./pages/Homepage/Homepage";
import Navigation from "./components/Navigation/Navigation";
import styles from "./style.module.scss";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/admin/management" element={<AdminManagement />} />
          <Route path="/user/create-account" element={<UserCreateAccount />} />
          <Route path="/user/shopping" element={<UserShopping />} />
          <Route path="/user/basket" element={<UserBasket />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
