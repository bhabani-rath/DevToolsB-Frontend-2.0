/**
 * UserHistory Component - Tool usage history with timeline
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RiHistoryFill,
  RiSearchLine,
  RiCalendarLine,
  RiTimeLine,
  RiExternalLinkLine,
  RiDeleteBinLine,
} from "react-icons/ri";

const historyData = [
  {
    date: "Today",
    items: [
      {
        id: 1,
        name: "Scientific Calculator",
        icon: "🧮",
        category: "Calculator",
        time: "10:30 AM",
        duration: "5 min",
        gradient: "from-blue-400 to-blue-600",
      },
      {
        id: 2,
        name: "Currency Converter",
        icon: "💱",
        category: "Converter",
        time: "9:15 AM",
        duration: "3 min",
        gradient: "from-green-400 to-green-600",
      },
    ],
  },
  {
    date: "Yesterday",
    items: [
      {
        id: 3,
        name: "Password Generator",
        icon: "🔒",
        category: "Generator",
        time: "4:45 PM",
        duration: "2 min",
        gradient: "from-purple-400 to-purple-600",
      },
      {
        id: 4,
        name: "QR Code Generator",
        icon: "📱",
        category: "Generator",
        time: "2:30 PM",
        duration: "4 min",
        gradient: "from-purple-400 to-purple-600",
      },
      {
        id: 5,
        name: "Scientific Calculator",
        icon: "🧮",
        category: "Calculator",
        time: "11:00 AM",
        duration: "8 min",
        gradient: "from-blue-400 to-blue-600",
      },
    ],
  },
  {
    date: "December 13, 2024",
    items: [
      {
        id: 6,
        name: "Color Picker Pro",
        icon: "🎨",
        category: "Converter",
        time: "6:20 PM",
        duration: "6 min",
        gradient: "from-green-400 to-green-600",
      },
      {
        id: 7,
        name: "BMI Calculator",
        icon: "⚖️",
        category: "Calculator",
        time: "3:10 PM",
        duration: "2 min",
        gradient: "from-blue-400 to-blue-600",
      },
    ],
  },
  {
    date: "December 12, 2024",
    items: [
      {
        id: 8,
        name: "Currency Converter",
        icon: "💱",
        category: "Converter",
        time: "5:00 PM",
        duration: "4 min",
        gradient: "from-green-400 to-green-600",
      },
    ],
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

const HistoryItem = ({ item, onOpen, onRemove }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ x: 4 }}
    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
  >
    <div
      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}
    >
      {item.icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
        {item.name}
      </p>
      <div className="flex items-center gap-3 mt-0.5">
        <span className="text-xs text-gray-500">{item.category}</span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <RiTimeLine className="w-3 h-3" />
          {item.time}
        </span>
        <span className="text-xs text-gray-400">{item.duration}</span>
      </div>
    </div>
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <motion.button
        onClick={() => onOpen(item)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <RiExternalLinkLine className="w-4 h-4" />
      </motion.button>
      <motion.button
        onClick={() => onRemove(item.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500"
      >
        <RiDeleteBinLine className="w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>
);

const UserHistory = () => {
  const [history, setHistory] = useState(historyData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = (item) => console.log("Open:", item.name);
  const handleRemove = (id) => {
    setHistory(
      history
        .map((day) => ({
          ...day,
          items: day.items.filter((item) => item.id !== id),
        }))
        .filter((day) => day.items.length > 0)
    );
  };
  const handleClearAll = () => setHistory([]);

  const filteredHistory = history
    .map((day) => ({
      ...day,
      items: day.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((day) => day.items.length > 0);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <RiHistoryFill className="w-7 h-7 text-gray-500" /> History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            View your tool usage history
          </p>
        </div>
        {history.length > 0 && (
          <motion.button
            onClick={handleClearAll}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-medium transition-colors"
          >
            <RiDeleteBinLine className="w-4 h-4" />
            <span>Clear History</span>
          </motion.button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full tablet:w-80 pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10"
        />
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {filteredHistory.map((day) => (
          <motion.div key={day.date} variants={itemVariants}>
            <div className="flex items-center gap-3 mb-3">
              <RiCalendarLine className="w-5 h-5 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {day.date}
              </h3>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden divide-y divide-gray-50 dark:divide-gray-800/50">
              {day.items.map((item) => (
                <HistoryItem
                  key={item.id}
                  item={item}
                  onOpen={handleOpen}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {searchQuery ? "No results found" : "No history yet"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery
              ? "Try a different search"
              : "Start using tools to see your history"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserHistory;
