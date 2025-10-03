// sections/AboutSection/AboutFeatureList.jsx
import React from "react";
import { motion } from "framer-motion";

const features = [
  { text: "Lightning-fast performance", icon: "⚡" },
  { text: "Privacy-focused (no data tracking)", icon: "🔒" },
  { text: "Works offline", icon: "📱" },
  { text: "Regular updates with new tools", icon: "🔄" },
];

const AboutFeatureList = () => {
  return (
    <div className="mt-8 space-y-4">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 group"
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            whileHover={{ scale: 1.1, rotate: 360 }}
          >
            <span className="text-lg">{feature.icon}</span>
          </motion.div>
          <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {feature.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default AboutFeatureList;
