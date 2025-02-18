import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Authentication from "../components/auth/authenticate";
import Dashboard from "../components/dashboards/Dashboard";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Routes = () => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <Authentication /> } />
    </Routes>
  );
};

export default Routes;
