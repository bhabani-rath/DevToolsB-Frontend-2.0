// components/shared/AnimatedButton.jsx
import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  icon = null,
  className = "",
}) => {
  const baseStyles =
    "px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden";

  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0",
    secondary:
      "bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900",
    gradient:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0",
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (icon === "arrow-right") {
      return (
        <motion.svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </motion.svg>
      );
    }

    return icon;
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? "w-full" : "w-full mobile:w-auto"
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative flex items-center justify-center gap-2">
        {children}
        {renderIcon()}
      </span>
      {variant === "primary" || variant === "gradient" ? (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
        />
      ) : null}
    </motion.button>
  );
};

export default AnimatedButton;
