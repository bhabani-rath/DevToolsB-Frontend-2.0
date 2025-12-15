// PrivacyModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../../Context/ThemeContext";

const PrivacyModal = ({ isOpen, onClose }) => {
  const { isDarkMode } = useDarkMode();

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentSections = [
    {
      title: "1. Information We Collect",
      content: [
        "Personal information you provide when creating an account (email, username)",
        "Usage data including tool preferences and frequency of use",
        "Technical information like IP address, browser type, and device information",
        "Cookies and similar tracking technologies for improving user experience",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "To provide and maintain our services",
        "To personalize your experience and recommend relevant tools",
        "To communicate updates, new features, and important notices",
        "To analyze usage patterns and improve our platform",
        "To ensure security and prevent fraudulent activities",
      ],
    },
    {
      title: "3. Data Security",
      content: [
        "We implement industry-standard encryption for data transmission",
        "Regular security audits and vulnerability assessments",
        "Limited access to personal data on a need-to-know basis",
        "Secure data storage with regular backups",
      ],
    },
    {
      title: "4. Third-Party Services",
      content: [
        "We use analytics services to understand usage patterns",
        "Payment processing is handled by secure third-party providers",
        "We do not sell or rent your personal information to third parties",
        "Third-party integrations are clearly disclosed when used",
      ],
    },
    {
      title: "5. Your Rights",
      content: [
        "Access and download your personal data",
        "Request correction of inaccurate information",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Control cookie preferences through browser settings",
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-black 
                       rounded-2xl shadow-2xl overflow-hidden"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="sticky top-0 bg-white dark:bg-black border-b 
                            border-gray-200 dark:border-gray-800 p-6 z-10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Privacy Policy
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Last updated: January 2024
                    </p>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                             transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <motion.div
                  className="prose prose-gray dark:prose-invert max-w-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    At DevToolsB, we take your privacy seriously. This Privacy
                    Policy explains how we collect, use, and protect your
                    information when you use our developer tools platform.
                  </p>

                  {contentSections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      className="mb-8"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {section.title}
                      </h3>
                      <ul className="space-y-2">
                        {section.content.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: index * 0.1 + itemIndex * 0.05,
                            }}
                          >
                            <span className="text-gray-400 dark:text-gray-600 mt-1">
                              •
                            </span>
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}

                  <motion.div
                    className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Contact Us
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      If you have any questions about this Privacy Policy,
                      please contact us at{" "}
                      <a
                        href="mailto:privacy@devtoolsb.com"
                        className="text-gray-900 dark:text-white hover:underline"
                      >
                        privacy@devtoolsb.com
                      </a>
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;
