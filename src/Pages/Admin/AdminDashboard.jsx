/**
 * AdminDashboard Component
 *
 * @description Comprehensive admin dashboard with multiple sections for managing
 * the DevToolsB platform. Features animated statistics, user management, developer
 * profiles, tools grid, and ratings overview.
 *
 * @component
 * @features
 * - Animated stat cards with hover effects
 * - Quick action buttons for common tasks
 * - Recent activity timeline
 * - Users management section
 * - Developers profiles grid
 * - Tools management with categories
 * - Ratings and reviews overview
 * - Responsive grid layouts
 * - Dark/Light mode support
 *
 * @author DevToolsB Team
 * @version 2.0.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiDashboardFill,
  RiGroupFill,
  RiCodeSSlashFill,
  RiToolsFill,
  RiStarFill,
  RiArrowUpLine,
  RiArrowDownLine,
  RiAddLine,
  RiTimeLine,
  RiCheckboxCircleFill,
  RiUserAddLine,
  RiDownloadLine,
  RiRefreshLine,
  RiArrowRightLine,
  RiCloseLine,
  RiRobot2Line,
  RiErrorWarningLine,
  RiDeleteBinLine,
} from "react-icons/ri";

// Import section components
import AdminUsers from "./AdminUsers";
import AdminDevelopers from "./AdminDevelopers";
import AdminTools from "./AdminTools";
import AdminRatings from "./AdminRatings";

// Import chatbot metrics context
import { useChatbot } from "../../context/ChatbotContext";

// Import export service
import { exportData } from "../../Services/exportService";

// ============================================================================
// MOCK DATA - Demo data for dashboard sections
// ============================================================================

/**
 * Statistics data for dashboard overview cards
 */
const statsData = [
  {
    id: 1,
    title: "Total Users",
    value: 12847,
    change: 12.5,
    isPositive: true,
    icon: RiGroupFill,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    title: "Active Developers",
    value: 3429,
    change: 8.2,
    isPositive: true,
    icon: RiCodeSSlashFill,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: 3,
    title: "Tools Published",
    value: 847,
    change: 3.1,
    isPositive: false,
    icon: RiToolsFill,
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-500/10",
  },
  {
    id: 4,
    title: "Average Rating",
    value: 4.8,
    change: 0.3,
    isPositive: true,
    icon: RiStarFill,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-500/10",
  },
];

/**
 * Recent activity data for the activity feed
 */
const recentActivity = [
  {
    id: 1,
    type: "user_joined",
    message: "New user Sarah Johnson registered",
    time: "2 minutes ago",
    icon: RiUserAddLine,
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "tool_published",
    message: "JSON Formatter Pro was published by DevMaster",
    time: "15 minutes ago",
    icon: RiToolsFill,
    color: "text-emerald-500",
  },
  {
    id: 3,
    type: "review_added",
    message: "5-star review on Code Beautifier",
    time: "1 hour ago",
    icon: RiStarFill,
    color: "text-amber-500",
  },
  {
    id: 4,
    type: "user_verified",
    message: "Developer Mike Chen verified",
    time: "2 hours ago",
    icon: RiCheckboxCircleFill,
    color: "text-green-500",
  },
  {
    id: 5,
    type: "tool_updated",
    message: "Regex Tester v2.0 released",
    time: "3 hours ago",
    icon: RiRefreshLine,
    color: "text-violet-500",
  },
];

// ============================================================================
// ANIMATION VARIANTS - Framer Motion configuration
// ============================================================================

/**
 * Container animation for staggered children
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Individual item animation
 */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
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
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * StatCard Component - Displays individual statistics with animations
 * @param {Object} stat - Statistic data object
 * @param {number} index - Index for stagger animation
 */
const StatCard = ({ stat, index }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = stat.icon;

  // Animated counter effect
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setDisplayValue(stat.value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <motion.div
      variants={itemVariants}
      initial="rest"
      whileHover="hover"
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Background gradient decoration */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}
      />

      {/* Header with icon */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
          <Icon
            className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
            style={{
              color: stat.color.includes("blue")
                ? "#3b82f6"
                : stat.color.includes("emerald")
                ? "#10b981"
                : stat.color.includes("violet")
                ? "#8b5cf6"
                : "#f59e0b",
            }}
          />
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            stat.isPositive ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {stat.isPositive ? (
            <RiArrowUpLine className="w-4 h-4" />
          ) : (
            <RiArrowDownLine className="w-4 h-4" />
          )}
          <span>{stat.change}%</span>
        </div>
      </div>

      {/* Value and title */}
      <div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {stat.id === 4
            ? displayValue.toFixed(1)
            : displayValue.toLocaleString()}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
      </div>
    </motion.div>
  );
};

