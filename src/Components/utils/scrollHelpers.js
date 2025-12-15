/**
 * Scroll Helper Utilities
 *
 * @description Utility functions for smooth scrolling behavior.
 * Provides consistent smooth scroll animations across the application.
 *
 * @module scrollHelpers
 * @author DevToolsB Team
 * @version 1.0.0
 */

/**
 * Scroll to a specific section by ID
 * Accounts for fixed header offset (80px)
 *
 * @param {string} sectionId - The ID of the target section (without #)
 *
 * @example
 * scrollToSection('about');
 */
export const scrollToSection = (sectionId) => {
  const element = document.querySelector(`#${sectionId}`);
  if (element) {
    const offset = 80; // Fixed header height
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

/**
 * Scroll to the top of the page
 * Uses smooth scroll animation
 *
 * @example
 * scrollToTop();
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
