import React from "react";
import AppRoutes from "./Routes/Routes";
import Navbar from "./components/Navbar";
// import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
