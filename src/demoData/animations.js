/**
 * Animation Variants - Framer Motion Presets
 *
 * @description Reusable animation configurations for Framer Motion components.
 * Provides consistent entrance animations across the application.
 *
 * @module animations
 * @author DevToolsB Team
 * @version 1.0.0
 */

// Fade in from bottom with slide up effect
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// Fade in from left with slide right effect
export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

// Fade in from right with slide left effect
export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

// Scale in with fade effect (zoom in)
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

// Stagger children animation (for lists/groups)
// Animates child elements with 0.1s delay between each
export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
