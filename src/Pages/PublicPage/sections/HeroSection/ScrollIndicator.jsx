// sections/HeroSection/ScrollIndicator.jsx
import React from "react";
import { motion } from "framer-motion";

const ScrollIndicator = ({ targetSection = "about" }) => {
  const handleClick = () => {
    document
      .querySelector(`#${targetSection}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="flex flex-col items-center gap-2 cursor-pointer group"
        onClick={handleClick}
      >
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          Explore DevToolsB
        </span>

        <div className="w-7 h-12 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center items-start group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-300">
          <motion.div
            className="w-2 h-2 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mt-2 shadow-md"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
