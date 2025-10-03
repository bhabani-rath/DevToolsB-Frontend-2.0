// sections/AboutSection/AboutContent.jsx
import { motion } from "framer-motion";
import AboutFeatureList from "./AboutFeatureList";

const AboutContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl mobile:text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
        Built for Developers, by Developers
      </h3>
      <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
        <p>
          DevToolsB is more than just a collection of tools—it's a comprehensive
          ecosystem designed to enhance your development workflow.
        </p>
        <p>
          From quick calculations to complex code generation, we provide the
          utilities you need to build faster and smarter.
        </p>
      </div>
      <AboutFeatureList />
    </motion.div>
  );
};

export default AboutContent;
