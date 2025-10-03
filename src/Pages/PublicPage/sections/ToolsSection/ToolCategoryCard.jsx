// sections/ToolsSection/ToolCategoryCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeCard from './../../../../Components/Cards/HomeCard';

const ToolCategoryCard = ({ category, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to tools page with category filter
    navigate(`/tools?category=${category.id}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
      className="cursor-pointer h-full"
    >
      <HomeCard className="h-full p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group">
        {/* Gradient Background on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}
        />

        {/* Category Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
        >
          <span className="text-3xl">{category.icon}</span>
        </motion.div>

        {/* Category Info */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {category.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
          {category.description}
        </p>

        {/* Tool Count Badge */}
        <div className="flex justify-center mb-4">
          <span
            className={`px-3 py-1 text-sm rounded-full bg-gradient-to-r ${category.gradient} text-white font-medium shadow-md`}
          >
            {category.count} Tools
          </span>
        </div>

        {/* Features Preview */}
        <div className="space-y-1">
          {category.features.map((feature, idx) => (
            <div
              key={idx}
              className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1"
            >
              <span className="text-blue-500">•</span>
              {feature}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span
            className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}
          >
            Explore {category.name}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </motion.div>
      </HomeCard>
    </motion.div>
  );
};

export default ToolCategoryCard;
