// hooks/useScrollSpy.js
import { useState, useEffect, useCallback } from "react";

const useScrollSpy = () => {
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    const sections = ["home", "about", "features", "team", "tech", "contact"];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return activeSection;
};

export default useScrollSpy;
