/**
 * Footer Component - Site Footer
 *
 * @description Comprehensive footer with animated elements, tool categories,
 * social links, newsletter subscription, and legal modals.
 *
 * @component
 * @features
 * - Animated brand section with logo
 * - Social media links with hover animations
 * - Tool category navigation (Calculators, Converters, Generators)
 * - Newsletter subscription form
 * - Privacy and Terms modals
 * - Floating background elements
 * - Back-to-top button
 * - Fully responsive design
 * - Theme-aware styling
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../../Context/ThemeContext";
import PrivacyModal from "../Modals/PrivacyModal";
import TermsModal from "../Modals/TermsModal";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMessageCircle,
} from "react-icons/fi";

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [email, setEmail] = useState("");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const toolCategories = [
    {
      title: "Calculators",
      icon: "🧮",
      links: [
        "Percentage Calculator",
        "BMI Calculator",
        "Loan Calculator",
        "Age Calculator",
      ],
    },
    {
      title: "Converters",
      icon: "🔄",
      links: [
        "Unit Converter",
        "Currency Converter",
        "Color Converter",
        "Temperature Converter",
      ],
    },
    {
      title: "Generators",
      icon: "⚡",
      links: [
        "Password Generator",
        "QR Code Generator",
        "Lorem Ipsum",
        "UUID Generator",
      ],
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub />,
      href: "https://github.com",
      color: "#333333",
      hoverColor: "#000000",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      href: "https://twitter.com",
      color: "#1DA1F2",
      hoverColor: "#1a91da",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin />,
      href: "https://linkedin.com",
      color: "#0077B5",
      hoverColor: "#006399",
    },
    {
      name: "Discord",
      icon: <FiMessageCircle />,
      href: "https://discord.com",
      color: "#7289DA",
      hoverColor: "#5b73c4",
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing:", email);
    setEmail("");
  };

  return (
    <>
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 relative"
      >
        <div className="w-full px-4 mini:px-5 mobile:px-6 tablet:px-8 laptop:px-10 desktop:px-12 py-8 mobile:py-10 tablet:py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-5 gap-6 mobile:gap-8 laptop:gap-6">
            {/* Brand Section */}
            <motion.div
              variants={itemVariants}
              className="col-span-1 mobile:col-span-2 laptop:col-span-2"
            >
              <motion.div
                className="flex items-center mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-gray-600/20 
                             dark:from-gray-500/20 dark:to-gray-300/20 
                             rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <img
                    src="https://res.cloudinary.com/dva4r5mad/image/upload/v1751438420/B_Logo_dor9oj.png"
                    alt="DevToolsB Logo"
                    className="h-10 w-10 mini:h-11 mini:w-11 mobile:h-12 mobile:w-12 tablet:h-14 tablet:w-14 relative z-10"
                  />
                </div>
                <div className="ml-2 mobile:ml-3">
                  <h3 className="text-lg mini:text-xl mobile:text-2xl font-bold">
                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Dev
                    </span>
                    <span className="text-gray-500">ToolsB</span>
                  </h3>
                </div>
              </motion.div>

              <p className="text-gray-600 dark:text-gray-400 mb-4 mobile:mb-6 text-xs mini:text-sm mobile:text-base max-w-md">
                Your comprehensive toolkit for calculations, conversions, and
                code generation. Simplifying developer workflows with powerful,
                easy-to-use tools.
              </p>

              <div className="flex gap-2 mobile:gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="w-8 h-8 mobile:w-10 mobile:h-10 rounded-lg 
                 bg-gray-100 dark:bg-gray-800 
                 flex items-center justify-center
                 transition-all duration-300 relative overflow-hidden"
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: social.color,
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 2 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: `radial-gradient(circle, ${social.color}60 0%, transparent 70%)`,
                          filter: "blur(10px)",
                        }}
                      />

                      <motion.div
                        className="relative z-10 text-gray-600 dark:text-gray-400 
                   group-hover:text-white transition-colors duration-300"
                        animate={{
                          y: [0, 0, 0],
                        }}
                        whileHover={{
                          y: [0, -8, 0],
                          transition: {
                            y: {
                              duration: 0.6,
                              ease: "easeOut",
                              repeat: Infinity,
                            },
                          },
                        }}
                      >
                        <span className="text-base mobile:text-lg">
                          {social.icon}
                        </span>
                      </motion.div>
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Tool Categories */}
            {toolCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className={`space-y-3 mobile:space-y-4 ${
                  categoryIndex === 2
                    ? "mobile:col-span-2 laptop:col-span-1"
                    : ""
                }`}
                onHoverStart={() => setHoveredSection(categoryIndex)}
                onHoverEnd={() => setHoveredSection(null)}
              >
                <motion.h4
                  className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm mobile:text-base"
                  animate={{
                    color:
                      hoveredSection === categoryIndex
                        ? isDarkMode
                          ? "#fff"
                          : "#111827"
                        : isDarkMode
                        ? "#e5e7eb"
                        : "#374151",
                  }}
                >
                  <motion.span
                    className="text-base mobile:text-xl"
                    animate={{
                      rotate:
                        hoveredSection === categoryIndex ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {category.icon}
                  </motion.span>
                  {category.title}
                </motion.h4>

                <ul className="space-y-1 mobile:space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <motion.li key={link}>
                      <motion.a
                        href="#"
                        className="text-xs mobile:text-sm text-gray-600 dark:text-gray-400 
                                 hover:text-gray-900 dark:hover:text-white 
                                 transition-colors duration-200 block py-0.5 mobile:py-1
                                 relative overflow-hidden"
                        onHoverStart={() =>
                          setHoveredLink(`${categoryIndex}-${linkIndex}`)
                        }
                        onHoverEnd={() => setHoveredLink(null)}
                        whileHover={{ x: 5 }}
                      >
                        <AnimatePresence>
                          {hoveredLink === `${categoryIndex}-${linkIndex}` && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-transparent 
                                       dark:from-gray-800/50 rounded"
                              initial={{ x: "-100%" }}
                              animate={{ x: 0 }}
                              exit={{ x: "100%" }}
                              transition={{ type: "spring", stiffness: 300 }}
                            />
                          )}
                        </AnimatePresence>
                        <span className="relative z-10">{link}</span>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8 mobile:mt-10 tablet:mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4 mobile:gap-6">
              <div className="text-center tablet:text-left">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 mobile:mb-2 text-sm mobile:text-base">
                  Stay Updated
                </h4>
                <p className="text-xs mobile:text-sm text-gray-600 dark:text-gray-400">
                  Get notified about new tools and features
                </p>
              </div>

              <motion.form
                onSubmit={handleSubscribe}
                className="flex flex-col mini:flex-row gap-2 mobile:gap-3 flex-1 tablet:flex-initial tablet:min-w-[300px] laptop:min-w-[400px]"
              >
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 mobile:px-4 py-2 text-sm mobile:text-base rounded-lg 
                           border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500
                           transition-all duration-200"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  type="submit"
                  className="px-4 mobile:px-6 py-2 text-sm mobile:text-base bg-gray-900 dark:bg-gray-700 
                           text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 
                           transition-colors font-medium whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-6 mobile:mt-8 pt-6 mobile:pt-8 border-t border-gray-200 dark:border-gray-800 
                     flex flex-col mobile:flex-row justify-between items-center gap-3 mobile:gap-4"
          >
            <p className="text-xs mobile:text-sm text-gray-600 dark:text-gray-400 text-center mobile:text-left">
              © 2024 DevToolsB. Built with ❤️ for developers.
            </p>
            <div className="flex gap-4 mobile:gap-6 text-xs mobile:text-sm">
              <motion.button
                onClick={() => setIsPrivacyOpen(true)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 
                         dark:hover:text-white transition-colors duration-200
                         relative group bg-transparent border-none cursor-pointer"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
              >
                Privacy
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 
                           bg-gradient-to-r from-gray-900 to-gray-600 
                           dark:from-gray-300 dark:to-gray-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.button>

              <motion.button
                onClick={() => setIsTermsOpen(true)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 
                         dark:hover:text-white transition-colors duration-200
                         relative group bg-transparent border-none cursor-pointer"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Terms
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 
                           bg-gradient-to-r from-gray-900 to-gray-600 
                           dark:from-gray-300 dark:to-gray-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-10 mobile:-top-20 -right-10 mobile:-right-20 
                       w-20 mobile:w-40 h-20 mobile:h-40 rounded-full
                       bg-gradient-to-br from-gray-200/20 to-gray-300/20
                       dark:from-gray-700/20 dark:to-gray-600/20 blur-2xl mobile:blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-10 mobile:-bottom-20 -left-10 mobile:-left-20 
                       w-30 mobile:w-60 h-30 mobile:h-60 rounded-full
                       bg-gradient-to-br from-gray-300/20 to-gray-400/20
                       dark:from-gray-600/20 dark:to-gray-500/20 blur-2xl mobile:blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, 50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.footer>

      {/* Modals */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </>
  );
};

export default Footer;
