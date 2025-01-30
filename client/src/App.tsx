import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/admin/login/AdminLogin";
import AdminCreateAccount from "./pages/admin/create-account/AdminCreateAccount";
import AdminManagement from "./pages/admin/management/AdminManagement";
import UserLogin from "./pages/user/login/UserLogin";
import UserCreateAccount from "./pages/user/create-account/UserCreateAccount";
import UserShopping from "./pages/user/shopping/UserShopping";
import UserBasket from "./pages/user/basket/UserBasket";
import Homepage from "./pages/homepage/Homepage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/create-account"
            element={<AdminCreateAccount />}
          />
          <Route path="/admin/management" element={<AdminManagement />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/create-account" element={<UserCreateAccount />} />
          <Route path="/user/shopping" element={<UserShopping />} />
          <Route path="/user/basket" element={<UserBasket />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
