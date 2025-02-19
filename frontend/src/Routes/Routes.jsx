import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Authentication from "../components/auth/authenticate";
import Dashboard from "../components/dashboards/Dashboard";
import Review from "../Routes/Review";
import Analytics from "../Routes/Analyics";

import { useSelector } from "react-redux";

const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        {
          isAuthenticated ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reviews" element={<Review />} />
              <Route path="/analytics" element={<Analytics />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Authentication />} />
            </>
          )
        }
      </Routes>
    </Router>
  );
};

export default AppRoutes;
