// sections/ToolsSection/ToolCategoryCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeCard from "./../../../../Components/Cards/HomeCard";

const ToolCategoryCard = ({ category, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tools?category=${category.id}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Icon components mapping
  const IconComponent = ({ type }) => {
    const iconMap = {
      calculator: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      converter: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      generator: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      miscellaneous: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
    };

    return iconMap[type] || iconMap.miscellaneous;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onClick={handleClick}
      className="cursor-pointer h-full group"
    >
      <HomeCard className="h-full relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
          initial={false}
        />

        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-full blur-2xl transform translate-x-16 -translate-y-16`}
          />
        </div>

        <div className="relative p-6 flex flex-col h-full">
          {/* Icon Container with geometric pattern */}
          <div className="flex items-start justify-between mb-5">
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Background layers for depth */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl blur-sm opacity-50`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl transform scale-105 opacity-20 group-hover:scale-110 transition-transform duration-300`}
              />

              {/* Main icon container */}
              <div
                className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                <IconComponent type={category.iconType} />

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 rounded-2xl"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>

            {/* Tool Count Badge with pulse effect */}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`relative px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r ${category.gradient} text-white shadow-md overflow-hidden`}
            >
              <span className="relative z-10">
                {category.count} {category.count === 1 ? "Tool" : "Tools"}
              </span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </div>

          {/* Category Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Features List */}
          <div className="flex-grow mb-5">
            <ul className="space-y-2.5">
              {category.features.slice(0, 4).map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2.5 group/item"
                >
                  <div
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 rounded-md bg-gradient-to-br ${category.gradient} flex items-center justify-center`}
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="leading-tight group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Attractive CTA Button */}
          <div className="mt-auto pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full relative overflow-hidden rounded-xl px-6 py-3.5 bg-gradient-to-r ${category.gradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-30"
                initial={{ x: "-100%", skewX: -20 }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                <span>Explore {category.name}</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </span>

              {/* Pulse effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{
                  scale: 1.1,
                  opacity: [0, 0.2, 0],
                }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{
                  background: `linear-gradient(to right, ${category.gradient})`,
                  filter: "blur(8px)",
                }}
              />
            </motion.button>
          </div>
        </div>

        {/* Focus ring for accessibility */}
        <div className="absolute inset-0 rounded-xl ring-2 ring-blue-500 ring-opacity-0 group-focus-within:ring-opacity-50 transition-all pointer-events-none" />
      </HomeCard>
    </motion.div>
  );
};

export default ToolCategoryCard;
