import { FiMenu, FiBell, FiSearch, FiSun, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <header
      className="backdrop-blur-xl border-b border-white/10 sticky top-0 z-30"
      style={{ backgroundColor: "rgba(17, 24, 39, 0.8)" }}
    >
      <div className="flex items-center justify-between p-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <FiMenu size={24} />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/10 min-w-[300px]">
            <FiSearch size={18} className="text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none flex-1 text-sm text-[#E0E6F0] placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Back to Home */}
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              title="Back to Home"
            >
              <FiHome size={20} />
            </motion.button>
          </Link>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <FiSun size={20} />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#22C55E] rounded-full"></span>
          </motion.button>

          {/* User Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center font-bold cursor-pointer"
          >
            AD
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
