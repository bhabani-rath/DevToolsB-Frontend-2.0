/**
 * HeroStats Component
 * @description Animated statistics display for hero section
 * @author DevToolsB Team
 */

import React from "react";
import { motion } from "framer-motion";

const stats = [
  {
    number: "50+",
    label: "Tools Available",
    color: "from-blue-400 to-blue-600",
  },
  {
    number: "10K+",
    label: "Users",
    color: "from-green-400 to-green-600",
  },
  {
    number: "99.9%",
    label: "Uptime",
    color: "from-purple-400 to-purple-600",
  },
];

const HeroStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center group"
          whileHover={{ y: -10, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
          >
            <motion.h3
              className={`text-3xl mobile:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}
            >
              {stat.number}
            </motion.h3>
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
              animate={{
                scale: [1, 1.05],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroStats;
