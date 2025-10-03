// sections/ContactSection/ContactForm.jsx
import { motion } from "framer-motion";
import useContactForm from "./../../../../Hooks/useContactForm";
import AnimatedButton from "./../../../../Components/Buttons/AnimatedButton";
import HomeTextArea from "./../../../../Components/InputFields/HomeTextArea";
import HomeInputField from "./../../../../Components/InputFields/HomeInputField";
import HomeCard from "./../../../../Components/Cards/HomeCard";

const ContactForm = ({ isDarkMode }) => {
  const { formData, formErrors, handleInputChange, handleSubmit } =
    useContactForm(isDarkMode);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <HomeCard className="p-8 shadow-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <HomeInputField
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              error={formErrors.name}
              placeholder="Your name"
              className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-white/20 dark:border-gray-600/20 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <HomeInputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={formErrors.email}
              placeholder="your.email@example.com"
              className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-white/20 dark:border-gray-600/20 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <HomeTextArea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              error={formErrors.message}
              placeholder="Tell us about your project or inquiry..."
              className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-white/20 dark:border-gray-600/20 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <AnimatedButton
              type="submit"
              variant="gradient"
              fullWidth={false}
              icon="arrow-right"
            >
              Send Message
            </AnimatedButton>
          </motion.div>
        </form>
      </HomeCard>
    </motion.div>
  );
};

export default ContactForm;
