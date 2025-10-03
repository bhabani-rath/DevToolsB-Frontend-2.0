// sections/ContactSection/TrustIndicators.jsx
import React from "react";
import { motion } from "framer-motion";

const indicators = [
  {
    icon: "🛠️",
    text: "Tool Generator",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    icon: "📊",
    text: "Real-Time Analytics",
    color: "from-teal-400 to-teal-600",
  },
  {
    icon: "👥",
    text: "User & Dev Management",
    color: "from-pink-400 to-pink-600",
  },
  {
    icon: "🔒",
    text: "Secure Access Control",
    color: "from-amber-400 to-amber-600",
  },
];

const TrustIndicators = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
      className="mt-16 text-center"
    >
      <div className="flex flex-wrap justify-center gap-8 items-center">
        {indicators.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 group"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className={`w-8 h-8 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm">{item.icon}</span>
            </motion.div>
            <span className="text-sm font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustIndicators;
