import EnhancedBackground from "./../../Components/Background/EnhancedBackground";
import ParticleSystem from "./../../Components/Background/ParticleSystem";
import MouseInteractiveBackground from "./../../Components/Background/MouseInteractiveBackground";
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

const HomePage = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const { scrollY, scrollYProgress } = useScroll();
  const { cursorX, cursorY } = useMousePosition();
  const activeSection = useScrollSpy();

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
        {/* Background Systems */}
        <ParticleSystem
          cursorX={cursorX}
          cursorY={cursorY}
          isDarkMode={isDarkMode}
        />

        {/* Navigation */}
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

        {/* Footer */}
        <Footer />

        {/* Floating Actions */}
        <FloatingActionButtons
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
        />
      </div>
    </div>
  );
};

export default HomePage;
