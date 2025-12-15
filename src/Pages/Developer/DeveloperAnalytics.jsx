/**
 * DeveloperAnalytics Component - Analytics dashboard for developer tools
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RiDownloadLine,
  RiEyeLine,
  RiStarFill,
  RiGlobalLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiCalendarLine,
} from "react-icons/ri";

const overviewStats = [
  {
    id: 1,
    title: "Total Downloads",
    value: "45.2K",
    change: 12.5,
    isPositive: true,
    icon: RiDownloadLine,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    title: "Total Views",
    value: "128K",
    change: 8.3,
    isPositive: true,
    icon: RiEyeLine,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
  },
  {
    id: 3,
    title: "Avg Rating",
    value: "4.7",
    change: 0.2,
    isPositive: true,
    icon: RiStarFill,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 4,
    title: "Countries Reached",
    value: "42",
    change: 5,
    isPositive: true,
    icon: RiGlobalLine,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
  },
];

const downloadTrends = [
  { day: "Mon", downloads: 420 },
  { day: "Tue", downloads: 380 },
  { day: "Wed", downloads: 520 },
  { day: "Thu", downloads: 610 },
  { day: "Fri", downloads: 480 },
  { day: "Sat", downloads: 290 },
  { day: "Sun", downloads: 350 },
];

const ratingDistribution = [
  { stars: 5, count: 245, percentage: 65 },
  { stars: 4, count: 89, percentage: 24 },
  { stars: 3, count: 28, percentage: 7 },
  { stars: 2, count: 10, percentage: 3 },
  { stars: 1, count: 5, percentage: 1 },
];

const topCountries = [
  { name: "United States", flag: "🇺🇸", percentage: 35, downloads: "15.8K" },
  { name: "India", flag: "🇮🇳", percentage: 22, downloads: "9.9K" },
  { name: "Germany", flag: "🇩🇪", percentage: 12, downloads: "5.4K" },
  { name: "United Kingdom", flag: "🇬🇧", percentage: 9, downloads: "4.1K" },
  { name: "Canada", flag: "🇨🇦", percentage: 7, downloads: "3.2K" },
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
  const Icon = stat.icon;
  const iconColor = stat.color.includes("blue")
    ? "#3b82f6"
    : stat.color.includes("purple")
    ? "#8b5cf6"
    : stat.color.includes("amber")
    ? "#f59e0b"
    : "#10b981";
  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-lg"
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
        {stat.value}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
    </motion.div>
  );
};

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.downloads));
  return (
    <div className="flex items-end justify-between h-48 gap-2">
      {data.map((item, index) => (
        <motion.div
          key={item.day}
          className="flex-1 flex flex-col items-center gap-2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <div
            className="w-full bg-gradient-to-t from-purple-600 to-violet-500 rounded-t-lg"
            style={{
              height: `${(item.downloads / maxValue) * 100}%`,
              minHeight: "20px",
            }}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {item.day}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const DeveloperAnalytics = () => {
  const [timePeriod, setTimePeriod] = useState("7d");
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your tools performance and user engagement
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RiCalendarLine className="w-5 h-5 text-gray-400" />
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white focus:outline-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 mobile-large:grid-cols-2 laptop:grid-cols-4 gap-4"
      >
        {overviewStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </motion.div>
      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Download Trends
          </h2>
          <BarChart data={downloadTrends} />
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Rating Distribution
          </h2>
          <div className="space-y-4">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.stars}
                  </span>
                  <RiStarFill className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-violet-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 w-20 text-right">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Top Countries
        </h2>
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-5 gap-4">
          {topCountries.map((country, index) => (
            <motion.div
              key={country.name}
              variants={itemVariants}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{country.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {country.name}
                  </p>
                  <p className="text-xs text-gray-500">{country.downloads}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-violet-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${country.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">
                {country.percentage}%
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeveloperAnalytics;
