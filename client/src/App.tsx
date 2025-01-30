import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import AdminCreateAccount from "./pages/AdminCreateAccount";
import AdminManagement from "./pages/AdminManagement";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/create-account"
            element={<AdminCreateAccount />}
          />
          <Route path="/admin/management" element={<AdminManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
