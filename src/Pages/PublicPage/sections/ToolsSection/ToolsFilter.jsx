// sections/ToolsSection/ToolsFilter.jsx
import { motion } from "framer-motion";

const ToolsFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
            activeCategory === category.id
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <span className="flex items-center gap-2">
            {category.icon && <span>{category.icon}</span>}
            {category.name}
            {category.count && (
              <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 dark:bg-gray-700/20 rounded-full">
                {category.count}
              </span>
            )}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default ToolsFilter;
