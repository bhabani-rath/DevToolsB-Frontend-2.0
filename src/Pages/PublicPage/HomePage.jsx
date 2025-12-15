/**
 * HomePage Component - Main Landing Page
 *
 * @description Primary public-facing page with all main sections.
 * Integrates hero, about, features, team, tools, contact, and CTA sections.
 *
 * @component
 * @features
 * - Particle background with mouse tracking
 * - Scroll progress indicator
 * - Scroll spy navigation
 * - Multiple animated sections
 * - Theme toggle support
 * - Floating action buttons
 * - Responsive design
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import ParticleSystem from "./../../Components/Background/ParticleSystem";
import Navbar from "./../../Components/Navbar/Navbar";
import { Toaster } from "sonner";
import ProgressBar from "./../../Components/other/ProgressBar";
import HeroSection from "./sections/HeroSection/HeroSection";
import AboutSection from "./sections/AboutSection/AboutSection";
import FeaturesSection from "./sections/FeaturesSection/FeaturesSection";
import TeamSection from "./sections/TeamSection/TeamSection";
import ContactSection from "./sections/ContactSection/ContactSection";
import CTASection from "./sections/CTASection/CTASection";
import Footer from "./../../Components/FooterBar/Footer";
import FloatingActionButtons from "./../../Components/Buttons/FloatingActionButtons";
import { useDarkMode } from "../../Context/ThemeContext";
import { useScroll } from "framer-motion";
import useScrollSpy from "./../../Hooks/useScrollSpy";
import useMousePosition from "./../../Hooks/useMousePosition";
import ToolsSection from "./sections/ToolsSection/ToolsSection";

// HomePage Component: The main landing page of the application
const HomePage = () => {
  // Theme context to handle dark/light mode
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  // Scroll hooks for animations and progress bar
  const { scrollY, scrollYProgress } = useScroll();

  // Mouse position hook for particle effects
  const { cursorX, cursorY } = useMousePosition();

  // Scroll spy to detect active section for navigation highlighting
  const activeSection = useScrollSpy();

  return (
    // Main container with theme-based styling
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden">
        {/* Background Systems: Particle effects that react to mouse movement */}
        <ParticleSystem
          cursorX={cursorX}
          cursorY={cursorY}
          isDarkMode={isDarkMode}
        />

        {/* Navigation and Global UI Elements */}
        <Navbar activeSection={activeSection} />
        <Toaster />
        <ProgressBar scrollYProgress={scrollYProgress} />

        {/* Main Content Sections */}
        <HeroSection scrollY={scrollY} />
        <AboutSection />
        <FeaturesSection />
        <TeamSection />
        <ToolsSection />
        <ContactSection isDarkMode={isDarkMode} />
        <CTASection />

        {/* Footer Section */}
        <Footer />

        {/* Floating Action Buttons: Theme toggle and other quick actions */}
        <FloatingActionButtons
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
        />
      </div>
    </div>
  );
};

export default HomePage;
