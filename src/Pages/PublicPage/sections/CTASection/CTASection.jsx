// sections/CTASection/CTASection.jsx
import { motion } from "framer-motion";
import CTAStats from "./CTAStats";
import CTABackground from "./CTABackground";
import AnimatedButton from "./../../../../Components/Buttons/AnimatedButton";

const CTASection = () => {
  return (
    <section className="py-20 px-4 mobile:px-6 tablet:px-8 laptop:px-10 desktop:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-800 dark:via-gray-900 dark:to-black" />

      <CTABackground />

      <div className="max-w-4xl mx-auto text-center relative ">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl mobile:text-5xl tablet:text-6xl font-bold mb-6 text-white"
        >
          <motion.span
            animate={{
              backgroundPosition: ["0%", "100%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Ready to get supercharged with DevToolsB
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 mb-8"
        >
          Join thousands of users who are already using DevToolsB
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col mobile:flex-row gap-4 justify-center items-center"
        >
          <AnimatedButton
            onClick={() => console.log("Start Building")}
            variant="primary"
            className="text-white"
          >
            Join Our Family
            <motion.span
              animate={{
                x: [0, 5, 0],
                rotate: [0, 360],
              }}
              transition={{
                x: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              🤝
            </motion.span>
          </AnimatedButton>

          <AnimatedButton
            onClick={() => console.log("View Docs")}
            variant="secondary"
          >
            Be A Tool Creator ©️
          </AnimatedButton>
        </motion.div>

        <CTAStats />
      </div>
    </section>
  );
};

export default CTASection;
