import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Maps from "./pages/Maps.jsx"
import MyMap from "./pages/MyMap.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/maps" element={<Maps />} />
    </Routes>
  );
};

export default App;
