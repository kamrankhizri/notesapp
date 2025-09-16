import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./components/mainpge";
import Detai from "./components/detai";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/details/:id" element={<Detai />} />
      </Routes>
    </Router>
  );
};

export default App;
