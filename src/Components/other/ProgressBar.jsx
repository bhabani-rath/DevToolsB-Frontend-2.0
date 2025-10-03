// components/ui/ProgressBar.jsx
import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ scrollYProgress }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-40 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ProgressBar;
