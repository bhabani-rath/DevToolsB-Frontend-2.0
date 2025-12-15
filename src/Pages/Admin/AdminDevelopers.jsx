/**
 * AdminDevelopers Component
 *
 * @description Developers management section with profile cards and modals.
 * Features developer grid with View Profile and Edit functionality.
 *
 * @component
 * @author DevToolsB Team
 * @version 2.0.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiCodeSSlashFill,
  RiCheckboxCircleFill,
  RiMoreFill,
  RiGithubFill,
  RiLinkedinFill,
  RiCloseLine,
  RiEditLine,
  RiCheckLine,
  RiArrowRightLine,
  RiDeleteBinLine,
  RiAddLine,
  RiStarFill,
  RiUserAddLine,
} from "react-icons/ri";

// ============================================================================
// MOCK DATA
// ============================================================================

const initialDevelopersData = [
  {
    id: 1,
    name: "Alex Rodriguez",
    username: "@alexdev",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Rodriguez&background=6366f1&color=fff",
    bio: "Full-stack developer passionate about creating tools that make developers' lives easier.",
    tools: 24,
    stars: 1847,
    followers: 523,
    verified: true,
    github: "alexdev",
    linkedin: "alexrodriguez",
    email: "alex.r@email.com",
    location: "San Francisco, CA",
    website: "https://alexdev.io",
  },
  {
    id: 2,
    name: "Priya Sharma",
    username: "@priyacodes",
    avatar:
      "https://ui-avatars.com/api/?name=Priya+Sharma&background=ec4899&color=fff",
    bio: "Frontend specialist with expertise in React and TypeScript tooling.",
    tools: 18,
    stars: 2341,
    followers: 712,
    verified: true,
    github: "priyacodes",
    linkedin: "priyasharma",
    email: "priya.s@email.com",
    location: "Mumbai, India",
    website: "https://priyacodes.dev",
  },
  {
    id: 3,
    name: "David Kim",
    username: "@davidbuilds",
    avatar:
      "https://ui-avatars.com/api/?name=David+Kim&background=14b8a6&color=fff",
    bio: "Backend engineer focused on API development and testing tools.",
    tools: 31,
    stars: 3102,
    followers: 891,
    verified: true,
    github: "davidbuilds",
    linkedin: "davidkim",
    email: "david.k@email.com",
    location: "Seoul, South Korea",
    website: "https://davidbuilds.io",
  },
  {
    id: 4,
    name: "Emma Thompson",
    username: "@emmadev",
    avatar:
      "https://ui-avatars.com/api/?name=Emma+Thompson&background=f97316&color=fff",
    bio: "DevOps enthusiast creating automation and deployment tools.",
    tools: 15,
    stars: 987,
    followers: 345,
    verified: false,
    github: "emmadev",
    linkedin: "emmathompson",
    email: "emma.t@email.com",
    location: "London, UK",
    website: "https://emmadev.co.uk",
  },
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
 * DeveloperCard Component - Developer profile card
 */
