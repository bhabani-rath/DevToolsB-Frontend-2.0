// components/ui/FloatingActionButtons.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingActionButtons = ({ isDarkMode, toggleTheme }) => {
  const buttons = [
    {
      id: "chat",
      icon: "💬",
      tooltip: "Need Help?",
      gradient: "from-blue-500 to-purple-600",
      delay: 1,
      onClick: () => console.log("Open chat"),
    },
    {
      id: "theme",
      icon: isDarkMode ? "🌞" : "🌙",
      tooltip: "Toggle Theme",
      gradient: "from-orange-500 to-pink-600",
      delay: 1.2,
      onClick: toggleTheme,
    },
    {
      id: "top",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      ),
      tooltip: "Back to Top",
      gradient: "from-green-500 to-teal-600",
      delay: 1.4,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
      {buttons.map((button) => (
        <motion.div
          key={button.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: button.delay }}
          className="relative group"
        >
          <motion.button
            onClick={button.onClick}
            className={`w-16 h-16 bg-gradient-to-r ${button.gradient} text-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20`}
            whileHover={{ scale: 1.1, rotate: button.id === "theme" ? 360 : 0 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={button.icon}
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180, scale: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl"
              >
                {button.icon}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          <motion.span
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/20"
            initial={{ x: 10 }}
            whileHover={{ x: 0 }}
          >
            {button.tooltip}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingActionButtons;
