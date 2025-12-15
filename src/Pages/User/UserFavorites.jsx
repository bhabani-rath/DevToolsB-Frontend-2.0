/**
 * UserFavorites Component - User's saved favorite tools
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiHeartFill,
  RiSearchLine,
  RiStarFill,
  RiDownloadLine,
  RiArrowRightLine,
  RiDeleteBinLine,
  RiExternalLinkLine,
} from "react-icons/ri";

const favoritesData = [
  {
    id: 1,
    name: "Scientific Calculator",
    icon: "🧮",
    category: "Calculator",
    rating: 4.9,
    downloads: "3.2K",
    addedAt: "2 weeks ago",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Currency Converter",
    icon: "💱",
    category: "Converter",
    rating: 4.8,
    downloads: "2.1K",
    addedAt: "1 week ago",
    gradient: "from-green-400 to-green-600",
  },
  {
    id: 3,
    name: "Password Generator",
    icon: "🔒",
    category: "Generator",
    rating: 4.7,
    downloads: "1.8K",
    addedAt: "3 days ago",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    name: "QR Code Generator",
    icon: "📱",
    category: "Generator",
    rating: 4.6,
    downloads: "1.1K",
    addedAt: "1 day ago",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    id: 5,
    name: "Color Picker Pro",
    icon: "🎨",
    category: "Converter",
    rating: 4.8,
    downloads: "980",
    addedAt: "5 hours ago",
    gradient: "from-green-400 to-green-600",
  },
  {
    id: 6,
    name: "BMI Calculator",
    icon: "⚖️",
    category: "Calculator",
    rating: 4.5,
    downloads: "750",
    addedAt: "Today",
    gradient: "from-blue-400 to-blue-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const FavoriteCard = ({ tool, onRemove, onOpen }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -4 }}
    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
  >
    <div className="flex items-start justify-between mb-4">
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl shadow-lg`}
      >
        {tool.icon}
      </div>
      <motion.button
        onClick={() => onRemove(tool.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <RiDeleteBinLine className="w-5 h-5" />
      </motion.button>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
      {tool.name}
    </h3>
    <p className="text-sm text-gray-500 mb-4">{tool.category}</p>
    <div className="flex items-center gap-4 mb-4">
      <span className="flex items-center gap-1 text-sm text-amber-500">
        <RiStarFill className="w-4 h-4" />
        {tool.rating}
      </span>
      <span className="flex items-center gap-1 text-sm text-gray-500">
        <RiDownloadLine className="w-4 h-4" />
        {tool.downloads}
      </span>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
      <span className="text-xs text-gray-400">Added {tool.addedAt}</span>
      <motion.button
        onClick={() => onOpen(tool)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        Open <RiExternalLinkLine className="w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>
);

const UserFavorites = () => {
  const [favorites, setFavorites] = useState(favoritesData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFavorites = favorites.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (id) =>
    setFavorites(favorites.filter((t) => t.id !== id));
  const handleOpen = (tool) => console.log("Open tool:", tool.name);

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
            <RiHeartFill className="w-7 h-7 text-pink-500" /> Favorites
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            You have {favorites.length} favorite tools saved
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search favorites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full tablet:w-80 pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10"
        />
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredFavorites.map((tool) => (
            <FavoriteCard
              key={tool.id}
              tool={tool}
              onRemove={handleRemove}
              onOpen={handleOpen}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredFavorites.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-16">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {searchQuery ? "No favorites found" : "No favorites yet"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchQuery
              ? "Try adjusting your search"
              : "Start exploring and save your favorite tools"}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium"
          >
            Browse Tools <RiArrowRightLine className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserFavorites;
