// src/MainApp.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Landing from './Landing';
import NearbyShops from "./pages/NearbyShops";
import Login from "./pages/Login";
import Home from "./pages/Home";

<Route path="/" element={<Home />} />

export default function MainApp() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="/shops" element={<NearbyShops />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </Router>
  );
}
