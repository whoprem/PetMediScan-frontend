// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <div className="text-xl font-bold">PetMediScan</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/shops">Shops</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
