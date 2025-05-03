import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function SymptomInput() {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const { coords } = await getLocation();
      const res = await axios.post(
        "http://localhost:5000/analyze?lat=" + coords.latitude + "&lon=" + coords.longitude,
        { symptom }
      );
      setResult(res.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to get result");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          🐾 Check Your Pet's Symptom
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="text"
            className="w-full border border-purple-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Enter symptom (e.g., cough, rash)"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Processing..." : "Analyze Symptom"}
          </motion.button>
        </form>

        {result && (
          <motion.div
            className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-2 text-purple-700">🩺 Diagnosis Result</h3>
            <p className="mb-1">
              <strong>Diagnosis:</strong> {result.diagnosis}
            </p>
            <p className="mb-3">
              <strong>Medicine:</strong> {result.medicine}
            </p>
            <h4 className="font-semibold mb-2">Nearby Shops:</h4>
            {result.shops.length > 0 ? (
              <ul className="list-disc list-inside">
                {result.shops.map((shop) => (
                  <li key={shop._id}>
                    {shop.name} — {shop.address}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No shops found nearby.</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
