import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import EditUser from "./EditUser"; 
import NewUserForm from "./NewUserForm";

const AppRouter = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user" element={<EditUser />} />
        <Route path="/user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
