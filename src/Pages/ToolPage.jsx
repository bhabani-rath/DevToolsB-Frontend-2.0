/**
 * ToolPage - Dynamic tool loader that renders the correct tool based on URL slug
 */

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDarkMode } from "../Context/ThemeContext";
import ToolsNavbar from "../Components/Navbar/ToolsNavbar";
import Footer from "../Components/FooterBar/Footer";

// Import all calculators
import TipCalculator from "../Tools/Calculators/TipCalculator/TipCalculator";
import DiscountCalculator from "../Tools/Calculators/DiscountCalculator/DiscountCalculator";
import BMICalculator from "../Tools/Calculators/BMICalculator/BMICalculator";
import PercentageCalculator from "../Tools/Calculators/PercentageCalculator/PercentageCalculator";

// Tool mapping
const toolComponents = {
  "tip-calculator": TipCalculator,
  "discount-calculator": DiscountCalculator,
  "bmi-calculator": BMICalculator,
  "percentage-calculator": PercentageCalculator,
  // Add more as they're built
};

const ToolPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const ToolComponent = toolComponents[slug];

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ToolsNavbar />

        <div className="pt-20">
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Tool Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We couldn't find the tool "{slug}"
                </p>
                <button
                  onClick={() => navigate("/tools")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Browse All Tools
                </button>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ToolPage;
