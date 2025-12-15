/**
 * ContactMethodCard Component
 * @description Card displaying a contact method with icon and details
 * @param {object} item - Contact method data (icon, label, value, color)
 * @param {number} index - Card index for stagger animation
 * @author DevToolsB Team
 */

import React from "react";
import { motion } from "framer-motion";

const ContactMethodCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300 cursor-pointer group"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <motion.div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xl">{item.icon}</span>
      </motion.div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
        <p className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.value}
        </p>
      </div>
    </motion.div>
  );
};

export default ContactMethodCard;
