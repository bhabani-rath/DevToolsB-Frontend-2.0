import { motion } from "framer-motion";
import { FiUsers, FiEye, FiMousePointer, FiTrendingUp } from "react-icons/fi";

const Analytics = () => {
  const metrics = [
    {
      label: "Page Views",
      value: "45.2K",
      change: "+12.5%",
      trend: "up",
      icon: FiEye,
    },
    {
      label: "Unique Visitors",
      value: "12.8K",
      change: "+8.2%",
      trend: "up",
      icon: FiUsers,
    },
    {
      label: "Click Rate",
      value: "3.5%",
      change: "-2.1%",
      trend: "down",
      icon: FiMousePointer,
    },
    {
      label: "Engagement",
      value: "68%",
      change: "+5.3%",
      trend: "up",
      icon: FiTrendingUp,
    },
  ];

  const topTools = [
    { name: "Calculator", views: "5.2K", percentage: 85 },
    { name: "Password Generator", views: "4.5K", percentage: 75 },
    { name: "Unit Converter", views: "3.8K", percentage: 65 },
    { name: "Color Picker", views: "3.2K", percentage: 55 },
    { name: "Date Calculator", views: "2.1K", percentage: 45 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Analytics</h1>
        <p className="text-[#9CA3AF]">
          Track your DevToolsB performance and insights
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
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
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Icon size={24} className="text-blue-400" />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    metric.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
              <p className="text-sm text-[#9CA3AF]">{metric.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-6 border border-white/10"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h2 className="text-xl font-bold mb-6">Top Performing Tools</h2>
          <div className="space-y-4">
            {topTools.map((tool, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{tool.name}</span>
                  <span className="text-sm text-[#9CA3AF]">{tool.views}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tool.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full gradient-bg"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic Sources */}
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
          <h2 className="text-xl font-bold mb-6">Traffic Sources</h2>
          <div className="space-y-4">
            {[
              { source: "Direct", value: "45%", color: "bg-blue-500" },
              { source: "Search", value: "30%", color: "bg-purple-500" },
              { source: "Social", value: "15%", color: "bg-pink-500" },
              { source: "Referral", value: "10%", color: "bg-green-500" },
            ].map((source, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{source.source}</span>
                    <span className="text-sm text-[#9CA3AF]">
                      {source.value}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div
                      className={`h-full rounded-full ${source.color}`}
                      style={{ width: source.value }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
