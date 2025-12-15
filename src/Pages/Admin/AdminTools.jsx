/**
 * AdminTools Component
 *
 * @description Tools management section with grid cards and modals.
 * Features tool cards with Edit, View, and Add functionality.
 *
 * @component
 * @author DevToolsB Team
 * @version 2.0.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiToolsFill,
  RiAddLine,
  RiStarFill,
  RiDownloadLine,
  RiCloseLine,
  RiEditLine,
  RiCheckLine,
  RiEyeLine,
  RiDeleteBinLine,
  RiExternalLinkLine,
} from "react-icons/ri";

// ============================================================================
// MOCK DATA
// ============================================================================

const initialToolsData = [
  {
    id: 1,
    name: "JSON Formatter Pro",
    description:
      "Advanced JSON formatter with syntax highlighting and validation",
    category: "Formatters",
    author: "Alex Rodriguez",
    rating: 4.9,
    downloads: 45230,
    status: "published",
    icon: "🔧",
    version: "2.1.0",
    lastUpdated: "Dec 10, 2024",
    features: [
      "Syntax highlighting",
      "Error detection",
      "Minify/Beautify",
      "Copy to clipboard",
    ],
  },
  {
    id: 2,
    name: "Regex Tester",
    description: "Real-time regex pattern testing with explanation",
    category: "Testing",
    author: "Priya Sharma",
    rating: 4.7,
    downloads: 32100,
    status: "published",
    icon: "🎯",
    version: "1.5.2",
    lastUpdated: "Dec 8, 2024",
    features: [
      "Live testing",
      "Pattern explanation",
      "Match highlighting",
      "Common patterns library",
    ],
  },
  {
    id: 3,
    name: "Color Palette Generator",
    description: "AI-powered color scheme generator for designers",
    category: "Design",
    author: "David Kim",
    rating: 4.8,
    downloads: 28450,
    status: "published",
    icon: "🎨",
    version: "3.0.0",
    lastUpdated: "Dec 5, 2024",
    features: [
      "AI suggestions",
      "Export to CSS/SCSS",
      "Accessibility check",
      "Palette history",
    ],
  },
  {
    id: 4,
    name: "API Playground",
    description: "Test and debug REST APIs with ease",
    category: "API",
    author: "Emma Thompson",
    rating: 4.6,
    downloads: 19870,
    status: "pending",
    icon: "🚀",
    version: "1.0.0",
    lastUpdated: "Dec 12, 2024",
    features: [
      "Request builder",
      "Response viewer",
      "History tracking",
      "Environment variables",
    ],
  },
  {
    id: 5,
    name: "Code Minifier",
    description: "Minify JavaScript, CSS, and HTML files",
    category: "Optimization",
    author: "Alex Rodriguez",
    rating: 4.5,
    downloads: 15240,
    status: "published",
    icon: "⚡",
    version: "2.0.1",
    lastUpdated: "Nov 28, 2024",
    features: [
      "JS minification",
      "CSS minification",
      "HTML compression",
      "Source maps",
    ],
  },
  {
    id: 6,
    name: "Markdown Editor",
    description: "Live preview markdown editor with export options",
    category: "Editors",
    author: "Priya Sharma",
    rating: 4.8,
    downloads: 22100,
    status: "published",
    icon: "📝",
    version: "1.8.0",
    lastUpdated: "Dec 1, 2024",
    features: [
      "Live preview",
      "Syntax highlighting",
      "Export to PDF/HTML",
      "Templates",
    ],
  },
];

const categories = [
  "Formatters",
  "Testing",
  "Design",
  "API",
  "Optimization",
  "Editors",
  "Converters",
  "Security",
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
 * ToolCard Component - Tool management card
 */
