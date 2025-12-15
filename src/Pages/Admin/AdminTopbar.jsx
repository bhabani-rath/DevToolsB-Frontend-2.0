/**
 * AdminTopbar Component
 *
 * @description Premium navigation bar for the admin dashboard.
 * Features global search, notifications, user profile dropdown, and theme switching.
 *
 * @component
 * @features
 * - Global search with keyboard shortcut hint (Ctrl/Cmd + K)
 * - Notifications dropdown with badge count
 * - User profile dropdown with quick actions
 * - Dark/Light theme toggle with animated transitions
 * - Responsive design with mobile optimization
 * - Sticky positioning for persistent visibility
 * - Framer Motion animations throughout
 *
 * @author DevToolsB Team
 * @version 2.0.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMoonFill,
  RiSunFill,
  RiSearchLine,
  RiNotification3Line,
  RiNotification3Fill,
  RiArrowDownSLine,
  RiUserLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiCheckboxCircleFill,
  RiToolsFill,
  RiStarFill,
  RiUserAddLine,
  RiCloseLine,
  RiCommandLine,
} from "react-icons/ri";
import { useDarkMode } from "../../Context/ThemeContext";

// ============================================================================
// MOCK DATA - Demo notifications data
// ============================================================================

/**
 * Sample notifications for the dropdown
 */
const notificationsData = [
  {
    id: 1,
    type: "user",
    title: "New user registered",
    message: "Sarah Johnson just joined the platform",
    time: "2 min ago",
    read: false,
    icon: RiUserAddLine,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    type: "tool",
    title: "Tool published",
    message: "JSON Formatter Pro is now live",
    time: "15 min ago",
    read: false,
    icon: RiToolsFill,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: 3,
    type: "review",
    title: "New 5-star review",
    message: "Code Beautifier received a new review",
    time: "1 hour ago",
    read: true,
    icon: RiStarFill,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 4,
    type: "system",
    title: "System update",
    message: "Platform maintenance completed",
    time: "3 hours ago",
    read: true,
    icon: RiCheckboxCircleFill,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

/**
 * User profile data
 */
const userProfile = {
  name: "Admin User",
  email: "admin@devtoolsb.com",
  avatar:
    "https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff&size=128",
  role: "Super Admin",
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/**
 * Dropdown animation variants
 */
const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.15 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

/**
 * Theme icon animation variants
 */
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

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * NotificationItem Component - Individual notification in dropdown
 * @param {Object} notification - Notification data object
 * @param {Function} onClose - Callback to close dropdown
 */
const NotificationItem = ({ notification, onClose }) => {
  const Icon = notification.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      className={`flex items-start gap-3 p-3 cursor-pointer transition-colors ${
        !notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
      }`}
      onClick={onClose}
    >
      {/* Notification icon */}
      <div className={`p-2 rounded-lg ${notification.bgColor} flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${notification.color}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {notification.title}
          </p>
          {!notification.read && (
            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
          {notification.message}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {notification.time}
        </p>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AdminTopbar = ({ activeSection = "Dashboard" }) => {
  // Theme context
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  // Dropdown states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Refs for click outside detection
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Calculate unread notifications count
  const unreadCount = notificationsData.filter((n) => !n.read).length;

  /**
   * Toggle dark mode theme
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  /**
   * Handle click outside to close dropdowns
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handle keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl/Cmd + K opens search
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      // Escape closes all dropdowns
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* ================================================================== */}
      {/* MAIN TOPBAR */}
      {/* ================================================================== */}
      <div className="w-full h-16 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 pl-20 tablet:pl-4 tablet:px-6 sticky top-0 z-20">
        {/* Left side - Dashboard Title & Breadcrumb */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-black dark:text-white text-xl tablet:text-lg font-bold tracking-wide">
              {activeSection}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden tablet:block">
              Welcome back, {userProfile.name.split(" ")[0]}
            </p>
          </div>
        </div>

        {/* Right side - Search, Notifications, Theme, Profile */}
        <div className="flex items-center gap-2 tablet:gap-3">
          {/* ============================================================ */}
          {/* SEARCH BAR */}
          {/* ============================================================ */}
          <div ref={searchRef} className="relative">
            {/* Search trigger button - visible on mobile */}
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="tablet:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RiSearchLine className="w-5 h-5" />
            </motion.button>

            {/* Desktop search bar */}
            <div className="hidden tablet:flex items-center relative">
              <RiSearchLine className="absolute left-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="w-48 laptop:w-64 pl-10 pr-16 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:w-72 transition-all"
              />
              {/* Keyboard shortcut hint */}
              <div className="absolute right-3 flex items-center gap-1 text-xs text-gray-400">
                <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px] font-medium">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* NOTIFICATIONS DROPDOWN */}
          {/* ============================================================ */}
          <div ref={notificationsRef} className="relative">
            <motion.button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isNotificationsOpen ? (
                <RiNotification3Fill className="w-5 h-5" />
              ) : (
                <RiNotification3Line className="w-5 h-5" />
              )}
              {/* Unread badge */}
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Notifications dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  {/* Header */}
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {unreadCount} unread
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Mark all read
                    </motion.button>
                  </div>

                  {/* Notifications list */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800/50">
                    {notificationsData.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClose={() => setIsNotificationsOpen(false)}
                      />
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="p-3 border-t border-gray-100 dark:border-gray-800">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setIsNotificationsOpen(false)}
                      className="w-full py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      View all notifications
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ============================================================ */}
          {/* THEME TOGGLE */}
          {/* ============================================================ */}
          <motion.button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDarkMode ? (
                <motion.div
                  key="sun"
                  variants={themeIconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <RiSunFill className="w-5 h-5 text-amber-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  variants={themeIconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <RiMoonFill className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* ============================================================ */}
          {/* PROFILE DROPDOWN */}
          {/* ============================================================ */}
          <div ref={profileRef} className="relative">
            <motion.button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-8 h-8 rounded-lg"
              />
              <div className="hidden laptop:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {userProfile.name.split(" ")[0]}
                </p>
              </div>
              <RiArrowDownSLine
                className={`w-4 h-4 text-gray-400 hidden laptop:block transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            {/* Profile dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  {/* User info */}
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <img
                        src={userProfile.avatar}
                        alt={userProfile.name}
                        className="w-12 h-12 rounded-xl"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {userProfile.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {userProfile.email}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-medium rounded-full">
                          {userProfile.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-2">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <RiUserLine className="w-4 h-4" />
                      <span>View Profile</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <RiSettings4Line className="w-4 h-4" />
                      <span>Settings</span>
                    </motion.button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-gray-100 dark:border-gray-800">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <RiLogoutBoxRLine className="w-4 h-4" />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MOBILE SEARCH OVERLAY */}
      {/* ================================================================== */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="tablet:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="relative">
                <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-lg"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
                >
                  <RiCloseLine className="w-5 h-5" />
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Quick Actions
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <RiUserLine className="w-4 h-4" />
                    <span>View Users</span>
                  </button>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <RiToolsFill className="w-4 h-4" />
                    <span>Manage Tools</span>
                  </button>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <RiSettings4Line className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminTopbar;
