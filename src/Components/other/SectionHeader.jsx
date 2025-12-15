/**
 * SectionHeader Component
 *
 * @description Reusable section header with gradient title and subtitle.
 * Includes scroll-triggered fade-in animations.
 *
 * @component
 * @param {string} title - Main heading text (rendered with gradient)
 * @param {string} subtitle - Optional subtitle text
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import { motion } from "framer-motion";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="text-center mb-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl mobile:text-5xl tablet:text-6xl font-bold mb-6"
      >
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
