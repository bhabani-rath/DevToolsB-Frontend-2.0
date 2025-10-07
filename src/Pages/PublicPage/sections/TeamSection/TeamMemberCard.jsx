// sections/TeamSection/TeamMemberCard.jsx
import React from "react";
import { motion } from "framer-motion";
import HomeCard from "./../../../../Components/Cards/HomeCard";
import { FiExternalLink, FiGithub, FiLinkedin } from "react-icons/fi";

const TeamMemberCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group h-full"
    >
      <HomeCard className="relative h-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/80 transition-all duration-500 rounded-2xl p-8 flex flex-col">
        {/* Subtle animated background effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03), transparent 70%)",
          }}
        />

        {/* Avatar Section with Divider Line */}
        <div className="relative mb-8 z-10">
          {/* Decorative line through avatar */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600/60 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
          />

          {/* Avatar Circle */}
          <motion.div
            className="relative z-10 w-40 h-40 mx-auto rounded-full border border-gray-600/70 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl overflow-hidden group-hover:border-blue-500/50 transition-all duration-500 shadow-lg"
            whileHover={{
              scale: 1.08,
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />

            <span className="relative z-10">{member.avatar}</span>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          {/* Name & Role */}
          <div className="mb-6">
            <motion.h3
              className="text-2xl font-bold mb-2 text-white tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.4 }}
            >
              {member.name}
            </motion.h3>
            <motion.p
              className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              {member.role}
            </motion.p>
          </div>

          {/* Bio if available */}
          {member.bio && (
            <motion.p
              className="text-sm text-gray-400 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.6 }}
            >
              {member.bio}
            </motion.p>
          )}

          {/* Skills Section */}
          <div className="mb-8">
            <motion.div
              className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.7 }}
            >
              Expertise
            </motion.div>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  className="px-4 py-1.5 text-xs bg-gray-800/80 rounded-lg text-gray-300 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300 font-medium backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2 + 0.7 + skillIndex * 0.05,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Footer Section - pushed to bottom */}
          <div className="mt-auto space-y-4">
            {/* Social Links */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800/50">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Connect
              </span>
              <div className="flex gap-3">
                <motion.a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLinkedin className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            {/* Portfolio Button */}
            <motion.a
              href={member.portfolio || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-5 py-3 text-sm bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 rounded-xl text-gray-200 border border-blue-500/30 hover:border-blue-500/50 font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 group/btn"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View Portfolio</span>
              <FiExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>
      </HomeCard>
    </motion.div>
  );
};

export default TeamMemberCard;
