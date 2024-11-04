import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
const container = document.getElementById('app');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
}
else {
    console.error("Elemento contenedor '#app' no encontrado.");
}
