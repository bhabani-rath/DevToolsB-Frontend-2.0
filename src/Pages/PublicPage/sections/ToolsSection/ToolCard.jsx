/**
 * ToolCard Component
 * @description Card component for displaying individual tool information
 * @author DevToolsB Team
 */

import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import React from "react";

const ToolCard = ({ tool, index, isHovered, onHover }) => {
  const navigate = useNavigate();

  if (!tool) return null;

  const handleClick = () => {
    navigate(`/tools/${tool.slug}`);
  };

  return (
    <div
      onMouseEnter={() => onHover && onHover(tool.id)}
      onMouseLeave={() => onHover && onHover(null)}
      onClick={handleClick}
      className={`
        w-full cursor-pointer
        bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 
        rounded-2xl mobile:rounded-3xl 
        p-4 mobile:p-5 tablet:p-6 
        shadow-lg hover:shadow-2xl dark:shadow-purple-900/20 dark:hover:shadow-purple-900/40 
        transition-all duration-300
        border border-transparent dark:border-gray-700
        ${isHovered ? "scale-105 shadow-2xl" : "scale-100"}
        hover:scale-105
      `}
    >
      {/* Header Section */}
      <div className="flex items-center gap-2 mobile:gap-3 mb-3 mobile:mb-4">
        {/* Tool Icon */}
        <div className="w-12 h-12 mobile:w-14 mobile:h-14 text-3xl mobile:text-4xl flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-md">
          {tool.icon}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-[10px] mobile:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">
            {tool.categoryName}
          </span>
          <span className="text-xs mobile:text-sm tablet:text-base font-semibold text-gray-800 dark:text-gray-100">
            {tool.isPopular && "⭐ Popular"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="mb-4 mobile:mb-5 tablet:mb-6">
        <h2 className="text-lg mobile:text-xl tablet:text-2xl font-bold text-gray-900 dark:text-white mb-2 mobile:mb-3 line-clamp-2">
          {tool.name}
        </h2>
        <p className="text-xs mobile:text-sm tablet:text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 mobile:line-clamp-3">
          {tool.description}
        </p>
      </div>

      {/* Features Section */}
      {tool.features && tool.features.length > 0 && (
        <div className="mb-4 mobile:mb-5">
          <div className="flex flex-wrap gap-2">
            {tool.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="text-[10px] mobile:text-xs px-2 py-1 bg-white/50 dark:bg-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300 font-medium"
              >
                {feature}
              </span>
            ))}
            {tool.features.length > 3 && (
              <span className="text-[10px] mobile:text-xs px-2 py-1 bg-white/50 dark:bg-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300 font-medium">
                +{tool.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className={`
          w-full
          bg-gradient-to-r ${tool.gradient || "from-purple-600 to-blue-600"}
          hover:opacity-90
          text-white font-semibold 
          py-2.5 mobile:py-3 tablet:py-3.5 
          px-4 mobile:px-6 
          text-sm mobile:text-base tablet:text-lg 
          rounded-lg mobile:rounded-xl 
          transition-all duration-300 
          flex items-center justify-center gap-2 
          shadow-md hover:shadow-lg 
          dark:shadow-purple-900/30 dark:hover:shadow-purple-900/50 
          active:scale-[0.98]
        `}
      >
        Explore Now
        <span className="text-base mobile:text-lg tablet:text-xl">
          <BsFillArrowUpRightCircleFill />
        </span>
      </button>
    </div>
  );
};

export default ToolCard;
