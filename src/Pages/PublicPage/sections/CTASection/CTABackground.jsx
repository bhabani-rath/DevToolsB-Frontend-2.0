/**
 * CTABackground Component
 * @description Animated background with stars and floating orbs for CTA section
 * @author DevToolsB Team
 */

import React from "react";
import { motion } from "framer-motion";

const CTABackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full opacity-20"
          style={{
            width: 50 + Math.random() * 100,
            height: 50 + Math.random() * 100,
            background: `radial-gradient(circle, ${
              [
                "rgba(59, 130, 246, 0.3)",
                "rgba(147, 51, 234, 0.3)",
                "rgba(236, 72, 153, 0.3)",
                "rgba(34, 197, 94, 0.3)",
              ][i % 4]
            } 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            rotate: 360,
          }}
          transition={{
            x: {
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            y: {
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            rotate: {
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      ))}
    </div>
  );
};

export default CTABackground;
