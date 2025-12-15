/**
 * CTAStats Component
 * @description Animated statistics display for CTA section
 * @author DevToolsB Team
 */

import React from "react";
import { motion } from "framer-motion";

const stats = [
  {
    number: "50+",
    label: "Tools Created",
    color: "from-blue-400 to-blue-600",
  },
  {
    number: "1K+",
    label: "Happy Users",
    color: "from-purple-400 to-purple-600",
  },
  { number: "4.9/5", label: "User Rating", color: "from-pink-400 to-pink-600" },
];

const CTAStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mt-12 flex flex-wrap justify-center gap-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center group"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <motion.h3
              className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}
              animate={{
                opacity: [0.8, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {stat.number}
            </motion.h3>
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
              animate={{
                scale: [1, 1.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <p className="text-gray-400 mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CTAStats;
