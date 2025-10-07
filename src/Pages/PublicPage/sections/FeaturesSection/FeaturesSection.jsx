// sections/FeaturesSection/FeaturesSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import SectionHeader from "./../../../../Components/other/SectionHeader";
import { featuresData } from "./../../../../demoData/featuresData";

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

        {/* Clean 2-Column Grid */}
        <div className="grid grid-cols-1 laptop:grid-cols-3 gap-6 mt-12">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard
                feature={feature}
                index={index}
                isActive={activeFeature === index}
                onHover={setActiveFeature}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
