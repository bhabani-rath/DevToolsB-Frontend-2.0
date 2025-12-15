/**
 * DeveloperProfile Component - Profile settings for developers
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RiUserLine,
  RiMailLine,
  RiGlobalLine,
  RiGithubLine,
  RiTwitterXLine,
  RiLinkedinLine,
  RiEditLine,
  RiSaveLine,
  RiImageAddLine,
  RiShieldCheckLine,
  RiNotification3Line,
  RiLockLine,
} from "react-icons/ri";

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

const DeveloperProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Developer User",
    email: "developer@devtoolsb.com",
    bio: "Passionate developer creating useful tools for the community. Specialized in React, Node.js, and cloud technologies.",
    website: "https://devtoolsb.com",
    github: "devuser",
    twitter: "devuser",
    linkedin: "devuser",
  });

  const [notifications, setNotifications] = useState({
    emailDownloads: true,
    emailReviews: true,
    emailUpdates: false,
    pushDownloads: true,
    pushReviews: true,
  });

  const handleSave = () => {
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl"
    >
      {/* Header */}
      <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your developer profile and preferences
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`flex items-center gap-2 px-4 py-2 ${
            isEditing
              ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          } rounded-xl text-sm font-medium transition-colors`}
        >
          {isEditing ? (
            <>
              <RiSaveLine className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <RiEditLine className="w-4 h-4" />
              <span>Edit Profile</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Profile Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-purple-600 to-violet-600 relative">
          {isEditing && (
            <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
              <RiImageAddLine className="w-5 h-5" />
            </button>
          )}
        </div>
        {/* Avatar & Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col tablet:flex-row tablet:items-end gap-4 -mt-12">
            <div className="relative">
              <img
                src="https://ui-avatars.com/api/?name=Developer+User&background=8b5cf6&color=fff&size=128"
                alt="Avatar"
                className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-900 shadow-lg"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-1.5 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors">
                  <RiImageAddLine className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {profile.name}
                </h2>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                  <RiShieldCheckLine className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <RiUserLine className="w-5 h-5 text-purple-500" />
          Personal Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                disabled={!isEditing}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <RiGlobalLine className="w-5 h-5 text-purple-500" />
          Social Links
        </h3>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
          {[
            {
              icon: RiGlobalLine,
              label: "Website",
              key: "website",
              prefix: "",
            },
            {
              icon: RiGithubLine,
              label: "GitHub",
              key: "github",
              prefix: "github.com/",
            },
            {
              icon: RiTwitterXLine,
              label: "Twitter",
              key: "twitter",
              prefix: "twitter.com/",
            },
            {
              icon: RiLinkedinLine,
              label: "LinkedIn",
              key: "linkedin",
              prefix: "linkedin.com/in/",
            },
          ].map((social) => (
            <div key={social.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {social.label}
              </label>
              <div className="relative">
                <social.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={profile[social.key]}
                  onChange={(e) =>
                    setProfile({ ...profile, [social.key]: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <RiNotification3Line className="w-5 h-5 text-purple-500" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "emailDownloads",
              label: "Download notifications",
              desc: "Get notified when someone downloads your tool",
            },
            {
              key: "emailReviews",
              label: "Review notifications",
              desc: "Get notified when you receive a new review",
            },
            {
              key: "emailUpdates",
              label: "Platform updates",
              desc: "Stay updated with platform news and features",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    [item.key]: !notifications[item.key],
                  })
                }
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key]
                    ? "bg-purple-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <motion.div
                  animate={{ x: notifications[item.key] ? 24 : 2 }}
                  className="w-5 h-5 bg-white rounded-full shadow"
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <RiLockLine className="w-5 h-5 text-purple-500" />
          Security
        </h3>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <RiLockLine className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Change Password
              </span>
            </div>
            <span className="text-xs text-gray-500">
              Last changed 30 days ago
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <RiShieldCheckLine className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Two-Factor Authentication
              </span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-full">
              Enabled
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeveloperProfile;
