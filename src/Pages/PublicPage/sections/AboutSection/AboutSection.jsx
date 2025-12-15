/**
 * AboutSection Component
 *
 * @description About section showcasing platform features and code preview.
 * @author DevToolsB Team
 */

import { motion } from "framer-motion";
import AboutContent from "./AboutContent";
import CodePreviewCard from "./CodePreviewCard";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-20 px-4 mobile:px-6 tablet:px-8 laptop:px-10 desktop:px-12 relative"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl mobile:text-5xl tablet:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Why DevToolsB?
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-12 items-center">
          <AboutContent />
          <CodePreviewCard />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
