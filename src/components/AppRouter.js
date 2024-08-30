import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import App from "./App";
import EditUser from "./EditUser";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route path="/user" element={<App />} />
        <Route path="/user/create" element={<EditUser />} />
        <Route path="/user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
