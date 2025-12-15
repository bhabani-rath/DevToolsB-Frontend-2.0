/**
 * FeatureCard Component
 * @description Interactive feature showcase card with hover effects and expandable details
 * @param {object} feature - Feature data object
 * @param {number} index - Card index for animation delays
 * @param {boolean} isActive - Active state
 * @param {function} onHover - Hover callback
 * @author DevToolsB Team
 */

import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles, HiCheckCircle, HiLightningBolt } from "react-icons/hi";

const FeatureCard = ({ feature, index, isActive, onHover }) => {
  return (
    <motion.div
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="group h-full w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className={`
          relative h-[540px] w-full rounded-3xl
          bg-gradient-to-br from-white to-gray-50
          dark:from-gray-800/80 dark:to-gray-900/80
          border border-gray-200/60 dark:border-gray-700/60
          shadow-lg
          overflow-hidden
          backdrop-blur-xl
          transition-all duration-700
          ${isActive ? "scale-[1.02]" : ""}
        `}
        whileHover={{
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <motion.div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-100
            bg-gradient-to-br ${feature.gradient}
            transition-opacity duration-500
          `}
          style={{ filter: "blur(40px)" }}
          animate={isActive ? { opacity: 0.15 } : { opacity: 0 }}
        />

        <motion.div
          className={`
            absolute -inset-0.5 rounded-3xl opacity-0 
            bg-gradient-to-br ${feature.gradient}
            blur-xl group-hover:opacity-20
            transition-opacity duration-700
          `}
          animate={isActive ? { opacity: 0.3 } : {}}
        />

        <div className="relative z-10 h-full flex flex-col p-8">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="relative"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div
                className={`
                  absolute inset-0 rounded-2xl
                  bg-gradient-to-br ${feature.gradient}
                  blur-xl opacity-40 group-hover:opacity-60
                  transition-opacity duration-500
                `}
              />
              <div
                className={`
                  relative w-16 h-16 rounded-2xl
                  bg-gradient-to-br ${feature.gradient}
                  flex items-center justify-center
                  shadow-2xl
                  group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
                  transition-all duration-500
                `}
              >
                <span className="text-3xl text-white drop-shadow-lg">
                  {feature.icon}
                </span>
              </div>
            </motion.div>

            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                px-3 py-1 text-xs font-semibold rounded-full
                bg-gradient-to-r ${feature.gradient}
                text-white shadow-lg
                opacity-0 group-hover:opacity-100
                transition-all duration-500
              `}
            >
              <HiSparkles className="inline w-3 h-3 mr-1" />
              {feature.badge}
            </motion.span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300">
                {feature.title}
              </span>
            </h3>

            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-1">
              <HiLightningBolt className="w-4 h-4" />
              {feature.highlight}
            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {feature.description}
            </p>

            <AnimatePresence>
              {isActive && (
                <motion.p
                  className="text-sm text-gray-500 dark:text-gray-500 mb-6 leading-relaxed"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.longDescription}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              {Object.entries(feature.stats)
                .slice(0, 3)
                .map(([key, value], i) => (
                  <div key={key} className="text-center">
                    <div className="text-base font-bold text-gray-900 dark:text-white">
                      {value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize truncate">
                      {key}
                    </div>
                  </div>
                ))}
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                Tools ({feature.tools.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {feature.tools
                  .slice(0, isActive ? feature.tools.length : 3)
                  .map((tool, toolIndex) => (
                    <motion.span
                      key={toolIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: toolIndex * 0.05 }}
                      className={`
                      px-2.5 py-1 text-xs font-medium rounded-full
                      bg-gray-100 dark:bg-gray-700/50
                      text-gray-700 dark:text-gray-300
                      border border-gray-200 dark:border-gray-600/50
                    `}
                    >
                      {tool}
                    </motion.span>
                  ))}
                {!isActive && feature.tools.length > 3 && (
                  <span className="px-2.5 py-1 text-xs text-gray-500 dark:text-gray-400">
                    +{feature.tools.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <AnimatePresence>
              {isActive && (
                <>
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                      Features
                    </h4>
                    <div className="space-y-1">
                      {feature.features.slice(0, 3).map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"
                        >
                          <HiCheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                      Use Cases
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {feature.useCases.map((useCase, i) => (
                        <span
                          key={i}
                          className="text-xs text-gray-600 dark:text-gray-400"
                        >
                          • {useCase}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}
                />
                Available 24/7
              </span>
              <span>•</span>
              <span>{feature.tools.length} tools included</span>
              <span>•</span>
              <span>Free forever</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`h-full bg-gradient-to-r ${feature.gradient}`} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
