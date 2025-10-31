import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdBuild,
  MdBarChart,
  MdSettings,
  MdClose,
} from "react-icons/md";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: MdDashboard, path: "/admin" },
    { id: "users", label: "Users", icon: MdPeople, path: "/admin/users" },
    { id: "tools", label: "Tools", icon: MdBuild, path: "/admin/tools" },
    {
      id: "analytics",
      label: "Analytics",
      icon: MdBarChart,
      path: "/admin/analytics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: MdSettings,
      path: "/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        className={`fixed left-0 top-0 h-screen w-64 z-50 transition-transform duration-300 p-6 border-r border-white/10 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-white transition-colors"
        >
          <MdClose size={24} />
        </button>

        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold gradient-text mb-1">DevToolsB</h1>
          <p className="text-xs text-[#9CA3AF]">
            One Stop for Daily Calculations
          </p>
          <div className="mt-2 px-2 py-1 rounded-lg inline-block bg-blue-500/20">
            <span className="text-xs font-semibold gradient-text">
              v2.0 Admin
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => {
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? "gradient-bg text-white shadow-lg shadow-purple-500/30"
                      : "text-[#9CA3AF] hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center font-bold">
                AD
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Admin User</p>
                <p className="text-xs text-[#9CA3AF]">admin@devtoolsb.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
