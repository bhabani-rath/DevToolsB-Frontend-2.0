/**
 * UserProfile Component - User settings and preferences
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  RiUserLine,
  RiMailLine,
  RiNotification3Line,
  RiLockLine,
  RiEditLine,
  RiSaveLine,
  RiShieldCheckLine,
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

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@devtoolsb.com",
    bio: "Developer tools enthusiast. Love exploring new productivity tools.",
  });

  const [notifications, setNotifications] = useState({
    newTools: true,
    updates: true,
    recommendations: false,
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
            Manage your account and preferences
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`flex items-center gap-2 px-4 py-2 ${
            isEditing
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          } rounded-xl text-sm font-medium`}
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
        <div className="h-32 bg-gradient-to-r from-gray-700 to-gray-900 relative" />
        <div className="px-6 pb-6">
          <div className="flex flex-col tablet:flex-row tablet:items-end gap-4 -mt-12">
            <div className="relative">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=374151&color=fff&size=128"
                alt="Avatar"
                className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-900 shadow-lg"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {profile.name}
                </h2>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                  <RiShieldCheckLine className="w-3 h-3" />
                  Member
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
          <RiUserLine className="w-5 h-5 text-gray-500" />
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
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
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
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
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
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-900/10 resize-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <RiNotification3Line className="w-5 h-5 text-gray-500" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "newTools",
              label: "New tools",
              desc: "Get notified when new tools are added",
            },
            {
              key: "updates",
              label: "Tool updates",
              desc: "Get notified when your favorite tools get updates",
            },
            {
              key: "recommendations",
              label: "Recommendations",
              desc: "Receive personalized tool recommendations",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500">{item.desc}</p>
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
                    ? "bg-gray-900 dark:bg-white"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <motion.div
                  animate={{ x: notifications[item.key] ? 24 : 2 }}
                  className="w-5 h-5 bg-white dark:bg-gray-900 rounded-full shadow"
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
          <RiLockLine className="w-5 h-5 text-gray-500" />
          Security
        </h3>
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
