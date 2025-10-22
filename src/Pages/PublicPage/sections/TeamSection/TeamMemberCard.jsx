// sections/TeamSection/TeamMemberCard.jsx
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiLinkedin, FiAward } from "react-icons/fi";

const TeamMemberCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group h-full perspective-1000"
    >
      <motion.div
        className="relative h-full"
        whileHover={{ rotateY: 2, rotateX: 2 }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background gradient blob */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Main card */}
        <div
          className="relative h-full 
          bg-white/90 dark:bg-gray-900/80 
          backdrop-blur-xl rounded-3xl p-8 
          border border-gray-200 dark:border-gray-800/50 
          shadow-2xl"
        >
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-10 right-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <div className="absolute bottom-20 left-10 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse delay-300" />
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-500 rounded-full animate-pulse delay-700" />
          </div>

          {/* Top section */}
          <div className="relative mb-8">
            {/* Avatar with floating effect */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-60"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="relative w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-5xl shadow-2xl"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span className="relative z-10">{member.avatar}</span>
              </motion.div>
            </div>

            {/* Name */}
            <h3
              className="text-2xl font-bold text-center 
              text-gray-900 dark:text-white 
              mb-2"
            >
              {member.name}
            </h3>

            {/* Role with icon */}
            <div className="flex items-center justify-center gap-2">
              <FiAward className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <p
                className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r 
                from-blue-600 to-purple-600 
                dark:from-blue-400 dark:to-purple-400"
              >
                {member.role}
              </p>
            </div>
          </div>

          {/* Bio */}
          {member.bio && (
            <p
              className="text-sm 
              text-gray-600 dark:text-gray-400 
              text-center mb-6 leading-relaxed line-clamp-3"
            >
              {member.bio}
            </p>
          )}

          {/* Skills cloud */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {member.skills.map((skill, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1.5 text-xs 
                  bg-gradient-to-r 
                  from-gray-100 to-gray-50 
                  dark:from-gray-800/80 dark:to-gray-800/40 
                  backdrop-blur-sm rounded-full 
                  text-gray-700 dark:text-gray-300 
                  border 
                  border-gray-200 dark:border-gray-700/50 
                  hover:border-blue-400 dark:hover:border-blue-500/50 
                  hover:from-blue-50 hover:to-purple-50
                  dark:hover:from-blue-600/10 dark:hover:to-purple-600/10 
                  transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + idx * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Footer actions */}
          <div className="space-y-3">
            {/* Social links row */}
            <div className="flex justify-center gap-3">
              <motion.a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl 
                  bg-gray-100 dark:bg-gray-800/50 
                  backdrop-blur-sm 
                  hover:bg-gray-200 dark:hover:bg-gray-800 
                  border 
                  border-gray-200 dark:border-gray-700/50 
                  hover:border-blue-400 dark:hover:border-blue-500/50 
                  flex items-center justify-center 
                  text-gray-600 dark:text-gray-400 
                  hover:text-gray-900 dark:hover:text-white 
                  transition-all"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl 
                  bg-gray-100 dark:bg-gray-800/50 
                  backdrop-blur-sm 
                  hover:bg-gray-200 dark:hover:bg-gray-800 
                  border 
                  border-gray-200 dark:border-gray-700/50 
                  hover:border-blue-400 dark:hover:border-blue-500/50 
                  flex items-center justify-center 
                  text-gray-600 dark:text-gray-400 
                  hover:text-gray-900 dark:hover:text-white 
                  transition-all"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Portfolio button */}
            <motion.a
              href={member.portfolio || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn w-full h-12 rounded-2xl overflow-hidden flex items-center justify-center text-white font-medium text-sm gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated gradient background */}
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
              <span className="relative z-10">View Portfolio</span>
              <FiExternalLink className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamMemberCard;
