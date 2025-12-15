/**
 * CodePreviewCard Component
 * @description Animated code editor preview with syntax highlighting
 * @author DevToolsB Team
 */

import React from "react";
import { motion } from "framer-motion";

const codeLines = [
  {
    text: "const tools = DevToolsB.init();",
    delay: 0.1,
    color: "text-blue-400",
  },
  { text: "", delay: 0.2, color: "" },
  { text: "tools.generate({", delay: 0.3, color: "text-purple-400" },
  { text: '  type: "password",', delay: 0.4, color: "text-green-400" },
  { text: "  length: 16,", delay: 0.5, color: "text-yellow-400" },
  { text: "  secure: true", delay: 0.6, color: "text-orange-400" },
  { text: "});", delay: 0.7, color: "text-purple-400" },
  { text: "", delay: 0.8, color: "" },
  { text: "// Output: xK9#mP2$nL5@qR8!", delay: 0.9, color: "text-green-400" },
];

const CodePreviewCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative w-full h-[400px] tablet:h-[500px]">
        {/* Code Editor */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Editor Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <motion.div
                  className="w-3 h-3 rounded-full bg-red-500"
                  whileHover={{ scale: 1.2 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full bg-yellow-500"
                  whileHover={{ scale: 1.2 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-500"
                  whileHover={{ scale: 1.2 }}
                />
              </div>
              <span className="text-sm text-gray-400">devtools.js</span>
            </div>
            <motion.div
              className="text-xs text-gray-500 flex items-center gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Live
            </motion.div>
          </div>

          {/* Code Lines */}
          <div className="p-6 font-mono text-sm relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900/20 pointer-events-none" />
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: line.delay }}
                className={`${line.color || "text-gray-300"} leading-relaxed`}
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}
            {/* Typing Cursor */}
            <motion.div
              className="inline-block w-2 h-5 bg-blue-400 ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

export default CodePreviewCard;
