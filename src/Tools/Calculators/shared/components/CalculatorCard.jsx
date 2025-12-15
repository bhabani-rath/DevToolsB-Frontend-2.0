/**
 * CalculatorCard - Reusable card wrapper for all calculators
 * Provides consistent styling with glassmorphism effect and dark mode support
 */

import { useDarkMode } from "../../../../Context/ThemeContext";

const CalculatorCard = ({
  title,
  icon,
  children,
  gradient = "from-blue-500 to-purple-600",
  className = "",
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-6xl">{icon}</span>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}
            >
              {title}
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r ${gradient} rounded-full"></div>
          </div>

          {/* Card Container */}
          <div
            className={`
            bg-white/70 dark:bg-gray-800/70 
            backdrop-blur-xl 
            rounded-3xl 
            shadow-2xl 
            border border-gray-200/50 dark:border-gray-700/50
            p-6 md:p-8
            ${className}
          `}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorCard;
