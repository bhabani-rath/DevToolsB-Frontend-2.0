// components/background/MouseInteractiveBackground.jsx
import React from "react";
import { motion } from "framer-motion";

const MouseInteractiveBackground = ({ cursorX, cursorY, isDarkMode }) => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-5 opacity-20"
      style={{
        background: `radial-gradient(600px circle at ${cursorX}px ${cursorY}px, ${
          isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.08)"
        }, transparent 40%)`,
      }}
    />
  );
};

export default MouseInteractiveBackground;
