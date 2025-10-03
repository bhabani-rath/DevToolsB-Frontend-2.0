// Pages/PublicPage/ToolsPage.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ToolsFilter from "./ToolsFilter";
import { toolsData, toolCategories } from "../../../../demoData/toolsData";
import { useDarkMode } from "../../../../Context/ThemeContext";
import Navbar from "./../../../../Components/Navbar/Navbar";
import Footer from "./../../../../Components/FooterBar/Footer";
import ToolCard from "./ToolCard";

const ToolsPage = () => {
  const { isDarkMode } = useDarkMode();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [hoveredTool, setHoveredTool] = useState(null);

  // Update active category when URL changes
  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const filteredTools =
    activeCategory === "all"
      ? toolsData
      : toolsData.filter((tool) => tool.category === activeCategory);

  // Extended categories for the filter (including "All")
  const filterCategories = [
    { id: "all", name: "All Tools", icon: "🛠️" },
    ...toolCategories,
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900">
        <Navbar />

        <div className="pt-20 pb-10 px-4 mobile:px-6 tablet:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl mobile:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {activeCategory === "all"
                    ? "All Developer Tools"
                    : `${
                        toolCategories.find((cat) => cat.id === activeCategory)
                          ?.name || "Tools"
                      }`}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {activeCategory === "all"
                  ? "Browse our complete collection of developer utilities"
                  : toolCategories.find((cat) => cat.id === activeCategory)
                      ?.description}
              </p>
            </motion.div>

            {/* Filter Buttons */}
            <ToolsFilter
              categories={filterCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Tools Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6 mt-12"
            >
              {filteredTools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  index={index}
                  isHovered={hoveredTool === tool.id}
                  onHover={setHoveredTool}
                />
              ))}
            </motion.div>

            {/* No Results */}
            {filteredTools.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-500 dark:text-gray-400">
                  No tools found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ToolsPage;
