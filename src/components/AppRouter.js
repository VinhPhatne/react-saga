// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import EditUser from "./EditUser"; // Sửa thành tên component đúng
import NewUserForm from "./NewUserForm";

const AppRouter = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/:id" element={<EditUser />} />
        <Route path="/create" element={<NewUserForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
