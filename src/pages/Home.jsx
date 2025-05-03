// src/pages/Home.jsx

import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [symptom, setSymptom] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      if (symptom) formData.append("symptom", symptom);

      const response = await axios.post(
        "https://YOUR_BACKEND_URL/analyze", // Replace with your Render backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            lat: 0, // optionally pass user's latitude
            lon: 0, // optionally pass user's longitude
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get diagnosis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">PetMediScan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Upload Photo</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div>
          <label className="block font-medium mb-1">Describe Symptoms</label>
          <input
            type="text"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="e.g., coughing, itchy skin"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-green-100 p-4 rounded">
          <h2 className="font-bold text-lg mb-2">Diagnosis Result</h2>
          <p>
            <strong>Diagnosis:</strong> {result.diagnosis}
          </p>
          <p>
            <strong>Recommended Medicine:</strong> {result.medicine}
          </p>
          <h3 className="font-bold mt-3">Nearby Shops:</h3>
          <ul className="list-disc pl-5">
            {result.shops && result.shops.length > 0 ? (
              result.shops.map((shop, index) => (
                <li key={index}>{shop.name} — {shop.address}</li>
              ))
            ) : (
              <li>No nearby shops found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
