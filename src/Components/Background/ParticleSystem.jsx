// components/background/ParticleSystem.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";

const ParticleSystem = ({ cursorX, cursorY, isDarkMode }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x:
        Math.random() *
        (typeof window !== "undefined" ? window.innerWidth : 1200),
      y:
        Math.random() *
        (typeof window !== "undefined" ? window.innerHeight : 800),
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            isDarkMode ? "bg-white" : "bg-gray-600"
          }`}
          style={{
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            x: [0, Math.sin(Date.now() * 0.001 + particle.id) * 50],
            y: [0, Math.cos(Date.now() * 0.001 + particle.id) * 50],
          }}
          transition={{
            duration: 10 + particle.id * 0.1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;
