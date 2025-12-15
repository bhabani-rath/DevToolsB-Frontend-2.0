/**
 * HomeCard Component
 *
 * @description Reusable card wrapper with scroll-triggered entrance animations
 * and optional hover effects.
 *
 * @component
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hoverable - Enable hover lift effect (default: true)
 * @param {number} delay - Animation delay in seconds
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import { motion } from "framer-motion";

const HomeCard = ({
  children,
  className = "",
  hoverable = true,
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={hoverable ? { y: -5, scale: 1.02 } : {}}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
                  border border-gray-100 dark:border-gray-700 
                  transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default HomeCard;
