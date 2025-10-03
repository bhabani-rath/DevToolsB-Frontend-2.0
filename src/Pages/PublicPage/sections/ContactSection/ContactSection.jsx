// sections/ContactSection/ContactSection.jsx
import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import TrustIndicators from "./TrustIndicators";
import SectionHeader from "./../../../../Components/other/SectionHeader";

const ContactSection = ({ isDarkMode }) => {
  return (
    <section
      id="contact"
      className="py-20 px-4 mobile:px-6 tablet:px-8 laptop:px-10 desktop:px-12 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-300/20 dark:from-blue-700/20 dark:to-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            y: {
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader
          title="Get In Touch"
          subtitle="Have a question or want to collaborate? We'd love to hear from you."
        />

        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm isDarkMode={isDarkMode} />
        </div>

        <TrustIndicators />
      </div>
    </section>
  );
};

export default ContactSection;
