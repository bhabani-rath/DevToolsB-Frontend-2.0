/**
 * useScrollSpy Hook
 *
 * @description Custom React hook that tracks which section is currently visible in the viewport.
 * Updates active section based on scroll position for navigation highlighting.
 *
 * @hook
 * @features
 * - Automatic section detection based on scroll position
 * - Smooth scroll-sync navigation highlighting
 * - Optimized performance with useCallback
 * - Works with predefined sections: home, about, features, team, tools, contact
 *
 * @returns {string} activeSection - ID of the currently visible section
 *
 * @author DevToolsB Team
 * @version 1.0.0
 *
 * @example
 * const activeSection = useScrollSpy();
 * // Use: className={activeSection === 'home' ? 'active' : ''}
 */

import { useState, useEffect, useCallback } from "react";

const useScrollSpy = () => {
  // Track currently active section (defaults to 'home')
  const [activeSection, setActiveSection] = useState("home");

  /**
   * Scroll event handler
   * Detects which section is currently in viewport
   * Adds 100px offset to account for fixed headers
   */
  const handleScroll = useCallback(() => {
    // Predefined sections to track
    const sections = ["home", "about", "features", "team", "tools", "contact"];
    const scrollPosition = window.scrollY + 100; // Offset for fixed header

    // Check each section to find which one is currently visible
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break; // Stop checking once we find the active section
        }
      }
    }
  }, []);

  /**
   * Effect: Setup and cleanup scroll listener
   */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return activeSection;
};

export default useScrollSpy;
