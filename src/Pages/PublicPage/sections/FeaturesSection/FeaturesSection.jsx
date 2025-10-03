// sections/FeaturesSection/FeaturesSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import SectionHeader from './../../../../Components/other/SectionHeader';
import { featuresData } from './../../../../demoData/featuresData';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <section
      id="features"
      className="py-20 px-4 mobile:px-6 tablet:px-8 laptop:px-10 desktop:px-12 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Powerful Features"
          subtitle="Everything you need to streamline your development process"
        />

        {/* Asymmetric Grid - Content determines height */}
        <div className="space-y-6 mt-12">
          {/* First Row */}
          <div className="grid grid-cols-1 laptop:grid-cols-3 gap-6 items-start">
            <motion.div
              className="laptop:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FeatureCard
                feature={featuresData[0]}
                index={0}
                isActive={activeFeature === 0}
                onHover={setActiveFeature}
              />
            </motion.div>

            <motion.div
              className="laptop:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FeatureCard
                feature={featuresData[1]}
                index={1}
                isActive={activeFeature === 1}
                onHover={setActiveFeature}
              />
            </motion.div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 laptop:grid-cols-3 gap-6 items-start">
            <motion.div
              className="laptop:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FeatureCard
                feature={featuresData[2]}
                index={2}
                isActive={activeFeature === 2}
                onHover={setActiveFeature}
              />
            </motion.div>

            <motion.div
              className="laptop:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FeatureCard
                feature={featuresData[3]}
                index={3}
                isActive={activeFeature === 3}
                onHover={setActiveFeature}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
