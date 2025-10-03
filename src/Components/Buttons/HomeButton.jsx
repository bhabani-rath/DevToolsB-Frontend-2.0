import { motion } from "framer-motion";

const HomeButton = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group";

  const variants = {
    primary:
      "bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600",
    secondary:
      "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default HomeButton;
