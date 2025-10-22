// pages/NotFound.jsx or pages/404.jsx
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-white to-gray-50 
      dark:from-gray-900 dark:to-gray-800 
      relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl w-full"
      >
        <div
          className="relative 
          bg-white/80 dark:bg-gray-900/80 
          backdrop-blur-xl rounded-3xl p-8 tablet:p-12 
          border border-gray-200 dark:border-gray-800/50 
          shadow-2xl"
        >
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-10 right-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <div className="absolute bottom-20 left-10 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse delay-300" />
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-500 rounded-full animate-pulse delay-700" />
          </div>

          <div className="text-center space-y-6">
            {/* Animated 404 */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-9xl tablet:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-pink-600 to-purple-600 dark:from-violet-400 dark:via-pink-500 dark:to-purple-500 leading-none">
                404
              </h1>
            </motion.div>

            {/* Floating icon */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-50" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <FiSearch className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              <h2
                className="text-3xl tablet:text-4xl font-bold 
                text-gray-900 dark:text-white"
              >
                Page Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
                Oops! The page you're looking for seems to have wandered off
                into the digital void.
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col mobile:flex-row gap-4 justify-center items-center pt-4"
            >
              {/* Go Home Button */}
              <Link to="/">
                <motion.button
                  className="relative group/btn w-full mobile:w-auto px-8 py-4 rounded-2xl overflow-hidden flex items-center justify-center text-white font-semibold text-sm gap-2 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ backgroundSize: "200% 100%" }}
                  />
                  <FiHome className="relative z-10 w-5 h-5" />
                  <span className="relative z-10">Go Home</span>
                </motion.button>
              </Link>

              {/* Go Back Button */}
              <motion.button
                onClick={() => window.history.back()}
                className="w-full mobile:w-auto px-8 py-4 rounded-2xl 
                  bg-gray-100 dark:bg-gray-800/50 
                  backdrop-blur-sm 
                  hover:bg-gray-200 dark:hover:bg-gray-800 
                  border border-gray-200 dark:border-gray-700/50 
                  hover:border-violet-400 dark:hover:border-violet-500/50 
                  flex items-center justify-center gap-2 
                  text-gray-900 dark:text-white 
                  font-semibold text-sm 
                  transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </motion.button>
            </motion.div>

            {/* Helpful links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-8 border-t border-gray-200 dark:border-gray-700/50"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Popular pages:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Tools", "Calculators", "Converters", "Generators"].map(
                  (item, idx) => (
                    <Link to={`/${item.toLowerCase()}`} key={idx}>
                      <motion.span
                        className="px-4 py-2 text-xs 
                        bg-gradient-to-r from-gray-100 to-gray-50 
                        dark:from-gray-800/80 dark:to-gray-800/40 
                        backdrop-blur-sm rounded-full 
                        text-gray-700 dark:text-gray-300 
                        border border-gray-200 dark:border-gray-700/50 
                        hover:border-violet-400 dark:hover:border-violet-500/50 
                        hover:from-violet-50 hover:to-purple-50
                        dark:hover:from-violet-600/10 dark:hover:to-purple-600/10 
                        transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item}
                      </motion.span>
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
