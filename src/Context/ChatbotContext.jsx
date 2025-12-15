/**
 * ChatbotContext - Global state for chatbot API monitoring
 *
 * @description Tracks chatbot API response times and errors for admin dashboard.
 * Provides real-time metrics for Platform Health section.
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { createContext, useContext, useState, useCallback } from "react";

// Context
const ChatbotContext = createContext(null);

// Provider component
export const ChatbotProvider = ({ children }) => {
  // API Metrics state
  const [metrics, setMetrics] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    lastResponseTime: null,
    responseTimes: [], // Last 20 response times for averaging
  });

  // Errors state - stores last 50 errors
  const [errors, setErrors] = useState([]);

  // API status
  const [apiStatus, setApiStatus] = useState({
    isOnline: true,
    lastChecked: new Date(),
    lastSuccessfulCall: null,
  });

  /**
   * Record a successful API call
   * @param {number} responseTime - Response time in milliseconds
   */
  const recordSuccess = useCallback((responseTime) => {
    setMetrics((prev) => {
      const newResponseTimes = [...prev.responseTimes, responseTime].slice(-20);
      const avgTime =
        newResponseTimes.reduce((a, b) => a + b, 0) / newResponseTimes.length;

      return {
        totalRequests: prev.totalRequests + 1,
        successfulRequests: prev.successfulRequests + 1,
        failedRequests: prev.failedRequests,
        averageResponseTime: Math.round(avgTime),
        lastResponseTime: responseTime,
        responseTimes: newResponseTimes,
      };
    });

    setApiStatus((prev) => ({
      ...prev,
      isOnline: true,
      lastChecked: new Date(),
      lastSuccessfulCall: new Date(),
    }));
  }, []);

  /**
   * Record a failed API call
   * @param {Error} error - The error object
   * @param {string} userMessage - The user's message that caused the error
   */
  const recordError = useCallback((error, userMessage = "") => {
    setMetrics((prev) => ({
      ...prev,
      totalRequests: prev.totalRequests + 1,
      failedRequests: prev.failedRequests + 1,
    }));

    const errorEntry = {
      id: Date.now(),
      message: error.message || "Unknown error",
      timestamp: new Date(),
      userMessage: userMessage.substring(0, 100), // Truncate for storage
      type: categorizeError(error),
    };

    setErrors((prev) => [errorEntry, ...prev].slice(0, 50)); // Keep last 50 errors

    // Check if API should be marked offline
    // This includes: network errors, auth errors (401), rate limits (429), user not found
    const errorMsg = error.message?.toLowerCase() || "";
    const isOfflineError =
      errorMsg.includes("network") ||
      errorMsg.includes("failed to fetch") ||
      errorMsg.includes("401") ||
      errorMsg.includes("api key") ||
      errorMsg.includes("user not found") ||
      errorMsg.includes("unauthorized") ||
      errorMsg.includes("429") ||
      errorMsg.includes("quota");

    if (isOfflineError) {
      setApiStatus((prev) => ({
        ...prev,
        isOnline: false,
        lastChecked: new Date(),
      }));
    }
  }, []);

  /**
   * Categorize error type for display
   * @param {Error} error - The error object
   * @returns {string} - Error category
   */
  const categorizeError = (error) => {
    const msg = error.message?.toLowerCase() || "";
    if (msg.includes("api key") || msg.includes("401")) return "auth";
    if (msg.includes("quota") || msg.includes("429")) return "rate_limit";
    if (msg.includes("network") || msg.includes("fetch")) return "network";
    if (msg.includes("timeout")) return "timeout";
    return "unknown";
  };

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  /**
   * Clear a specific error
   * @param {number} errorId - The error ID to clear
   */
  const clearError = useCallback((errorId) => {
    setErrors((prev) => prev.filter((e) => e.id !== errorId));
  }, []);

  /**
   * Get error rate percentage
   * @returns {number} - Error rate as percentage
   */
  const getErrorRate = useCallback(() => {
    if (metrics.totalRequests === 0) return 0;
    return ((metrics.failedRequests / metrics.totalRequests) * 100).toFixed(2);
  }, [metrics.totalRequests, metrics.failedRequests]);

  /**
   * Get success rate percentage
   * @returns {number} - Success rate as percentage
   */
  const getSuccessRate = useCallback(() => {
    if (metrics.totalRequests === 0) return 100;
    return ((metrics.successfulRequests / metrics.totalRequests) * 100).toFixed(
      1
    );
  }, [metrics.totalRequests, metrics.successfulRequests]);

  const value = {
    metrics,
    errors,
    apiStatus,
    recordSuccess,
    recordError,
    clearErrors,
    clearError,
    getErrorRate,
    getSuccessRate,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};

// Custom hook to use the context
export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

// Export default for convenience
export default ChatbotContext;
