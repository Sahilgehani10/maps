import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Maps from "./pages/Maps.jsx"
import MyMap from "./pages/MyMap.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/maps" element={<Maps />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
};

export default App;
 