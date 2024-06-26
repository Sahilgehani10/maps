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
import HotelSearch from "./pages/HotelSearch.jsx";
import ExpenseTracker from "./pages/expense-tracker/expense.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/Home" element={<Landing />} />
      {/* <Route path="/maps" element={<Maps />} /> */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/test" element={<Test />} />
      <Route path="/mapbox" element={<MyMap />} />
      <Route path="/" element={<Home />} />
      <Route path="/expense" element={<ExpenseTracker />} />
    </Routes>
  );
};

export default App;
