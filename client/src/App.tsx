import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import AdminCreateAccount from "./pages/AdminCreateAccount";
import AdminManagement from "./pages/AdminManagement";
import UserLogin from "./pages/UserLogin";
import UserCreateAccount from "./pages/UserCreateAccount";
import UserShopping from "./pages/UserShopping";
import UserBasket from "./pages/UserBasket";
import Homepage from "./pages/Homepage";

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
