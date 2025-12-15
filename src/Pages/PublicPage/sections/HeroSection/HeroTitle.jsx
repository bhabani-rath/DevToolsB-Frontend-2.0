/**
 * HeroTitle Component
 * @description Main animated hero title with gradient text effects
 * @author DevToolsB Team
 */

import React from "react";
import { motion } from "framer-motion";

const HeroTitle = () => {
  return (
    <motion.h1 className="text-6xl mobile:text-7xl tablet:text-8xl laptop:text-9xl font-bold mb-6">
      <motion.span
        initial={{ opacity: 0, x: -50, rotateX: -90 }}
        animate={{ opacity: 1, x: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="inline-block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent"
      >
        Dev
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: 50, rotateX: 90 }}
        animate={{ opacity: 1, x: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
      >
        ToolsB
      </motion.span>
    </motion.h1>
  );
};

export default HeroTitle;
