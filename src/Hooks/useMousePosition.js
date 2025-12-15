/**
 * useMousePosition Hook
 *
 * @description Custom React hook that tracks mouse cursor position with smooth spring animations.
 * Uses Framer Motion's useMotionValue and useSpring for fluid cursor following effects.
 *
 * @hook
 * @features
 * - Real-time mouse position tracking
 * - Smooth spring animations (stiffness: 200, damping: 20)
 * - Optimized with useCallback for performance
 * - Auto cleanup on unmount
 *
 * @returns {Object} Animated cursor positions
 * @returns {MotionValue} cursorX - Smoothly animated X coordinate
 * @returns {MotionValue} cursorY - Smoothly animated Y coordinate
 *
 * @author DevToolsB Team
 * @version 1.0.0
 *
 * @example
 * const { cursorX, cursorY } = useMousePosition();
 * // Use in Framer Motion style={{ x: cursorX, y: cursorY }}
 */

import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useCallback } from "react";

const useMousePosition = () => {
  // Motion values for raw cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring animations for smooth cursor movement
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  /**
   * Mouse move event handler
   * Updates cursor position motion values
   * @param {MouseEvent} e - Mouse event object
   */
  const handleMouseMove = useCallback(
    (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  /**
   * Effect: Setup and cleanup mouse move listener
   */
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return { cursorX: springX, cursorY: springY };
};

export default useMousePosition;
