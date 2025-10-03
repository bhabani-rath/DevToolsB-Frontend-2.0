// sections/HeroSection/HeroSection.jsx
import { motion, useTransform } from "framer-motion";
import HeroBadge from "./HeroBadge";
import HeroTitle from "./HeroTitle";
import HeroStats from "./HeroStats";
import ScrollIndicator from "./ScrollIndicator";
import { scrollToSection } from "./../../../../Components/utils/scrollHelpers";
import AnimatedButton from "./../../../../Components/Buttons/AnimatedButton";

const HeroSection = ({ scrollY }) => {
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 mobile:px-6 tablet:px-8"
    >
      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="text-center max-w-6xl mx-auto"
      >
        <HeroBadge />
        <HeroTitle />

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <p className="text-2xl mobile:text-3xl tablet:text-4xl text-gray-600 dark:text-gray-400 font-light">
            One Stop for{" "}
            <motion.span
              className="font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Daily Calculations
            </motion.span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col mobile:flex-row gap-4 justify-center items-center mb-16"
        >
          <AnimatedButton
            onClick={() => scrollToSection("tools")}
            variant="primary"
            icon="arrow-right"
          >
            Get Started
          </AnimatedButton>
        </motion.div>

        <HeroStats />
      </motion.div>

      <ScrollIndicator targetSection="about" />
    </section>
  );
};

export default HeroSection;
