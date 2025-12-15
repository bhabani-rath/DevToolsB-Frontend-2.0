/**
 * Theme Context - Global Dark/Light Mode Management
 *
 * @description Provides theme state management across the entire application.
 * Persists theme preference in localStorage and applies it to the document root.
 *
 * @module ThemeContext
 * @features
 * - Global dark/light mode state
 * - LocalStorage persistence
 * - Automatic DOM class manipulation for Tailwind CSS dark mode
 * - Custom hook for easy theme access
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import { createContext, useContext, useEffect, useState } from "react";

// Create context with default value
const ThemeContext = createContext("light");

/**
 * ThemeProvider Component
 * Wraps the application to provide theme state to all children
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Theme provider wrapper
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage, default to light mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /**
   * Effect: Sync theme with DOM and localStorage
   * Adds/removes 'dark' class on document root for Tailwind CSS
   * Persists preference to localStorage
   */
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom Hook: useDarkMode
 * Provides access to theme state and setter
 *
 * @returns {Object} Theme state object
 * @returns {boolean} isDarkMode - Current theme mode
 * @returns {Function} setIsDarkMode - Function to toggle theme
 *
 * @example
 * const { isDarkMode, setIsDarkMode } = useDarkMode();
 * setIsDarkMode(!isDarkMode);
 */
export const useDarkMode = () => useContext(ThemeContext);
