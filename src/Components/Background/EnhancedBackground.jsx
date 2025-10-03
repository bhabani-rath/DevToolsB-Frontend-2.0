// components/background/EnhancedBackground.jsx
import React from "react";
import { motion, useTransform } from "framer-motion";

const EnhancedBackground = ({ isDarkMode, scrollY }) => {
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]);
  const backgroundRotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDarkMode
            ? "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.8) 0%, rgba(2, 6, 23, 0.9) 100%)"
            : "radial-gradient(ellipse at center, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)",
          y: backgroundY,
        }}
      />

      {/* Animated Geometric Shapes */}
      <motion.div
        className="absolute inset-0"
        style={{ rotate: backgroundRotate }}
      >
        {/* Large Orbiting Circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: 100 + i * 50,
              height: 100 + i * 50,
              background: `conic-gradient(from ${i * 45}deg, ${
                isDarkMode
                  ? "rgba(59, 130, 246, 0.3)"
                  : "rgba(59, 130, 246, 0.1)"
              }, transparent, ${
                isDarkMode
                  ? "rgba(147, 51, 234, 0.3)"
                  : "rgba(147, 51, 234, 0.1)"
              })`,
              left: `${20 + i * 10}%`,
              top: `${20 + i * 5}%`,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating Geometric Shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className={`absolute opacity-5 ${
              i % 3 === 0 ? "rounded-full" : i % 3 === 1 ? "rounded-lg" : ""
            }`}
            style={{
              width: 20 + Math.random() * 60,
              height: 20 + Math.random() * 60,
              background: `linear-gradient(${Math.random() * 360}deg, ${
                isDarkMode
                  ? "rgba(139, 92, 246, 0.2)"
                  : "rgba(139, 92, 246, 0.1)"
              }, ${
                isDarkMode
                  ? "rgba(236, 72, 153, 0.2)"
                  : "rgba(236, 72, 153, 0.1)"
              })`,
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
                duration: 15 + Math.random() * 10,
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
      </motion.div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${
            isDarkMode ? "ffffff" : "000000"
          }' fill-opacity='0.1'%3E%3Cpath d='M50 50L50 100M0 50L100 50' stroke='%23${
            isDarkMode ? "ffffff" : "000000"
          }' stroke-width='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default EnhancedBackground;
