import React from "react";
import Dashboard from "./components/dashboards/Dashboard";
import Authentication from "./components/auth/authenticate";
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Authentication />
      <Dashboard />
    </div>
  );
}

export default App;