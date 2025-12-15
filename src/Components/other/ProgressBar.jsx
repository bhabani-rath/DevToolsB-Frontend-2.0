/**
 * ProgressBar Component
 *
 * @description Fixed scroll progress indicator at the top of the page.
 * Shows gradient bar that expands based on scroll position.
 *
 * @component
 * @param {MotionValue} scrollYProgress - Framer Motion scroll progress (0-1)
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

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
