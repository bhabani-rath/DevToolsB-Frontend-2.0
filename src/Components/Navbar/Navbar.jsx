import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../../Context/ThemeContext";
import SignUpModal from "../Modals/SignUpModal";
import SignInModal from "../Modals/SignInModal";

const Navbar = ({ activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Updated navigation links with proper hrefs
  const navLinks = [
    { name: "Home", href: "#home", icon: "🏠" },
    { name: "About", href: "#about", icon: "ℹ️" },
    { name: "Features", href: "#features", icon: "✨" },
    { name: "Teams", href: "#team", icon: "👥" },
    { name: "Tools", href: "#tools", icon: "⚙️" },
    { name: "Contact", href: "#contact", icon: "📧" },
  ];

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    // Close mobile menu after clicking
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 },
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const themeIconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-white shadow-lg dark:bg-gray-900 transition-colors duration-300 fixed top-0 z-10 w-full"
    >
      <div className="w-full px-4 mobile:px-6 tablet:px-8 laptop:px-10 desktop:px-12">
        <div className="flex justify-between items-center h-16 tablet:h-20">
          {/* Logo Section */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center group relative"
              aria-label="DevToolsB Home"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-gray-600/20 
                 dark:from-gray-500/20 dark:to-gray-300/20 
                 rounded-full blur-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.2, opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              />

              <motion.img
                src="https://res.cloudinary.com/dva4r5mad/image/upload/v1751438420/B_Logo_dor9oj.png"
                alt="DevToolsB Logo"
                className="h-10 w-10 scale-150 mini:h-12 mini:w-12 mobile:h-14 mobile:w-14 tablet:h-16 tablet:w-16 laptop:h-20 laptop:w-20 relative z-10"
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1,
                }}
                transition={{
                  rotate: { duration: 0.5, ease: "easeInOut" },
                  scale: { duration: 0.2 },
                }}
              />

              <div className="ml-2 mobile:ml-3 tablet:ml-4 flex flex-col justify-center">
                <motion.div
                  className="flex items-baseline"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-lg mini:text-xl mobile:text-2xl tablet:text-3xl laptop:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Dev
                  </span>
                  <span className="text-lg mini:text-xl mobile:text-2xl tablet:text-3xl laptop:text-4xl font-bold text-gray-500 bg-clip-text">
                    ToolsB
                  </span>
                </motion.div>

                <motion.span
                  className="hidden tablet:block text-xs laptop:text-sm text-gray-500 dark:text-gray-400 -mt-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  One Stop for Daily Calculations
                </motion.span>
              </div>

              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 
                 bg-gradient-to-r from-gray-900 to-gray-600 
                 dark:from-gray-300 dark:to-gray-500 
                 rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </a>
          </motion.div>

          {/* Desktop Layout */}
          <div className="hidden laptop:flex items-center justify-between flex-1">
            <motion.div
              className="flex items-center justify-center flex-1 mx-8 laptop:mx-16 desktop:mx-16"
              variants={navVariants}
            >
              <div className="flex items-center space-x-1 relative">
                <AnimatePresence>
                  {hoveredIndex !== null && (
                    <motion.span
                      className="absolute inset-y-0 bg-gradient-to-r from-gray-100 to-gray-200 
                   dark:from-gray-800/30 dark:to-gray-700/30                    rounded-full -z-10"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                      }}
                    />
                  )}
                </AnimatePresence>

                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative flex items-center gap-2 px-4 py-2
                 text-gray-600 dark:text-gray-300 
                 hover:text-gray-900 dark:hover:text-white 
                 text-sm desktop:text-base desktop-large:text-lg 
                 transition-all duration-300 rounded-full
                 group cursor-pointer z-10
                 ${
                   activeSection === link.href.substring(1)
                     ? "text-gray-900 dark:text-white"
                     : ""
                 }`}
                    variants={linkVariants}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="text-lg"
                      initial={{ x: -10, opacity: 0 }}
                      animate={
                        hoveredIndex === index ||
                        activeSection === link.href.substring(1)
                          ? { x: 0, opacity: 1 }
                          : { x: -10, opacity: 0 }
                      }
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.icon}
                    </motion.span>

                    <span
                      className={`relative font-medium transition-all duration-300 ${
                        hoveredIndex === index ||
                        activeSection === link.href.substring(1)
                          ? " bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 bg-clip-text text-transparent"
                          : ""
                      }`}
                    >
                      {link.name}
                    </span>

                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-0.5 
                   bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 
                   dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 
                   rounded-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={
                        hoveredIndex === index ||
                        activeSection === link.href.substring(1)
                          ? { scaleX: 1, opacity: 1 }
                          : { scaleX: 0, opacity: 0 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />

                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full
                     bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 
                     blur-xl -z-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div
              className="flex items-center space-x-3 desktop:space-x-4 flex-shrink-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            >
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.svg
                      key="sun"
                      className="h-5 w-5 desktop:h-6 desktop:w-6 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      variants={themeIconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="moon"
                      className="h-5 w-5 desktop:h-6 desktop:w-6 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      variants={themeIconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={() => setIsSignInOpen(true)}
                className="relative px-4 py-2 desktop:px-6 desktop:py-2.5 
             text-sm desktop:text-base 
             text-gray-700 dark:text-gray-300 
             border-2 border-gray-300 dark:border-gray-600
             rounded-lg overflow-hidden
             bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800
             transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-transparent dark:from-gray-700/50" />
                </div>
                <span className="relative z-10 font-medium">Sign In</span>
              </motion.button>

              <motion.button
                onClick={() => setIsSignUpOpen(true)}
                className="relative px-4 py-2 desktop:px-6 desktop:py-2.5 
             text-sm desktop:text-base 
             bg-gray-900 dark:bg-gray-700
             text-white rounded-lg
             overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 
               dark:from-gray-800/20 dark:to-gray-700/20 opacity-0 
               group-hover:opacity-100 transition-opacity"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <span className="relative z-10 font-semibold">Sign Up</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="laptop:hidden flex items-center space-x-2">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.svg
                    key="sun-mobile"
                    className="h-5 w-5 mobile:h-6 mobile:w-6 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    variants={themeIconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon-mobile"
                    className="h-5 w-5 mobile:h-6 mobile:w-6 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    variants={themeIconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg
                className="h-6 w-6 mobile:h-7 mobile:w-7 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="laptop:hidden pb-4 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative flex items-center gap-2 px-4 py-2
                 text-gray-600 dark:text-gray-300 
                 hover:text-gray-900 dark:hover:text-white 
                 text-sm transition-all duration-300 rounded-lg
                 group cursor-pointer
                 ${
                   activeSection === link.href.substring(1)
                     ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                     : ""
                 }`}
                    variants={mobileItemVariants}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                ))}

                <motion.div
                  className="pt-4 space-y-2 px-3"
                  variants={mobileItemVariants}
                >
                  <motion.button
                    onClick={() => setIsSignInOpen(true)}
                    className="w-full px-4 py-3 
                             text-base mobile:text-lg 
                             text-gray-700 dark:text-gray-300 
                             border border-gray-300 dark:border-gray-600 
                             rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 
                             transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>

                  <motion.button
                    onClick={() => setIsSignUpOpen(true)}
                    className="w-full px-4 py-3 
               text-base mobile:text-lg 
               bg-gray-900 hover:bg-gray-800 
               dark:bg-gray-700 dark:hover:bg-gray-600
               text-white rounded-lg 
               transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Up
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </motion.nav>
  );
};

export default Navbar;
