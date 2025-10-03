// TermsModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../../Context/ThemeContext";

const TermsModal = ({ isOpen, onClose }) => {
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
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using DevToolsB, you agree to these Terms of Service",
        "If you disagree with any part, you may not access our services",
        "We reserve the right to update these terms at any time",
        "Continued use after changes constitutes acceptance of new terms",
      ],
    },
    {
      title: "2. Use of Services",
      content: [
        "You must be at least 13 years old to use our services",
        "You are responsible for maintaining account security",
        "Prohibited: illegal activities, spam, abuse, or harmful content",
        "We may terminate accounts violating these terms",
        "Free tools are provided as-is without warranties",
      ],
    },
    {
      title: "3. Intellectual Property",
      content: [
        "DevToolsB retains all rights to our platform and tools",
        "You retain ownership of content you create using our tools",
        "You grant us license to display user-generated content",
        "Open-source components are subject to their respective licenses",
      ],
    },
    {
      title: "4. Limitations and Liability",
      content: [
        "Services provided 'as is' without warranties of any kind",
        "We are not liable for indirect, incidental, or consequential damages",
        "Maximum liability limited to amount paid (if any) in past 12 months",
        "You indemnify us from claims arising from your use",
      ],
    },
    {
      title: "5. Premium Services",
      content: [
        "Premium features require active subscription",
        "Subscriptions auto-renew unless cancelled",
        "Refunds available within 30 days of purchase",
        "Prices subject to change with 30 days notice",
        "Fair use policy applies to all premium features",
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
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 
                       rounded-2xl shadow-2xl overflow-hidden"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="sticky top-0 bg-white dark:bg-gray-900 border-b 
                            border-gray-200 dark:border-gray-800 p-6 z-10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Terms of Service
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Effective Date: January 2024
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
                    Welcome to DevToolsB! These Terms of Service govern your use
                    of our platform and tools. By using our services, you agree
                    to be bound by these terms.
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
                      Questions?
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      For questions about these Terms of Service, please contact
                      us at{" "}
                      <a
                        href="mailto:legal@devtoolsb.com"
                        className="text-gray-900 dark:text-white hover:underline"
                      >
                        legal@devtoolsb.com
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

export default TermsModal;