const DeveloperCard = ({ developer, onViewProfile, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={developer.avatar}
              alt={developer.name}
              className="w-14 h-14 rounded-full"
            />
            {developer.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <RiCheckboxCircleFill className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {developer.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {developer.username}
            </p>
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

          {/* Dropdown Menu */}
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
                    onEdit(developer);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <RiEditLine className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(developer);
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

      {/* Bio */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {developer.bio}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-4 py-4 border-y border-gray-100 dark:border-gray-800">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {developer.tools}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Tools</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {developer.stars.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Stars</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {developer.followers}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
        </div>
      </div>

      {/* Social links & Actions */}
      <div className="flex items-center gap-3">
        <motion.a
          href={`https://github.com/${developer.github}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <RiGithubFill className="w-5 h-5" />
        </motion.a>
        <motion.a
          href={`https://linkedin.com/in/${developer.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <RiLinkedinFill className="w-5 h-5" />
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewProfile(developer)}
          className="flex-1 py-2 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          View Profile
        </motion.button>
      </div>
    </motion.div>
  );
};

/**
 * ViewDeveloperModal - Display developer profile details
 */
const ViewDeveloperModal = ({ developer, isOpen, onClose }) => {
  if (!developer) return null;

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
            <div className="relative p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <img
                    src={developer.avatar}
                    alt={developer.name}
                    className="w-24 h-24 rounded-full border-4 border-white/30 mb-4"
                  />
                  {developer.verified && (
                    <div className="absolute bottom-4 right-0 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <RiCheckboxCircleFill className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white">
                  {developer.name}
                </h2>
                <p className="text-indigo-100">{developer.username}</p>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center justify-around py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {developer.tools}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tools
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <RiStarFill className="w-5 h-5 text-amber-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {developer.stars.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Stars
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {developer.followers}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Followers
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Bio
                </p>
                <p className="text-gray-900 dark:text-white">{developer.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {developer.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {developer.location}
                  </p>
                </div>
              </div>

              {developer.website && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Website
                  </p>
                  <a
                    href={developer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {developer.website}
                  </a>
                </div>
              )}

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-4">
                <motion.a
                  href={`https://github.com/${developer.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <RiGithubFill className="w-5 h-5" />
                  GitHub
                </motion.a>
                <motion.a
                  href={`https://linkedin.com/in/${developer.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <RiLinkedinFill className="w-5 h-5" />
                  LinkedIn
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * EditDeveloperModal - Edit developer details
 */
const EditDeveloperModal = ({ developer, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    email: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    verified: false,
  });

  React.useEffect(() => {
    if (developer) {
      setFormData({
        name: developer.name || "",
        username: developer.username || "",
        bio: developer.bio || "",
        email: developer.email || "",
        location: developer.location || "",
        website: developer.website || "",
        github: developer.github || "",
        linkedin: developer.linkedin || "",
        verified: developer.verified || false,
      });
    }
  }, [developer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...developer, ...formData });
    onClose();
  };

  if (!developer) return null;

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
            className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10">
                  <RiEditLine className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit Developer
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-indigo-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-indigo-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-indigo-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-indigo-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-indigo-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-indigo-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-indigo-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn Username
                  </label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-indigo-500 rounded-xl text-gray-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="verified"
                  checked={formData.verified}
                  onChange={(e) =>
                    setFormData({ ...formData, verified: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
                />
                <label
                  htmlFor="verified"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Verified Developer
                </label>
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
                  className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
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
 * DeleteDeveloperModal - Confirm developer deletion
 */
const DeleteDeveloperModal = ({ developer, isOpen, onClose, onConfirm }) => {
  if (!developer) return null;

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
                Delete Developer?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to remove{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {developer.name}
                </span>
                ? This will also remove all their tools.
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
                    onConfirm(developer.id);
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AdminDevelopers = () => {
  // State
  const [developers, setDevelopers] = useState(initialDevelopersData);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handlers
  const handleViewProfile = (developer) => {
    setSelectedDeveloper(developer);
    setIsViewModalOpen(true);
  };

  const handleEdit = (developer) => {
    setSelectedDeveloper(developer);
    setIsEditModalOpen(true);
  };

  const handleDelete = (developer) => {
    setSelectedDeveloper(developer);
    setIsDeleteModalOpen(true);
  };

  const handleSaveDeveloper = (updatedDeveloper) => {
    setDevelopers((prev) =>
      prev.map((d) => (d.id === updatedDeveloper.id ? updatedDeveloper : d))
    );
  };

  const handleConfirmDelete = (developerId) => {
    setDevelopers((prev) => prev.filter((d) => d.id !== developerId));
  };

  return (
    <>
      <motion.div variants={itemVariants}>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10">
              <RiCodeSSlashFill className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top Developers
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {developers.length} featured contributors
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors flex items-center gap-1"
          >
            View all
            <RiArrowRightLine className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Developers Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-4"
        >
          {developers.map((developer) => (
            <DeveloperCard
              key={developer.id}
              developer={developer}
              onViewProfile={handleViewProfile}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Modals */}
      <ViewDeveloperModal
        developer={selectedDeveloper}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
      <EditDeveloperModal
        developer={selectedDeveloper}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveDeveloper}
      />
      <DeleteDeveloperModal
        developer={selectedDeveloper}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default AdminDevelopers;
