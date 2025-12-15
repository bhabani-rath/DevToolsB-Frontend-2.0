/**
 * UserTopbar Component - User Panel navigation bar
 * @author DevToolsB Team
 * @version 1.0.0
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
  RiHeartFill,
  RiToolsFill,
  RiStarFill,
  RiCloseLine,
} from "react-icons/ri";
import { useDarkMode } from "../../Context/ThemeContext";

const notificationsData = [
  {
    id: 1,
    type: "favorite",
    title: "Tool updated",
    message: "Scientific Calculator has new features",
    time: "5 min ago",
    read: false,
    icon: RiToolsFill,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    type: "recommendation",
    title: "New tool for you",
    message: "Try our new Color Picker Pro",
    time: "1 hour ago",
    read: false,
    icon: RiHeartFill,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    id: 3,
    type: "system",
    title: "Welcome bonus",
    message: "You've earned 100 points!",
    time: "2 hours ago",
    read: true,
    icon: RiStarFill,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const userProfile = {
  name: "John Doe",
  email: "john@devtoolsb.com",
  avatar:
    "https://ui-avatars.com/api/?name=John+Doe&background=374151&color=fff&size=128",
  role: "Premium User",
};

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};
const themeIconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 10 },
  },
  exit: { scale: 0, rotate: 180, transition: { duration: 0.2 } },
};

const NotificationItem = ({ notification, onClose }) => {
  const Icon = notification.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      className={`flex items-start gap-3 p-3 cursor-pointer ${
        !notification.read ? "bg-gray-50 dark:bg-gray-800/50" : ""
      }`}
      onClick={onClose}
    >
      <div className={`p-2 rounded-lg ${notification.bgColor} flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${notification.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {notification.title}
          </p>
          {!notification.read && (
            <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full flex-shrink-0 mt-1.5" />
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

const UserTopbar = ({ activeSection = "Dashboard" }) => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const unreadCount = notificationsData.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target))
        setIsSearchOpen(false);
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      )
        setIsNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target))
        setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
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
      <div className="w-full h-16 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 pl-20 tablet:pl-4 tablet:px-6 sticky top-0 z-20">
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
        <div className="flex items-center gap-2 tablet:gap-3">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="tablet:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RiSearchLine className="w-5 h-5" />
            </motion.button>
            <div className="hidden tablet:flex items-center relative">
              <RiSearchLine className="absolute left-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className="w-48 laptop:w-64 pl-10 pr-16 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:w-72 transition-all"
              />
              <div className="absolute right-3 flex items-center gap-1 text-xs text-gray-400">
                <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px] font-medium">
                  ⌘K
                </span>
              </div>
            </div>
          </div>
          {/* Notifications */}
          <div ref={notificationsRef} className="relative">
            <motion.button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isNotificationsOpen ? (
                <RiNotification3Fill className="w-5 h-5" />
              ) : (
                <RiNotification3Line className="w-5 h-5" />
              )}
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                      <p className="text-xs text-gray-500">
                        {unreadCount} unread
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Mark all read
                    </motion.button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800/50">
                    {notificationsData.map((n) => (
                      <NotificationItem
                        key={n.id}
                        notification={n}
                        onClose={() => setIsNotificationsOpen(false)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Theme Toggle */}
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
          {/* Profile */}
          <div ref={profileRef} className="relative">
            <motion.button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.02 }}
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
                className={`w-4 h-4 text-gray-400 hidden laptop:block ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
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
                        <p className="text-xs text-gray-500">
                          {userProfile.email}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-medium rounded-full">
                          {userProfile.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
                    >
                      <RiUserLine className="w-4 h-4" />
                      <span>View Profile</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
                    >
                      <RiSettings4Line className="w-4 h-4" />
                      <span>Settings</span>
                    </motion.button>
                  </div>
                  <div className="p-2 border-t border-gray-100 dark:border-gray-800">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
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

      {/* Mobile Search */}
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
              className="absolute top-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-lg"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <RiCloseLine className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserTopbar;
