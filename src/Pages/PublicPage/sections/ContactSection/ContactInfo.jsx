// sections/ContactSection/ContactInfo.jsx
import React from "react";
import { motion } from "framer-motion";
import ContactMethodCard from "./ContactMethodCard";

const contactMethods = [
  {
    icon: "📧",
    label: "Email",
    value: "hello@devtoolsb.com",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: "💬",
    label: "Discord",
    value: "Join our community",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: "🐦",
    label: "Twitter",
    value: "@devtoolsb",
    color: "from-cyan-500 to-cyan-600",
  },
];

const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Let's Build Something Amazing
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Whether you have a feature request, bug report, or just want to say
          hi, we're here to listen and help.
        </p>
      </div>

      <div className="space-y-4">
        {contactMethods.map((item, index) => (
          <ContactMethodCard key={index} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default ContactInfo;
