/**
 * DeveloperSidebar Component - Consistent with Admin panel styling
 * @author DevToolsB Team
 * @version 2.0.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiDashboardFill,
  RiToolsFill,
  RiLineChartFill,
  RiUserFill,
  RiMenuFill,
  RiCloseFill,
  RiLogoutBoxRFill,
  RiEditBoxFill,
} from "react-icons/ri";

const DeveloperSidebar = ({
  isOpen: isOpenProp,
  setIsOpen: setIsOpenProp,
  activeSection: activeSectionProp,
  onActiveChange,
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(true);
  const isOpen = isOpenProp !== undefined ? isOpenProp : localIsOpen;
  const setIsOpen = setIsOpenProp || setLocalIsOpen;

  const [localActiveItem, setLocalActiveItem] = useState("Dashboard");
  const activeItem =
    activeSectionProp !== undefined ? activeSectionProp : localActiveItem;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const menuItems = [
    { id: "Dashboard", icon: RiDashboardFill, label: "Dashboard" },
    { id: "My Tools", icon: RiToolsFill, label: "My Tools" },
    { id: "Analytics", icon: RiLineChartFill, label: "Analytics" },
    { id: "Profile", icon: RiUserFill, label: "Profile" },
  ];

  const userProfile = {
    name: "Bhabani Shankar",
    email: "developer@devtoolsb.com",
    avatar:
      "https://ui-avatars.com/api/?name=Bhabani+Shankar&background=374151&color=fff&size=128",
  };

  const sidebarVariants = {
    expanded: {
      width: 240,
      transition: { type: "spring", stiffness: 350, damping: 30 },
    },
    collapsed: {
      width: 72,
      transition: { type: "spring", stiffness: 350, damping: 30 },
    },
  };
  const mobileVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 350, damping: 35 } },
    closed: {
      x: -280,
      transition: { type: "spring", stiffness: 350, damping: 35 },
    },
  };
  const backdropVariants = {
    open: { opacity: 1, pointerEvents: "auto", transition: { duration: 0.2 } },
    closed: {
      opacity: 0,
      pointerEvents: "none",
      transition: { duration: 0.2 },
    },
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.04,
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    }),
  };
  const textVariants = {
    collapsed: { opacity: 0, width: 0, transition: { duration: 0.2 } },
    expanded: {
      opacity: 1,
      width: "auto",
      transition: { duration: 0.25, delay: 0.08 },
    },
  };

  const handleItemClick = (itemId) => {
    setLocalActiveItem(itemId);
    if (onActiveChange) onActiveChange(itemId);
    if (window.innerWidth < 768) setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <motion.button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="tablet:hidden fixed top-1 left-5 z-50 p-3 rounded-xl bg-white dark:bg-black text-gray-700 dark:text-gray-300 shadow-xl border border-gray-200 dark:border-gray-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
          {isMobileMenuOpen ? (
            <RiCloseFill className="w-6 h-6" />
          ) : (
            <RiMenuFill className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>

      {/* Mobile Backdrop */}
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

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsProfileModalOpen(false)}
            />
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
                <div className="relative p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <RiUserFill className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Profile
                      </h2>
                    </div>
                    <motion.button
                      onClick={() => setIsProfileModalOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                    >
                      <RiCloseFill className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-lg"
                    />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                      {userProfile.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userProfile.email}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <motion.button
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium"
                      whileHover={{ scale: 1.02 }}
                    >
                      <RiEditBoxFill className="w-5 h-5" />
                      <span>Update Profile</span>
                    </motion.button>
                    <motion.button
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                      whileHover={{ scale: 1.02 }}
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

      {/* Desktop Sidebar */}
      <motion.section
        variants={sidebarVariants}
        initial="expanded"
        animate={isOpen ? "expanded" : "collapsed"}
        className="hidden tablet:flex flex-col h-screen fixed left-0 top-0 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 shadow-lg z-30"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden min-w-0">
              <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                <img
                  src="https://res.cloudinary.com/dva4r5mad/image/upload/v1751438420/B_Logo_dor9oj.png"
                  alt="Logo"
                  className="w-16 h-16 rounded-lg object-cover"
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
                    <span className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
                      Dev<span className="text-gray-500">Panel</span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.button
                  key="toggle"
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <RiMenuFill className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full mt-3 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <RiMenuFill className="w-5 h-5 mx-auto" />
            </motion.button>
          )}
        </div>

        {/* Menu Items */}
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
                    className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                      isOpen ? "gap-3 px-3 py-2.5" : "justify-center py-3 px-2"
                    } ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    }`}
                    whileHover={{ scale: 1.02, x: isOpen ? 2 : 0 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="devActiveIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-900 dark:bg-white rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? "text-gray-900 dark:text-white" : ""
                      }`}
                    />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          variants={textVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className={`text-sm font-medium whitespace-nowrap ${
                            isActive ? "text-gray-900 dark:text-white" : ""
                          }`}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!isOpen && (
                      <motion.div className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-xl z-50">
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45" />
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-200 dark:border-gray-800">
          <motion.div
            className={`p-3 ${isOpen ? "" : "flex flex-col items-center"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setIsProfileModalOpen(true)}
              className={`w-full flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all group relative ${
                isOpen ? "gap-3 p-2" : "flex-col gap-2 py-3"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={userProfile.avatar}
                alt={userProfile.name}
                className={`rounded-full ${
                  isOpen ? "w-10 h-10" : "w-9 h-9"
                } border-2 border-gray-300 dark:border-gray-700`}
                whileHover={{ scale: 1.1 }}
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
              {!isOpen && (
                <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-xl z-50 top-1/2 -translate-y-1/2">
                  <p className="font-medium">{userProfile.name}</p>
                  <p className="text-xs text-gray-400">{userProfile.email}</p>
                </div>
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile Sidebar */}
      <motion.section
        variants={mobileVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        className="tablet:hidden fixed left-0 top-0 h-screen w-[280px] bg-white dark:bg-black shadow-2xl z-50 border-r border-gray-200 dark:border-gray-800 flex flex-col"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dva4r5mad/image/upload/v1751438420/B_Logo_dor9oj.png"
              alt="Logo"
              className="w-10 h-10 rounded-lg object-cover scale-110"
            />
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Dev<span className="text-gray-500">Panel</span>
            </span>
          </div>
        </div>
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
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    }`}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-900 dark:bg-white rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-gray-900 dark:text-white" : ""
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isActive ? "text-gray-900 dark:text-white" : ""
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
        <div className="border-t border-gray-200 dark:border-gray-800 p-3">
          <motion.button
            onClick={() => setIsProfileModalOpen(true)}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
            whileHover={{ scale: 1.02 }}
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
      </motion.section>
    </>
  );
};

export default DeveloperSidebar;
