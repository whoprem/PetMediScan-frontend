import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [symptom, setSymptom] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("image", image);
    if (symptom) formData.append("symptom", symptom);

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pet Diagnosis</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Upload Pet Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Describe Symptoms</label>
          <input
            type="text"
            placeholder="E.g., coughing, limping"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-green-100 rounded">
          <h3 className="font-semibold">Diagnosis Result</h3>
          <p>Diagnosis: {response.diagnosis}</p>
          <p>Recommended Medicine: {response.medicine}</p>
        </div>
      )}
    </div>
  );
}
