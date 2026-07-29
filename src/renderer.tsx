import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Ascent Trade Mart</h1>
    </div>
  );
};

const container = document.getElementById("root");

// Prevents TypeScript from complaining that the container might be null
if (!container) {
  throw new Error("Root element not found in index.html");
}

const root = createRoot(container);

// StrictMode runs components twice in development to catch hidden bugs
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
