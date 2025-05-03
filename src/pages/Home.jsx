import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [image, setImage] = useState(null);
  const [symptom, setSymptom] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (image) formData.append("image", image);
    if (symptom) formData.append("symptom", symptom);

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData);
      setResponse(res.data);
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🐾 Pet MediScan
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer bg-blue-50 px-4 py-3 rounded-lg border-2 border-blue-200"
          >
            <FaCamera className="text-blue-500 mr-3" />
            <span className="text-blue-500">Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <input
              type="text"
              placeholder="Describe symptoms (e.g., coughing, limping)"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing..." : "Submit"}
          </motion.button>
        </form>

        {response && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg"
          >
            <h2 className="text-lg font-bold text-green-600 mb-2">
              Diagnosis Result
            </h2>
            <p>
              <strong>Diagnosis:</strong> {response.diagnosis}
            </p>
            <p>
              <strong>Suggested Medicine:</strong> {response.medicine}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