/**
 * ActivityItem Component - Individual activity feed item
 * @param {Object} activity - Activity data object
 */
const ActivityItem = ({ activity }) => {
  const Icon = activity.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
    >
      {/* Activity icon */}
      <div
        className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${activity.color}`}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Activity content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
          {activity.message}
        </p>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
          <RiTimeLine className="w-3 h-3" />
          <span>{activity.time}</span>
        </div>
      </div>

      {/* View action */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <RiArrowRightLine className="w-5 h-5 text-gray-400" />
      </motion.div>
    </motion.div>
  );
};

/**
 * ExportModal - Export data modal
 */
const ExportModal = ({ isOpen, onClose }) => {
  const [exportType, setExportType] = useState("all");
  const [format, setFormat] = useState("csv");
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState(null);

  const handleExport = async () => {
    setIsExporting(true);
    setExportResult(null);

    try {
      const result = await exportData(exportType, format);
      setExportResult({ success: true, filename: result.filename });

      // Auto-close after successful export
      setTimeout(() => {
        onClose();
        setExportResult(null);
      }, 1500);
    } catch (error) {
      setExportResult({ success: false, error: error.message });
    } finally {
      setIsExporting(false);
    }
  };

  // Reset state when modal closes
  const handleClose = () => {
    setExportResult(null);
    setIsExporting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10">
                  <RiDownloadLine className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Export Data
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Success Message */}
              {exportResult?.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl"
                >
                  <RiCheckboxCircleFill className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      Export Successful!
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-500">
                      Downloaded: {exportResult.filename}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {exportResult?.success === false && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl"
                >
                  <RiErrorWarningLine className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      Export Failed
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-500">
                      {exportResult.error || "An error occurred"}
                    </p>
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data to Export
                </label>
                <select
                  value={exportType}
                  onChange={(e) => setExportType(e.target.value)}
                  disabled={isExporting}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors disabled:opacity-50"
                >
                  <option value="all">All Data</option>
                  <option value="users">Users Only</option>
                  <option value="developers">Developers Only</option>
                  <option value="tools">Tools Only</option>
                  <option value="ratings">Ratings Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["csv", "json"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormat(f)}
                      disabled={isExporting}
                      className={`py-3 rounded-xl font-medium uppercase text-sm transition-all disabled:opacity-50 ${
                        format === f
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handleClose}
                  disabled={isExporting}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isExporting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      >
                        <RiRefreshLine className="w-4 h-4" />
                      </motion.span>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <RiDownloadLine className="w-4 h-4" />
                      Export
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * AddNewModal - Quick add modal for dashboard
 */
const AddNewModal = ({ isOpen, onClose }) => {
  const options = [
    { id: "user", label: "New User", icon: RiGroupFill, color: "bg-blue-500" },
    {
      id: "developer",
      label: "New Developer",
      icon: RiCodeSSlashFill,
      color: "bg-emerald-500",
    },
    {
      id: "tool",
      label: "New Tool",
      icon: RiToolsFill,
      color: "bg-violet-500",
    },
  ];

  const handleSelect = (optionId) => {
    console.log(`Creating new ${optionId}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-900 dark:bg-white">
                  <RiAddLine className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Add
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {options.map((option) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(option.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className={`p-3 rounded-xl ${option.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </span>
                    <RiArrowRightLine className="w-5 h-5 text-gray-400 ml-auto" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AdminDashboard = ({ activeSection = "Dashboard" }) => {
  // Modal states
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Chatbot metrics from context
  const {
    metrics,
    errors,
    apiStatus,
    getErrorRate,
    getSuccessRate,
    clearError,
    clearErrors,
  } = useChatbot();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ================================================================== */}
      {/* DASHBOARD OVERVIEW SECTION - Visible on Dashboard */}
      {/* ================================================================== */}
      {activeSection === "Dashboard" && (
        <>
          {/* Section Header */}
          <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, Admin! 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Here's what's happening with your platform today.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <RiDownloadLine className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <RiAddLine className="w-4 h-4" />
                <span>Add New</span>
              </motion.button>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 mobile-large:grid-cols-2 laptop:grid-cols-4 gap-4"
          >
            {statsData.map((stat, index) => (
              <StatCard key={stat.id} stat={stat} index={index} />
            ))}
          </motion.div>

          {/* Main Content Grid - Activity & Quick Stats */}
          <div className="grid grid-cols-1 laptop:grid-cols-3 gap-6">
            {/* Recent Activity Feed */}
            <motion.div
              variants={itemVariants}
              className="laptop:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Activity
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    View all
                  </motion.button>
                </div>
              </div>
              <motion.div
                variants={containerVariants}
                className="divide-y divide-gray-50 dark:divide-gray-800/50"
              >
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </motion.div>
            </motion.div>

            {/* Platform Health with Chatbot Metrics */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <RiRobot2Line className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Platform Health
                </h2>
              </div>

              {/* Health metrics */}
              <div className="space-y-6">
                {/* Chatbot API Status */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Chatbot API
                    </span>
                    <span
                      className={`text-sm font-medium flex items-center gap-1 ${
                        apiStatus.isOnline ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          apiStatus.isOnline ? "bg-emerald-500" : "bg-red-500"
                        } animate-pulse`}
                      />
                      {apiStatus.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: apiStatus.isOnline ? "100%" : "0%" }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${
                        apiStatus.isOnline ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Chatbot API Response Time */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Chatbot Response Time
                    </span>
                    <span className="text-sm font-medium text-blue-500">
                      {metrics.averageResponseTime > 0
                        ? `${metrics.averageResponseTime}ms avg`
                        : "No data"}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          (5000 - metrics.averageResponseTime) / 50,
                          100
                        )}%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                  {metrics.lastResponseTime && (
                    <p className="text-xs text-gray-400 mt-1">
                      Last: {metrics.lastResponseTime}ms
                    </p>
                  )}
                </div>

                {/* Chatbot Success Rate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Chatbot Success Rate
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        parseFloat(getSuccessRate()) >= 95
                          ? "text-emerald-500"
                          : parseFloat(getSuccessRate()) >= 80
                          ? "text-amber-500"
                          : "text-red-500"
                      }`}
                    >
                      {getSuccessRate()}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getSuccessRate()}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className={`h-full rounded-full ${
                        parseFloat(getSuccessRate()) >= 95
                          ? "bg-emerald-500"
                          : parseFloat(getSuccessRate()) >= 80
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {metrics.successfulRequests} successful /{" "}
                    {metrics.totalRequests} total requests
                  </p>
                </div>

                {/* Error Rate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Chatbot Error Rate
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        parseFloat(getErrorRate()) <= 1
                          ? "text-emerald-500"
                          : parseFloat(getErrorRate()) <= 5
                          ? "text-amber-500"
                          : "text-red-500"
                      }`}
                    >
                      {getErrorRate()}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          parseFloat(getErrorRate()) * 10,
                          100
                        )}%`,
                      }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className={`h-full rounded-full ${
                        parseFloat(getErrorRate()) <= 1
                          ? "bg-emerald-500"
                          : parseFloat(getErrorRate()) <= 5
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chatbot Error Logs Section */}
          {errors.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-red-500/10">
                      <RiErrorWarningLine className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Chatbot Error Logs
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {errors.length} recent errors
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearErrors}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <RiDeleteBinLine className="w-4 h-4" />
                    Clear All
                  </motion.button>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-80 overflow-y-auto">
                {errors.map((error) => (
                  <div
                    key={error.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              error.type === "auth"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                : error.type === "rate_limit"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                : error.type === "network"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {error.type.replace("_", " ")}
                          </span>
                          <span className="text-xs text-gray-400">
                            {error.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                          {error.message}
                        </p>
                        {error.userMessage && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                            User query: "{error.userMessage}"
                          </p>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => clearError(error.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <RiCloseLine className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ================================================================== */}
      {/* USERS SECTION - Visible on Users */}
      {/* ================================================================== */}
      {activeSection === "Users" && <AdminUsers />}

      {/* ================================================================== */}
      {/* DEVELOPERS SECTION - Visible on Developers */}
      {/* ================================================================== */}
      {activeSection === "Developers" && <AdminDevelopers />}

      {/* ================================================================== */}
      {/* TOOLS SECTION - Visible on Tools */}
      {/* ================================================================== */}
      {activeSection === "Tools" && <AdminTools />}

      {/* ================================================================== */}
      {/* RATINGS SECTION - Visible on Ratings */}
      {/* ================================================================== */}
      {activeSection === "Ratings" && <AdminRatings />}

      {/* Modals */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
      <AddNewModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </motion.div>
  );
};

export default AdminDashboard;
