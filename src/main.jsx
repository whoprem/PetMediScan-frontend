import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp';
import './index.css'; // Make sure this is here!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
