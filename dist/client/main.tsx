import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';

const container = document.getElementById('app');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<React.StrictMode><App /></React.StrictMode>);
} else {
  console.error("Elemento contenedor '#app' no encontrado.");
}
