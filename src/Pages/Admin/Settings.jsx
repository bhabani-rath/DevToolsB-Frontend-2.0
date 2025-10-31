import { motion } from "framer-motion";
import { FiUser, FiBell, FiShield, FiGlobe, FiSave } from "react-icons/fi";
import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "DevToolsB",
    siteUrl: "https://devtoolsb.com",
    adminEmail: "admin@devtoolsb.com",
    notifications: true,
    emailAlerts: false,
    twoFactor: true,
    maintenanceMode: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const settingSections = [
    {
      title: "General Settings",
      icon: FiGlobe,
      fields: [
        { label: "Site Name", key: "siteName", type: "text" },
        { label: "Site URL", key: "siteUrl", type: "text" },
        { label: "Admin Email", key: "adminEmail", type: "email" },
      ],
    },
    {
      title: "Notifications",
      icon: FiBell,
      fields: [
        { label: "Push Notifications", key: "notifications", type: "toggle" },
        { label: "Email Alerts", key: "emailAlerts", type: "toggle" },
      ],
    },
    {
      title: "Security",
      icon: FiShield,
      fields: [
        {
          label: "Two-Factor Authentication",
          key: "twoFactor",
          type: "toggle",
        },
        { label: "Maintenance Mode", key: "maintenanceMode", type: "toggle" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
          <p className="text-[#9CA3AF]">Configure your DevToolsB admin panel</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="gradient-bg text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg transition-shadow"
        >
          <FiSave size={20} />
          Save Changes
        </motion.button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="rounded-2xl p-6 border border-white/10"
              style={{
                backgroundColor: "rgba(17, 24, 39, 0.8)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Icon size={24} className="text-blue-400" />
                </div>
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    {field.type === "toggle" ? (
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <label className="font-medium">{field.label}</label>
                        <button
                          onClick={() => handleToggle(field.key)}
                          className={`relative w-14 h-7 rounded-full transition-colors ${
                            settings[field.key] ? "bg-green-500" : "bg-gray-600"
                          }`}
                        >
                          <motion.div
                            className="absolute top-1 w-5 h-5 bg-white rounded-full"
                            animate={{
                              left: settings[field.key] ? "32px" : "4px",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          value={settings[field.key]}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              [field.key]: e.target.value,
                            }))
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#E0E6F0] placeholder:text-[#9CA3AF] focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl p-6 border border-red-500/20"
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-sm text-[#9CA3AF] mb-4">
          These actions are irreversible. Please be certain before proceeding.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-xl border border-red-500/30 transition-colors"
          >
            Reset All Settings
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-xl border border-red-500/30 transition-colors"
          >
            Delete All Data
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
