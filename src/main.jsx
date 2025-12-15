/**
 * Application Entry Point
 *
 * @description Mounts the React application to the DOM using React 18's createRoot API.
 * Enables StrictMode for development checks and warnings.
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/**
 * React 18 Root Rendering
 * Creates a root DOM node and renders the App component
 * StrictMode helps identify potential problems in the application
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
