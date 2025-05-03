// src/pages/NearbyShops.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NearbyShops() {
  const [shops, setShops] = useState([]);
  const [location, setLocation] = useState({ lat: "", lon: "" });
  const [medicine, setMedicine] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const fetchAnalysis = async () => {
    if (!location.lat || !location.lon || !medicine) return;

    try {
      const res = await axios.post(`http://localhost:5000/analyze?lat=${location.lat}&lon=${location.lon}`, {
        symptom: medicine, // treating medicine input as symptom prompt
      });

      setDiagnosis(res.data.diagnosis);
      setMedicine(res.data.medicine);
      setShops(res.data.shops);
    } catch (err) {
      console.error("Error analyzing:", err);
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Nearby Shops & Medicine Suggestion</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Enter symptom"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
        />
        <button
          onClick={fetchAnalysis}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Analyze & Find Shops
        </button>
      </div>

      {diagnosis && (
        <div className="mb-4 p-4 bg-green-100 rounded">
          <p className="font-semibold">Diagnosis: {diagnosis}</p>
          <p className="font-semibold">Suggested Medicine: {medicine}</p>
        </div>
      )}

      {shops.length === 0 ? (
        <p className="text-gray-600">No shops found.</p>
      ) : (
        <ul className="space-y-4">
          {shops.map((shop) => (
            <li key={shop._id} className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold">{shop.name}</h3>
              <p className="text-sm text-gray-600">{shop.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
