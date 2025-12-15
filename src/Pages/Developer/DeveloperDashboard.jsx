/**
 * DeveloperDashboard Component - Enhanced with DevToolsB branding
 * @author DevToolsB Team
 * @version 2.0.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiToolsFill,
  RiDownloadLine,
  RiStarFill,
  RiEyeLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiAddLine,
  RiTimeLine,
  RiCheckboxCircleFill,
  RiArrowRightLine,
  RiCodeSSlashFill,
} from "react-icons/ri";

// Stats aligned with DevToolsB platform metrics
const statsData = [
  {
    id: 1,
    title: "Published Tools",
    value: 6,
    change: 20.0,
    isPositive: true,
    icon: RiToolsFill,
    color: "from-gray-700 to-gray-900",
    bgColor: "bg-gray-100 dark:bg-gray-800",
  },
  {
    id: 2,
    title: "Total Downloads",
    value: 8432,
    change: 15.3,
    isPositive: true,
    icon: RiDownloadLine,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 3,
    title: "Avg Rating",
    value: 4.7,
    change: 0.2,
    isPositive: true,
    icon: RiStarFill,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 4,
    title: "Tool Views",
    value: 24891,
    change: 8.4,
    isPositive: true,
    icon: RiEyeLine,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
  },
];

// Recent activity related to DevToolsB tools
const recentActivity = [
  {
    id: 1,
    type: "download",
    message: "Scientific Calculator downloaded 45 times today",
    time: "10 minutes ago",
    icon: RiDownloadLine,
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "review",
    message: "New 5-star review: 'Best currency converter ever!'",
    time: "1 hour ago",
    icon: RiStarFill,
    color: "text-amber-500",
  },
  {
    id: 3,
    type: "view",
    message: "Password Generator trending - 320 views today",
    time: "2 hours ago",
    icon: RiEyeLine,
    color: "text-purple-500",
  },
  {
    id: 4,
    type: "approved",
    message: "QR Code Generator approved and published",
    time: "5 hours ago",
    icon: RiCheckboxCircleFill,
    color: "text-green-500",
  },
  {
    id: 5,
    type: "milestone",
    message: "You've reached 8,000+ total downloads! 🎉",
    time: "1 day ago",
    icon: RiCodeSSlashFill,
    color: "text-indigo-500",
  },
];

// Top tools by performance
const topTools = [
  {
    id: 1,
    name: "Scientific Calculator",
    icon: "🧮",
    category: "Calculator",
    downloads: 3240,
    rating: 4.9,
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Currency Converter",
    icon: "💱",
    category: "Converter",
    downloads: 2150,
    rating: 4.8,
    gradient: "from-green-400 to-green-600",
  },
  {
    id: 3,
    name: "Password Generator",
    icon: "🔒",
    category: "Generator",
    downloads: 1890,
    rating: 4.7,
    gradient: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    name: "QR Code Generator",
    icon: "📱",
    category: "Generator",
    downloads: 1152,
    rating: 4.6,
    gradient: "from-purple-400 to-purple-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const StatCard = ({ stat }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    const duration = 1500,
      steps = 60,
      increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setDisplayValue(stat.value);
        clearInterval(timer);
      } else {
        setDisplayValue(stat.id === 3 ? current : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [stat.value, stat.id]);

  const iconColor = stat.color.includes("gray")
    ? "#374151"
    : stat.color.includes("blue")
    ? "#3b82f6"
    : stat.color.includes("amber")
    ? "#f59e0b"
    : "#10b981";

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}
      />
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
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
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {stat.id === 3
          ? displayValue.toFixed(1)
          : displayValue.toLocaleString()}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
    </motion.div>
  );
};

const ActivityItem = ({ activity }) => {
  const Icon = activity.icon;
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
    >
      <div
        className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${activity.color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {activity.message}
        </p>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
          <RiTimeLine className="w-3 h-3" />
          <span>{activity.time}</span>
        </div>
      </div>
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

const DeveloperDashboard = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, Developer! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's how your tools are performing on DevToolsB today.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <RiAddLine className="w-5 h-5" />
          <span>Create New Tool</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 mobile-large:grid-cols-2 laptop:grid-cols-4 gap-4"
      >
        {statsData.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 laptop:grid-cols-3 gap-6">
        {/* Recent Activity */}
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
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
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

        {/* Top Performing Tools */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Tools
          </h2>
          <div className="space-y-4">
            {topTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-lg shadow-lg`}
                >
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {tool.name}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-500">
                      {tool.downloads.toLocaleString()} downloads
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-500">
                      <RiStarFill className="w-3 h-3" />
                      {tool.rating}
                    </span>
                  </div>
                </div>
                <span
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {index + 1}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            View All Tools
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DeveloperDashboard;
