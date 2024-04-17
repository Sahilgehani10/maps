import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Maps from "./pages/Maps.jsx";
import MyMap from "./pages/MyMap.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Weather from "./weather/Weather.jsx";
import Test from "./pages/Test.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/maps" element={<Maps />} /> */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/test" element={<Test />} />
      <Route path="/mapbox" element={<MyMap />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
};

export default App;
