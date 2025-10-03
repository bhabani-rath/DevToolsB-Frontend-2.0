// Pages/PublicPage/components/ToolCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ToolCard = ({ tool, index, isHovered, onHover }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to individual tool page
    navigate(`/tools/${tool.slug}`);
    // Or open in a modal/same page component
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.03, // Small delay for stagger effect
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => onHover(tool.id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
      className="h-full"
    >
      <div
        className={`
        h-full p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
        cursor-pointer transition-all duration-200
        ${
          isHovered
            ? "shadow-xl scale-[1.02] border-blue-500 dark:border-blue-400"
            : "shadow-md hover:shadow-lg"
        }
      `}
      >
        {/* Popular Badge */}
        {tool.isPopular && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-medium">
              Popular
            </span>
          </div>
        )}

        {/* Tool Icon */}
        <div
          className={`
          w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${tool.gradient} 
          flex items-center justify-center shadow-md
        `}
        >
          <span className="text-2xl">{tool.icon}</span>
        </div>

        {/* Tool Name */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
          {tool.name}
        </h3>

        {/* Tool Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3 line-clamp-2">
          {tool.description}
        </p>

        {/* Category Badge */}
        <div className="flex justify-center">
          <span
            className={`
            px-2 py-1 text-xs rounded-full bg-gradient-to-r ${tool.categoryColor} 
            text-white font-medium
          `}
          >
            {tool.categoryName}
          </span>
        </div>

        {/* Hover Features - Simple fade in/out */}
        <div
          className={`
          mt-3 pt-3 border-t border-gray-200 dark:border-gray-700
          transition-all duration-200
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
            Key Features:
          </p>
          <ul className="space-y-0.5">
            {tool.features.slice(0, 3).map((feature, idx) => (
              <li
                key={idx}
                className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1"
              >
                <span className="text-blue-500 mt-0.5">•</span>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action indicator */}
        <div
          className={`
          mt-3 flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400
          transition-all duration-200
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        >
          <span className="text-sm font-medium">Open Tool</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;
