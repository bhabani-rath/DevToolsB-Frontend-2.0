import React from "react";
import { motion } from "framer-motion";

const HomeTextArea = ({ label, error, className = "", ...props }) => {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <motion.textarea
        className={`w-full px-4 py-3 rounded-lg border 
                   ${
                     error
                       ? "border-red-500"
                       : "border-gray-300 dark:border-gray-600"
                   }
                   bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 
                   focus:ring-gray-400 dark:focus:ring-gray-500
                   transition-all duration-200 resize-none ${className}`}
        whileFocus={{ scale: 1.01 }}
        rows={4}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default HomeTextArea;
