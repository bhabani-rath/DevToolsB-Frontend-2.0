// hooks/useMousePosition.js
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useCallback } from "react";

const useMousePosition = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return { cursorX: springX, cursorY: springY };
};

export default useMousePosition;
