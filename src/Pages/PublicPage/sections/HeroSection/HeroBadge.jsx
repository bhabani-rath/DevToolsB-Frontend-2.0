/**
 * HeroBadge Component
 * @description Badge displaying platform version and status indicator
 * @author DevToolsB Team
 */

import React from "react";
import { motion } from "framer-motion";

const HeroBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-full mb-8 border border-white/20 dark:border-gray-700/50"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        v2.0 Now Live
      </span>
    </motion.div>
  );
};

export default HeroBadge;
