import { motion } from "framer-motion";
import {
  FiSearch,
  FiPlus,
  FiSettings,
  FiTrash2,
  FiEye,
  FiTrendingUp,
} from "react-icons/fi";
import { useState } from "react";

const ToolsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tools = [
    {
      id: 1,
      name: "Calculator",
      category: "Math",
      usage: "5.2K",
      status: "Active",
      icon: "🧮",
    },
    {
      id: 2,
      name: "Unit Converter",
      category: "Conversion",
      usage: "3.8K",
      status: "Active",
      icon: "🔄",
    },
    {
      id: 3,
      name: "Date Calculator",
      category: "Time",
      usage: "2.1K",
      status: "Active",
      icon: "📅",
    },
    {
      id: 4,
      name: "Password Generator",
      category: "Security",
      usage: "4.5K",
      status: "Active",
      icon: "🔐",
    },
    {
      id: 5,
      name: "QR Code Generator",
      category: "Utility",
      usage: "1.9K",
      status: "Maintenance",
      icon: "📱",
    },
    {
      id: 6,
      name: "Color Picker",
      category: "Design",
      usage: "3.2K",
      status: "Active",
      icon: "🎨",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Tools Management
          </h1>
          <p className="text-[#9CA3AF]">
            Manage all available tools on DevToolsB
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="gradient-bg text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg transition-shadow w-fit"
        >
          <FiPlus size={20} />
          Add New Tool
        </motion.button>
      </div>

      {/* Search Bar */}
      <div
        className="rounded-2xl p-6 border border-white/10"
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
          <FiSearch size={20} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-[#E0E6F0] placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl p-6 border border-white/10"
            style={{
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Tool Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{tool.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{tool.name}</h3>
                  <p className="text-xs text-[#9CA3AF]">{tool.category}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  tool.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {tool.status}
              </span>
            </div>

            {/* Usage Stats */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-white/5 rounded-lg">
              <FiTrendingUp size={16} className="text-green-400" />
              <span className="text-sm font-semibold">{tool.usage}</span>
              <span className="text-xs text-[#9CA3AF]">total uses</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-lg flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <FiEye size={16} />
                <span className="text-sm font-medium">View</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-lg flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <FiSettings size={16} />
                <span className="text-sm font-medium">Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/20 transition-colors"
              >
                <FiTrash2 size={16} className="text-red-400" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolsManagement;