const ToolCard = ({ tool, onView, onEdit, onDelete }) => {
  const statusStyles = {
    published:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    draft: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {tool.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              by {tool.author}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
            statusStyles[tool.status]
          }`}
        >
          {tool.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {tool.description}
      </p>

      {/* Category */}
      <div className="mb-4">
        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400">
          {tool.category}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-1 text-amber-500">
          <RiStarFill className="w-4 h-4" />
          <span className="text-sm font-medium">{tool.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <RiDownloadLine className="w-4 h-4" />
          <span className="text-sm">{tool.downloads.toLocaleString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onEdit(tool)}
          className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <RiEditLine className="w-4 h-4" />
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onView(tool)}
          className="flex-1 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <RiEyeLine className="w-4 h-4" />
          View
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(tool)}
          className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          <RiDeleteBinLine className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

/**
 * ViewToolModal - Display tool details
 */
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
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-violet-500 to-purple-600">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <span className="text-5xl">{tool.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-white">{tool.name}</h2>
                  <p className="text-violet-100">by {tool.author}</p>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center justify-around py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <RiStarFill className="w-5 h-5 text-amber-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tool.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Rating
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tool.downloads.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Downloads
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  v{tool.version}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Version
                </p>
              </div>
            </div>

            {/* Body */}
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Category
                  </p>
                  <span className="inline-block mt-1 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 rounded-full text-sm font-medium">
                    {tool.category}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      tool.status === "published"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {tool.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last Updated
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {tool.lastUpdated}
                </p>
              </div>

              {tool.features && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Features
                  </p>
                  <ul className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RiExternalLinkLine className="w-4 h-4" />
                  Open Tool
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * EditToolModal - Edit tool details
 */
const EditToolModal = ({ tool, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    status: "",
    version: "",
  });

  React.useEffect(() => {
    if (tool) {
      setFormData({
        name: tool.name || "",
        description: tool.description || "",
        category: tool.category || "",
        status: tool.status || "",
        version: tool.version || "",
      });
    }
  }, [tool]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...tool,
      ...formData,
      lastUpdated: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
    onClose();
  };

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
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-500/10">
                  <RiEditLine className="w-5 h-5 text-violet-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit Tool
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tool Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  >
                    <option value="published">Published</option>
                    <option value="pending">Pending</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Version
                </label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  placeholder="1.0.0"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RiCheckLine className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * DeleteToolModal - Confirm tool deletion
 */
const DeleteToolModal = ({ tool, isOpen, onClose, onConfirm }) => {
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
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Content */}
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <RiDeleteBinLine className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Tool?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {tool.name}
                </span>
                ? This action cannot be undone.
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm(tool.id);
                    onClose();
                  }}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
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
 * AddToolModal - Add new tool
 */
const AddToolModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Formatters",
    status: "draft",
    version: "1.0.0",
    icon: "🔧",
  });

  const icons = ["🔧", "🎯", "🎨", "🚀", "⚡", "📝", "🔒", "📊", "🧪", "💡"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTool = {
      id: Date.now(),
      ...formData,
      author: "Admin",
      rating: 0,
      downloads: 0,
      lastUpdated: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      features: [],
    };
    onAdd(newTool);
    setFormData({
      name: "",
      description: "",
      category: "Formatters",
      status: "draft",
      version: "1.0.0",
      icon: "🔧",
    });
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
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-500/10">
                  <RiAddLine className="w-5 h-5 text-violet-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Tool
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`w-10 h-10 text-xl rounded-lg flex items-center justify-center transition-all ${
                        formData.icon === icon
                          ? "bg-violet-500 scale-110"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tool Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-colors"
                  placeholder="Enter tool name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
                  placeholder="Brief description of the tool"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  >
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Version
                </label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none transition-colors"
                  placeholder="1.0.0"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RiAddLine className="w-4 h-4" />
                  Add Tool
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AdminTools = () => {
  // State
  const [tools, setTools] = useState(initialToolsData);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Handlers
  const handleView = (tool) => {
    setSelectedTool(tool);
    setIsViewModalOpen(true);
  };

  const handleEdit = (tool) => {
    setSelectedTool(tool);
    setIsEditModalOpen(true);
  };

  const handleDelete = (tool) => {
    setSelectedTool(tool);
    setIsDeleteModalOpen(true);
  };

  const handleSaveTool = (updatedTool) => {
    setTools((prev) =>
      prev.map((t) => (t.id === updatedTool.id ? updatedTool : t))
    );
  };

  const handleConfirmDelete = (toolId) => {
    setTools((prev) => prev.filter((t) => t.id !== toolId));
  };

  const handleAddTool = (newTool) => {
    setTools((prev) => [newTool, ...prev]);
  };

  return (
    <>
      <motion.div variants={itemVariants}>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-500/10">
              <RiToolsFill className="w-6 h-6 text-violet-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tools Management
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {tools.length} tools published
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl text-sm font-medium hover:bg-violet-600 transition-colors"
          >
            <RiAddLine className="w-4 h-4" />
            <span>Add Tool</span>
          </motion.button>
        </div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4"
        >
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Modals */}
      <ViewToolModal
        tool={selectedTool}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
      <EditToolModal
        tool={selectedTool}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveTool}
      />
      <DeleteToolModal
        tool={selectedTool}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <AddToolModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTool}
      />
    </>
  );
};

export default AdminTools;
