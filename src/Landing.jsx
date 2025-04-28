import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-white flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-emerald-600">🐾 PetMediScan</h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><a href="#features" className="hover:text-emerald-600 transition">Features</a></li>
          <li><a href="#about" className="hover:text-emerald-600 transition">About</a></li>
          <li><a href="#contact" className="hover:text-emerald-600 transition">Contact</a></li>
        </ul>
        <Link to="/app">
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700 transition">
            Try Now
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between px-10 py-20"
      >
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4 leading-tight">
            Scan. Detect. Treat. <br /> All for your furry friend.
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            PetMediScan helps pet parents identify pet illnesses through AI-powered image analysis and symptom input. Instantly get medicine suggestions and shop locations near you!
          </p>
          <Link to="/app">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition">
              Get Started
            </button>
          </Link>
        </div>

        <motion.img
          src="https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg"
          alt="Pet Hero"
          className="rounded-xl shadow-xl w-full max-w-md mt-10 md:mt-0"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 text-sm">
        © 2025 PetMediScan · Built with ❤️ for pet lovers everywhere
      </footer>
    </div>
  );
}
