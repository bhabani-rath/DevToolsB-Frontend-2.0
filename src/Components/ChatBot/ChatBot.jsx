/**
 * DevToolsB AI Chatbot Component - Redesigned
 *
 * Fully responsive chatbot with modern UI
 * Mobile-first design with glassmorphism effects
 * Features: Quick actions, better animations, accessibility
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import geminiService from "../../Services/geminiService";
import { useChatbot } from "../../context/ChatbotContext";
// Quick action suggestions
const quickActions = [
  { icon: "🔧", text: "Browse Tools", query: "Show me all available tools" },
  { icon: "🚀", text: "Get Started", query: "How do I get started?" },
  {
    icon: "⭐",
    text: "Popular Tools",
    query: "What are the most popular tools?",
  },
  { icon: "❓", text: "Help", query: "I need help using the platform" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: "bot",
      text: "👋 Hi! I'm your DevToolsB Assistant. Ask me about our 142+ tools, how to use them, or anything about the platform!",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Chatbot metrics context (with fallback for when provider is not available)
  let chatbotContext = null;
  try {
    chatbotContext = useChatbot();
  } catch (e) {
    // Context not available, metrics tracking disabled
  }

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Send message handler
  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    setShowQuickActions(false);

    // Track API call timing
    const startTime = performance.now();

    try {
      const response = await geminiService.sendMessage(messageText, messages);

      // Calculate response time and record success
      const responseTime = Math.round(performance.now() - startTime);
      if (chatbotContext?.recordSuccess) {
        chatbotContext.recordSuccess(responseTime);
      }

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response,
        timestamp: new Date(),
        responseTime: responseTime,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);

      // Record error to context for admin dashboard
      if (chatbotContext?.recordError) {
        chatbotContext.recordError(err, messageText);
      }

      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: `❌ ${
          err.message || "Sorry, I encountered an error. Please try again."
        }`,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle quick action click
  const handleQuickAction = (query) => {
    handleSendMessage(query);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: "👋 Chat cleared! How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setShowQuickActions(true);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 
          w-14 h-14 sm:w-16 sm:h-16 rounded-full 
          bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
          shadow-lg shadow-purple-500/30 
          flex items-center justify-center 
          cursor-pointer group
          ${isOpen ? "hidden" : "flex"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-label="Open chat"
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-ping opacity-30" />

        {/* Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>

        {/* Notification badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold shadow-lg">
          1
        </span>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              ref={chatContainerRef}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-[100dvh] sm:h-[85vh] sm:max-h-[700px] sm:max-w-lg sm:rounded-2xl 
                bg-white dark:bg-gray-900 
                flex flex-col overflow-hidden 
                shadow-2xl shadow-black/20"
            >
              {/* Header */}
              <header className="flex-shrink-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-xl sm:text-2xl">🤖</span>
                      </div>
                      {/* Online indicator */}
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-purple-600" />
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className="text-white font-bold text-base sm:text-lg">
                        DevToolsB Assistant
                      </h2>
                      <p className="text-white/70 text-xs sm:text-sm">
                        Always here to help
                      </p>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-2">
                    {/* Clear chat button */}
                    <button
                      onClick={handleClearChat}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      aria-label="Clear chat"
                      title="Clear chat"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>

                    {/* Close button */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      aria-label="Close chat"
                    >
                      <svg
                        className="w-5 h-5 text-white"
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
                    </button>
                  </div>
                </div>
              </header>

              {/* Messages Container */}
              <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`relative max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl shadow-sm
                        ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md"
                            : message.isError
                            ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-bl-md"
                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md shadow-md"
                        }`}
                    >
                      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                      <span
                        className={`text-[10px] sm:text-xs mt-1 block ${
                          message.sender === "user"
                            ? "text-white/60"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-md">
                        <div className="flex items-center gap-1.5">
                          <motion.span
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: 0,
                            }}
                          />
                          <motion.span
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: 0.2,
                            }}
                          />
                          <motion.span
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: 0.4,
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quick Actions */}
                <AnimatePresence>
                  {showQuickActions && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="pt-4"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">
                        Quick Actions
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleQuickAction(action.query)}
                            className="flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-gray-800 
                              rounded-xl border border-gray-200 dark:border-gray-700
                              hover:border-purple-400 dark:hover:border-purple-500
                              hover:shadow-md transition-all text-left group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="text-lg">{action.icon}</span>
                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400">
                              {action.text}{" "}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </main>

              {/* Input Area */}
              <footer className="flex-shrink-0 p-3 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                {/* Input Container */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Attachment Button (Optional) */}
                  <button
                    className="hidden sm:flex p-2.5 text-gray-400 hover:text-purple-500 
                      hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    aria-label="Add attachment"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>

                  {/* Text Input */}
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isTyping}
                      className="w-full px-4 py-3 sm:py-3.5 pr-12
                        bg-gray-100 dark:bg-gray-700 
                        text-gray-800 dark:text-gray-200 
                        placeholder-gray-500 dark:placeholder-gray-400
                        rounded-full 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-600
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all text-sm sm:text-base"
                    />

                    {/* Emoji Button Inside Input */}
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 
                        p-1.5 text-gray-400 hover:text-purple-500 
                        rounded-full transition-colors"
                      aria-label="Add emoji"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Send Button */}
                  <motion.button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    className="p-3 sm:p-3.5 
                      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                      text-white rounded-full 
                      shadow-lg shadow-purple-500/30
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                      transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Send message"
                  >
                    {isTyping ? (
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    )}
                  </motion.button>
                </div>

                {/* Helper Text */}
                <p className="hidden sm:block text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px]">
                    Enter
                  </kbd>{" "}
                  to send •{" "}
                  <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px]">
                    ESC
                  </kbd>{" "}
                  to close
                </p>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style>{`
        /* Custom scrollbar for chat */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }

        /* Safe area padding for mobile devices with notches */
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          footer {
            padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
          }
        }

        /* Prevent text selection on double tap (mobile) */
        button {
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }

        /* Smooth momentum scrolling on iOS */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
