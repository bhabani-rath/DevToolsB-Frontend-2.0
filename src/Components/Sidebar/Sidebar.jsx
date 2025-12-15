/**
 * Sidebar Component
 *
 * @description Responsive navigation sidebar for the admin dashboard.
 * Features a collapsible design with smooth animations, mobile overlay,
 * and user profile management capabilities.
 *
 * @component
 * @features
 * - Collapsible sidebar (240px expanded, 72px collapsed) on desktop
 * - Mobile overlay menu with backdrop
 * - Animated menu items with Framer Motion
 * - User profile modal with update/logout actions
 * - Active route indicator with smooth transitions
 * - Theme-aware styling (light/dark mode)
 * - Hover tooltips in collapsed state
 *
 * @props
 * @param {boolean} isOpenProp - Optional controlled state for sidebar expansion
 * @param {function} setIsOpenProp - Optional callback to control sidebar expansion
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  RiDashboardFill,
  RiGroupFill,
  RiCodeSSlashFill,
  RiToolsFill,
  RiStarFill,
  RiMenuFill,
  RiCloseFill,
  RiLogoutBoxRFill,
  RiEditBoxFill,
  RiUserFill,
} from "react-icons/ri";

const Sidebar = ({
  isOpen: isOpenProp,
  setIsOpen: setIsOpenProp,
  activeSection: activeSectionProp,
  onActiveChange,
}) => {
  /**
   * Component State Management
   */

  // Controlled/uncontrolled component pattern
  // Accept props for parent control, fallback to local state for standalone usage
  const [localIsOpen, setLocalIsOpen] = useState(true);
  const isOpen = isOpenProp !== undefined ? isOpenProp : localIsOpen;
  const setIsOpen = setIsOpenProp || setLocalIsOpen;

  // Active menu item tracking - controlled or uncontrolled
  const [localActiveItem, setLocalActiveItem] = useState("Dashboard");
  const activeItem =
    activeSectionProp !== undefined ? activeSectionProp : localActiveItem;

  // Mobile menu overlay state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // User profile modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  /**
   * Navigation Menu Configuration
   * Array of menu items with their icons and routes
   */
  const menuItems = [
    { id: "Dashboard", icon: RiDashboardFill, label: "Dashboard" },
    { id: "Users", icon: RiGroupFill, label: "Users" },
    { id: "Developers", icon: RiCodeSSlashFill, label: "Developers" },
    { id: "Tools", icon: RiToolsFill, label: "Tools" },
    { id: "Ratings", icon: RiStarFill, label: "Ratings" },
  ];

  // User profile data (can be replaced with actual user data from context/props)
  const userProfile = {
    name: "Admin User",
    email: "admin@devtoolsb.com",
    avatar:
      "https://ui-avatars.com/api/?name=Admin+User&background=6b7280&color=fff&size=128",
  };

  /**
   * Animation Variants Configuration
   * These variants control all motion animations throughout the sidebar
   */

  // Desktop sidebar expand/collapse animation
  const sidebarVariants = {
    expanded: {
      width: 240,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 30,
      },
    },
    collapsed: {
      width: 72,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 30,
      },
    },
  };

  // Mobile sidebar slide-in/out animation
  const mobileVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 35,
      },
    },
    closed: {
      x: -280, // Slide out to the left
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 35,
      },
    },
  };

  // Backdrop fade animation for mobile overlay
  const backdropVariants = {
    open: {
      opacity: 1,
      pointerEvents: "auto",
      transition: { duration: 0.2, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      pointerEvents: "none", // Disable clicks when not visible
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  // Profile modal scale and fade animation
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  // Menu item staggered entrance animation
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.04, // Stagger delay based on item index
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    }),
  };

  // Text fade-in animation for expanded sidebar state
  const textVariants = {
    collapsed: {
      opacity: 0,
      width: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    expanded: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.25,
        ease: "easeOut",
        delay: 0.08, // Slight delay for smoother appearance
      },
    },
  };

  /**
   * Event Handler Functions
   */

  /**
   * Handle menu item click
   * Sets the active menu item and auto-closes mobile menu
   * Notifies parent component if onActiveChange callback is provided
   * @param {string} itemId - The ID of the clicked menu item
   */
  const handleItemClick = (itemId) => {
    // Update local state for uncontrolled mode
    setLocalActiveItem(itemId);
    // Notify parent for controlled mode
    if (onActiveChange) {
      onActiveChange(itemId);
    }
    // Auto-close mobile menu after selection for better UX
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  /**
   * Open user profile modal
   */
  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  /**
   * Handle profile update action
   * TODO: Implement actual profile update logic with API call
   */
  const handleUpdateProfile = () => {
    // Handle update profile logic here
    console.log("Update profile clicked");
    setIsProfileModalOpen(false);
  };

  /**
   * Handle user logout
   * TODO: Implement actual logout logic (clear session, redirect, etc.)
   */
  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
    setIsProfileModalOpen(false);
  };

  return (
    <>
      {/* ==================== MOBILE COMPONENTS ==================== */}

      {/* Mobile Toggle Button - Hamburger menu for small screens */}
      <motion.button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="tablet:hidden fixed top-1 left-5 z-50 p-3 rounded-xl bg-white dark:bg-black text-gray-700 dark:text-gray-300 shadow-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isMobileMenuOpen ? (
            <RiCloseFill className="w-6 h-6" />
          ) : (
            <RiMenuFill className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>

      {/* Mobile Menu Backdrop - Dark overlay when mobile menu is open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="tablet:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ==================== USER PROFILE MODAL ==================== */}

      {/* Profile Modal - Popup for user profile actions (update/logout) */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <>
            {/* Modal Backdrop - Dark overlay behind the modal */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsProfileModalOpen(false)}
            />

            {/* Modal Content */}
            <div
              className="fixed inset-0 flex items-center justify-center z-[70] p-4"
              onClick={() => setIsProfileModalOpen(false)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                        <RiUserFill className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 bg-clip-text text-transparent">
                        Profile
                      </h2>
                    </div>
                    <motion.button
                      onClick={() => setIsProfileModalOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <RiCloseFill className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Profile Info */}
                  <div className="flex flex-col items-center mb-6">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={userProfile.avatar}
                        alt={userProfile.name}
                        className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-lg"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-600/20 dark:from-gray-500/20 dark:to-gray-300/20 blur-xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                      {userProfile.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userProfile.email}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {/* Update Profile Button */}
                    <motion.button
                      onClick={handleUpdateProfile}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 text-white dark:text-gray-900 font-medium shadow-lg hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RiEditBoxFill className="w-5 h-5" />
                      <span>Update Profile</span>
                    </motion.button>

                    {/* Logout Button */}
                    <motion.button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RiLogoutBoxRFill className="w-5 h-5" />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ==================== DESKTOP SIDEBAR ==================== */}

      {/* Desktop Sidebar - Collapsible sidebar visible on tablet+ screens */}
      <motion.section
        variants={sidebarVariants}
        initial="expanded"
        animate={isOpen ? "expanded" : "collapsed"}
        className="hidden tablet:flex flex-col h-screen fixed left-0 top-0 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-lg z-30"
      >
        {/* Sidebar Header - Logo and collapse toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden min-w-0">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-lg blur-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.1, opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
                <img
                  src="https://res.cloudinary.com/dva4r5mad/image/upload/v1751438420/B_Logo_dor9oj.png"
                  alt="Logo"
                  className="w-16 h-16 rounded-lg relative z-10 object-cover"
                />
              </motion.div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={textVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="overflow-hidden -ml-6"
                  >
                    <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent whitespace-nowrap">
                      Dev<span className="text-gray-500">ToolsB</span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.button
                  key="toggle-open"
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <RiMenuFill className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full mt-3 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <RiMenuFill className="w-5 h-5 mx-auto" />
            </motion.button>
          )}
        </div>

        {/* Navigation Menu Items - Main menu with icons and labels */}
        <nav className={`flex-1 overflow-y-auto ${isOpen ? "p-3" : "p-2"}`}>
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative group"
                >
                  <motion.button
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center rounded-lg transition-all duration-200
                      ${
                        isOpen
                          ? "gap-3 px-3 py-2.5"
                          : "justify-center py-3 px-2"
                      }
                      ${
                        isActive
                          ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50"
                      }
                    `}
                    whileHover={{ scale: 1.02, x: isOpen ? 2 : 0 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Active indicator with gradient */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.2,
                        }}
                      />
                    )}

                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        isActive
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    />

                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          variants={textVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className={`text-sm font-medium whitespace-nowrap overflow-hidden ${
                            isActive
                              ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 bg-clip-text text-transparent"
                              : ""
                          }`}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <motion.div
                        className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-gray-700 dark:border-gray-600 z-50"
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-l border-t border-gray-700 dark:border-gray-600 rotate-45"></div>
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Theme Toggle & Profile Section */}
        <div className="border-t border-gray-200 dark:border-gray-800">
          {/* Profile Section */}
          <motion.div
            className={`p-3 ${isOpen ? "" : "flex flex-col items-center"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={handleProfileClick}
              className={`w-full flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200 group relative ${
                isOpen ? "gap-3 p-2" : "flex-col gap-2 py-3"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.img
                src={userProfile.avatar}
                alt={userProfile.name}
                className={`rounded-full ${
                  isOpen ? "w-10 h-10" : "w-9 h-9"
                } border-2 border-gray-300 dark:border-gray-700`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={textVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="flex-1 text-left overflow-hidden"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {userProfile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {userProfile.email}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-gray-700 dark:border-gray-600 z-50 top-1/2 -translate-y-1/2">
                  <p className="font-medium">{userProfile.name}</p>
                  <p className="text-xs text-gray-400">{userProfile.email}</p>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-l border-t border-gray-700 dark:border-gray-600 rotate-45"></div>
                </div>
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== MOBILE SIDEBAR ==================== */}

      {/* Mobile Sidebar - Slide-in overlay menu for mobile devices */}
      <motion.section
        variants={mobileVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        className="tablet:hidden fixed left-0 top-0 h-screen w-[280px] bg-white dark:bg-black shadow-2xl z-50 border-r border-gray-200 dark:border-gray-800 flex flex-col"
      >
        {/* Mobile Sidebar Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <motion.div className="relative" whileHover={{ scale: 1.05 }}>
              <motion.div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-gray-600/20 dark:from-gray-500/20 dark:to-gray-300/20 rounded-lg blur-md" />
              <img
                src="https://res.cloudinary.com/dva4r5mad/image/upload/v1751438420/B_Logo_dor9oj.png"
                alt="Logo"
                className="w-10 h-10 rounded-lg relative z-10 object-cover scale-110"
              />
            </motion.div>
            <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Dev<span className="text-gray-500">ToolsB</span>
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isMobileMenuOpen ? "visible" : "hidden"}
                  className="relative"
                >
                  <motion.button
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50"
                      }
                    `}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.2,
                        }}
                      />
                    )}
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-gray-900 dark:text-white" : ""
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-gray-300 dark:via-gray-400 dark:to-gray-500 bg-clip-text text-transparent"
                          : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Mobile Theme & Profile */}
        <div className="border-t border-gray-200 dark:border-gray-800">
          {/* Profile Section */}
          <div className="p-3">
            <motion.button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700"
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {userProfile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {userProfile.email}
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Sidebar;
