import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import AdminManagement from "./pages/admin/Management/Management";
import UserCreateAccount from "./pages/user/CreateAccount/CreateAccount";
import Homepage from "./pages/Homepage/Homepage";
import Navigation from "./components/Navigation/Navigation";
import styles from "./style.module.scss";
import ChangePassword from "./pages/user/ChangePassword/ChangePassword";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Products from "./pages/products/Products/Products";
import UserProfile from "./pages/user/UserProfile/UserProfile";
import Basket from "./pages/user/Basket/Basket";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className={styles.container}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Products />} />
            <Route element={<PrivateRoute inverse redirectPath="/" />}>
              <Route path="/login" element={<Login />} />
              <Route path="/create-account" element={<CreateAccount />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/admin/management" element={<AdminManagement />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route
                path="/user/create-account"
                element={<UserCreateAccount />}
              />
              <Route path="/user/basket" element={<Basket />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
