// components/ui/FloatingActionButtons.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingActionButtons = ({ isDarkMode, toggleTheme }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttons = [
    {
      id: "chat",
      icon: "💬",
      tooltip: "Need Help?",
      gradient: "from-blue-500 to-purple-600",
      delay: 1,
      onClick: () => console.log("Open chat"),
      alwaysShow: true,
    },
    {
      id: "top",
      icon: (
        <svg
          className="w-4 h-4 mobile:w-5 mobile:h-5 mobile-large:w-6 mobile-large:h-6"
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
      delay: 0.1,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      alwaysShow: false,
    },
  ];

  return (
    <div
      className="fixed 
      bottom-4 right-4 
      mobile:bottom-5 mobile:right-5 
      mobile-large:bottom-6 mobile-large:right-6
      tablet:bottom-8 tablet:right-8
      z-40 flex flex-col 
      gap-2 mobile:gap-3 mobile-large:gap-4"
    >
      {buttons.map((button) => {
        // Only show scroll to top when scrolled down
        if (button.id === "top" && !showScrollTop) return null;

        return (
          <motion.div
            key={button.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: button.delay }}
            className="relative group"
          >
            <motion.button
              onClick={button.onClick}
              className={`
                w-12 h-12 
                mobile:w-14 mobile:h-14 
                mobile-large:w-16 mobile-large:h-16
                bg-gradient-to-r ${button.gradient} 
                text-white rounded-full 
                shadow-lg hover:shadow-xl 
                flex items-center justify-center 
                transition-all duration-300 
                backdrop-blur-sm 
                border border-white/20
                active:scale-90`}
              whileHover={{
                scale: 1.1,
                rotate: button.id === "theme" ? 360 : 0,
              }}
              whileTap={{ scale: 0.9 }}
              aria-label={button.tooltip}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={button.icon}
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 180, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg mobile:text-xl mobile-large:text-2xl"
                >
                  {button.icon}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Tooltip - Hidden on small screens, positioned left on larger screens */}
            <motion.span
              className="
                hidden tablet:block
                absolute right-full mr-3 
                top-1/2 -translate-y-1/2 
                bg-gray-900 dark:bg-gray-800 
                text-white px-3 py-2 
                rounded-lg text-sm 
                whitespace-nowrap 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-200
                backdrop-blur-sm 
                border border-white/20
                shadow-lg
                pointer-events-none"
              initial={{ x: 10 }}
              whileHover={{ x: 0 }}
            >
              {button.tooltip}
              {/* Tooltip Arrow */}
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <span className="block w-0 h-0 border-l-8 border-l-gray-900 dark:border-l-gray-800 border-y-4 border-y-transparent"></span>
              </span>
            </motion.span>

            {/* Mobile Tooltip - Shows below button on mobile */}
            <motion.span
              className="
                tablet:hidden
                absolute bottom-full mb-2 
                left-1/2 -translate-x-1/2 
                bg-gray-900 dark:bg-gray-800 
                text-white px-2 py-1 
                rounded text-xs 
                whitespace-nowrap 
                opacity-0 group-active:opacity-100 
                transition-opacity duration-200
                backdrop-blur-sm 
                border border-white/20
                shadow-lg
                pointer-events-none"
            >
              {button.tooltip}
              {/* Arrow pointing down */}
              <span className="absolute top-full left-1/2 -translate-x-1/2">
                <span className="block w-0 h-0 border-t-8 border-t-gray-900 dark:border-t-gray-800 border-x-4 border-x-transparent"></span>
              </span>
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingActionButtons;
