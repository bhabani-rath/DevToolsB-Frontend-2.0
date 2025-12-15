/**
 * UserDashboard Component - User's welcome dashboard
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiToolsFill,
  RiHeartFill,
  RiTimeLine,
  RiStarFill,
  RiArrowRightLine,
  RiDownloadLine,
  RiArrowUpLine,
} from "react-icons/ri";

const statsData = [
  {
    id: 1,
    title: "Tools Used",
    value: 24,
    change: 12,
    isPositive: true,
    icon: RiToolsFill,
    bgColor: "bg-blue-500/10",
    iconColor: "#3b82f6",
  },
  {
    id: 2,
    title: "Favorites",
    value: 8,
    change: 2,
    isPositive: true,
    icon: RiHeartFill,
    bgColor: "bg-pink-500/10",
    iconColor: "#ec4899",
  },
  {
    id: 3,
    title: "Sessions",
    value: 156,
    change: 15,
    isPositive: true,
    icon: RiTimeLine,
    bgColor: "bg-green-500/10",
    iconColor: "#10b981",
  },
  {
    id: 4,
    title: "Reviews Given",
    value: 12,
    change: 3,
    isPositive: true,
    icon: RiStarFill,
    bgColor: "bg-amber-500/10",
    iconColor: "#f59e0b",
  },
];

const recentTools = [
  {
    id: 1,
    name: "Scientific Calculator",
    icon: "🧮",
    category: "Calculator",
    lastUsed: "2 hours ago",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Currency Converter",
    icon: "💱",
    category: "Converter",
    lastUsed: "5 hours ago",
    gradient: "from-green-400 to-green-600",
  },
  {
    id: 3,
    name: "Password Generator",
    icon: "🔒",
    category: "Generator",
    lastUsed: "1 day ago",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    name: "QR Code Generator",
    icon: "📱",
    category: "Generator",
    lastUsed: "2 days ago",
    gradient: "from-purple-400 to-purple-600",
  },
];

const recommendedTools = [
  {
    id: 1,
    name: "Color Picker Pro",
    icon: "🎨",
    category: "Converter",
    rating: 4.8,
    downloads: "12K",
    gradient: "from-green-400 to-green-600",
  },
  {
    id: 2,
    name: "BMI Calculator",
    icon: "⚖️",
    category: "Calculator",
    rating: 4.7,
    downloads: "8K",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    name: "Markdown Editor",
    icon: "📝",
    category: "Generator",
    rating: 4.9,
    downloads: "15K",
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
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
          <Icon className="w-6 h-6" style={{ color: stat.iconColor }} />
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-emerald-500">
          <RiArrowUpLine className="w-4 h-4" />
          <span>+{stat.change}</span>
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {displayValue}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
    </motion.div>
  );
};

const UserDashboard = () => {
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
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Discover tools and boost your productivity
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:opacity-90"
        >
          <RiToolsFill className="w-5 h-5" />
          <span>Browse All Tools</span>
        </motion.button>
      </div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 mobile-large:grid-cols-2 laptop:grid-cols-4 gap-4"
      >
        {statsData.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 laptop:grid-cols-3 gap-6">
        {/* Recently Used Tools */}
        <motion.div
          variants={itemVariants}
          className="laptop:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recently Used
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1"
            >
              View all <RiArrowRightLine className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {recentTools.map((tool) => (
              <motion.div
                key={tool.id}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="flex items-center gap-4 p-4 cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xl shadow-lg`}
                >
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {tool.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {tool.category} • {tool.lastUsed}
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="opacity-0 group-hover:opacity-100"
                >
                  <RiArrowRightLine className="w-5 h-5 text-gray-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommended */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recommended for You
          </h2>
          <div className="space-y-4">
            {recommendedTools.map((tool) => (
              <motion.div
                key={tool.id}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
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
                    <span className="flex items-center gap-1 text-xs text-amber-500">
                      <RiStarFill className="w-3 h-3" />
                      {tool.rating}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <RiDownloadLine className="w-3 h-3" />
                      {tool.downloads}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full mt-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Explore More Tools
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
