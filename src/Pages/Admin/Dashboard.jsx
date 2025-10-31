import { motion } from "framer-motion";
import { FiUsers, FiTool, FiActivity, FiTrendingUp } from "react-icons/fi";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "10,245",
      change: "+12.5%",
      trend: "up",
      icon: FiUsers,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Tools Available",
      value: "54",
      change: "+3",
      trend: "up",
      icon: FiTool,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Sessions",
      value: "1,429",
      change: "-5.2%",
      trend: "down",
      icon: FiActivity,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "Stable",
      trend: "up",
      icon: FiTrendingUp,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const recentActivities = [
    {
      user: "John Doe",
      action: "Added new tool",
      time: "2 mins ago",
      type: "success",
    },
    {
      user: "Jane Smith",
      action: "Updated calculator",
      time: "15 mins ago",
      type: "info",
    },
    {
      user: "Mike Johnson",
      action: "Deleted user",
      time: "1 hour ago",
      type: "warning",
    },
    {
      user: "Sarah Williams",
      action: "System backup completed",
      time: "3 hours ago",
      type: "success",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-[#9CA3AF]">
          Welcome back! Here's what's happening with DevToolsB today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
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
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up"
                      ? "text-green-500"
                      : stat.trend === "down"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <BiUpArrowAlt size={16} />
                  ) : stat.trend === "down" ? (
                    <BiDownArrowAlt size={16} />
                  ) : null}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-[#9CA3AF]">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-2xl p-6 border border-white/10"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-[#9CA3AF]">{activity.action}</p>
                </div>
                <span className="text-xs text-[#9CA3AF]">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-6 border border-white/10"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-shadow"
            >
              Add New Tool
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/5 hover:bg-white/10 font-semibold py-3 rounded-xl border border-white/10 transition-colors"
            >
              Manage Users
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/5 hover:bg-white/10 font-semibold py-3 rounded-xl border border-white/10 transition-colors"
            >
              View Analytics
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white/5 hover:bg-white/10 font-semibold py-3 rounded-xl border border-white/10 transition-colors"
            >
              System Settings
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
