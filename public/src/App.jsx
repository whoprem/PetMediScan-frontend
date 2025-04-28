// App.jsx
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [symptom, setSymptom] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (image) formData.append("image", image);
    if (symptom) formData.append("symptom", symptom);

    const location = await getLocation();

    const res = await axios.post("http://localhost:5000/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      params: { lat: location.lat, lon: location.lon },
    });

    setResponse(res.data);
  };

  const getLocation = () =>
    new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) =>
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        })
      );
    });

  return (
    <div className="p-8">
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <textarea placeholder="Describe symptoms..." onChange={(e) => setSymptom(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h2>Diagnosis: {response.diagnosis}</h2>
          <h3>Suggested Medicine: {response.medicine}</h3>
          <h4>Available at:</h4>
          <ul>
            {response.shops.map((shop) => (
              <li key={shop.id}>{shop.name} - {shop.address}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
