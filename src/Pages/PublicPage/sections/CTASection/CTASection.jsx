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

      <div className="max-w-4xl mx-auto text-center relative z-10">
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
            Ready to Supercharge Your Workflow?
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 mb-8"
        >
          Join thousands of developers who are already using DevToolsB
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
            Start Building
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
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              🚀
            </motion.span>
          </AnimatedButton>

          <AnimatedButton
            onClick={() => console.log("View Docs")}
            variant="secondary"
          >
            View Documentation
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </motion.svg>
          </AnimatedButton>
        </motion.div>

        <CTAStats />
      </div>
    </section>
  );
};

export default CTASection;
