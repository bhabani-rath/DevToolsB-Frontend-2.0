/**
 * DeveloperMyTools Component - Enhanced with DevToolsB tool categories
 * @author DevToolsB Team
 * @version 2.0.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiAddLine,
  RiSearchLine,
  RiFilterLine,
  RiEyeLine,
  RiEditLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiStarFill,
  RiCheckboxCircleFill,
  RiTimeLine,
  RiDraftLine,
  RiMoreFill,
  RiCloseLine,
} from "react-icons/ri";

// Tools data aligned with DevToolsB categories (Calculator, Converter, Generator, Miscellaneous)
const toolsData = [
  {
    id: 1,
    name: "Scientific Calculator",
    slug: "scientific-calculator",
    description:
      "Advanced mathematical calculations with trigonometric functions, logarithms, and complex numbers support.",
    icon: "🧮",
    status: "published",
    downloads: 3240,
    rating: 4.9,
    reviews: 156,
    category: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    lastUpdated: "2 days ago",
    createdAt: "3 months ago",
  },
  {
    id: 2,
    name: "Currency Converter",
    slug: "currency-converter",
    description:
      "Real-time currency exchange rates with support for 150+ currencies and historical data.",
    icon: "💱",
    status: "published",
    downloads: 2150,
    rating: 4.8,
    reviews: 89,
    category: "Converter",
    categoryColor: "from-green-400 to-green-600",
    lastUpdated: "1 week ago",
    createdAt: "2 months ago",
  },
  {
    id: 3,
    name: "Password Generator",
    slug: "password-generator",
    description:
      "Create strong, secure passwords with customizable length, character sets, and strength meter.",
    icon: "🔒",
    status: "published",
    downloads: 1890,
    rating: 4.7,
    reviews: 72,
    category: "Generator",
    categoryColor: "from-purple-400 to-purple-600",
    lastUpdated: "3 days ago",
    createdAt: "4 months ago",
  },
  {
    id: 4,
    name: "QR Code Generator",
    slug: "qr-code-generator",
    description:
      "Generate QR codes for URLs, text, WiFi credentials with custom colors and logo embedding.",
    icon: "📱",
    status: "pending",
    downloads: 1152,
    rating: 4.6,
    reviews: 45,
    category: "Generator",
    categoryColor: "from-purple-400 to-purple-600",
    lastUpdated: "1 day ago",
    createdAt: "1 month ago",
  },
  {
    id: 5,
    name: "Color Picker Pro",
    slug: "color-picker-pro",
    description:
      "Advanced color picker with HEX, RGB, HSL conversion and palette generation capabilities.",
    icon: "🎨",
    status: "draft",
    downloads: 0,
    rating: 0,
    reviews: 0,
    category: "Converter",
    categoryColor: "from-green-400 to-green-600",
    lastUpdated: "5 hours ago",
    createdAt: "Today",
  },
  {
    id: 6,
    name: "BMI Calculator",
    slug: "bmi-calculator",
    description:
      "Calculate Body Mass Index with metric & imperial units, health status, and ideal weight suggestions.",
    icon: "⚖️",
    status: "draft",
    downloads: 0,
    rating: 0,
    reviews: 0,
    category: "Calculator",
    categoryColor: "from-blue-400 to-blue-600",
    lastUpdated: "Just now",
    createdAt: "Today",
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
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.95 },
};
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const StatusBadge = ({ status }) => {
  const config = {
    published: {
      icon: RiCheckboxCircleFill,
      text: "Published",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    pending: {
      icon: RiTimeLine,
      text: "Pending Review",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      color: "text-amber-600 dark:text-amber-400",
    },
    draft: {
      icon: RiDraftLine,
      text: "Draft",
      bg: "bg-gray-100 dark:bg-gray-800",
      color: "text-gray-600 dark:text-gray-400",
    },
  }[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.text}
    </span>
  );
};

const ToolCard = ({ tool, onView, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.categoryColor} flex items-center justify-center text-2xl shadow-lg`}
          >
            {tool.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {tool.name}
            </h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${tool.categoryColor} bg-clip-text text-transparent`}
            >
              {tool.category}
            </span>
          </div>
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
          >
            <RiMoreFill className="w-5 h-5" />
          </motion.button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-10 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10"
              >
                <button
                  onClick={() => {
                    onView(tool);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <RiEyeLine className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => {
                    onEdit(tool);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <RiEditLine className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(tool);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <RiDeleteBinLine className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {tool.description}
      </p>
      <div className="mb-4">
        <StatusBadge status={tool.status} />
      </div>

      {tool.status === "published" && (
        <div className="flex items-center gap-6 py-4 border-y border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <div className="flex items-center gap-1">
              <RiDownloadLine className="w-4 h-4 text-blue-500" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {tool.downloads.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-500">Downloads</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <RiStarFill className="w-4 h-4 text-amber-500" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {tool.rating}
              </span>
            </div>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {tool.reviews}
            </span>
            <p className="text-xs text-gray-500">Reviews</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <span className="text-xs text-gray-400">
          Updated {tool.lastUpdated}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onView(tool)}
          className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
        >
          View Details <RiEyeLine className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const ViewToolModal = ({ tool, isOpen, onClose }) => {
  if (!tool) return null;
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
            className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div
              className={`relative p-6 bg-gradient-to-r ${tool.categoryColor}`}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h2 className="text-xl font-bold text-white">{tool.name}</h2>
                <span className="text-white/80 text-sm">{tool.category}</span>
              </div>
            </div>
            {tool.status === "published" && (
              <div className="flex items-center justify-around py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <RiDownloadLine className="w-5 h-5 text-blue-500" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {tool.downloads.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Downloads</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <RiStarFill className="w-5 h-5 text-amber-500" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {tool.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tool.reviews}
                  </span>
                  <p className="text-xs text-gray-500">Reviews</p>
                </div>
              </div>
            )}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Description
                </p>
                <p className="text-gray-900 dark:text-white">
                  {tool.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <StatusBadge status={tool.status} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {tool.createdAt}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <RiEditLine className="w-5 h-5" />
                  Edit Tool
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-3 bg-gradient-to-r ${tool.categoryColor} text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                >
                  <RiEyeLine className="w-5 h-5" />
                  Preview
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DeveloperMyTools = () => {
  const [tools, setTools] = useState(toolsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const categories = [...new Set(toolsData.map((t) => t.category))];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || tool.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || tool.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: tools.length,
    published: tools.filter((t) => t.status === "published").length,
    pending: tools.filter((t) => t.status === "pending").length,
    draft: tools.filter((t) => t.status === "draft").length,
  };

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Tools
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your {stats.total} tools • {stats.published} published,{" "}
            {stats.pending} pending, {stats.draft} drafts
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

      {/* Search and Filters */}
      <div className="flex flex-col tablet:flex-row gap-4">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-white/10 focus:border-gray-300 dark:focus:border-gray-700 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <RiFilterLine className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-all"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tools Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6"
      >
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onView={(t) => {
              setSelectedTool(t);
              setIsViewModalOpen(true);
            }}
            onEdit={(t) => console.log("Edit:", t.name)}
            onDelete={(t) => setTools(tools.filter((x) => x.id !== t.id))}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-16">
          <div className="text-6xl mb-4">🔧</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No tools found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchQuery || filterStatus !== "all" || filterCategory !== "all"
              ? "Try adjusting your search or filters"
              : "Start by creating your first developer tool"}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <RiAddLine className="w-5 h-5" />
            <span>Create Your First Tool</span>
          </motion.button>
        </motion.div>
      )}

      {/* View Modal */}
      <ViewToolModal
        tool={selectedTool}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </motion.div>
  );
};

export default DeveloperMyTools;
