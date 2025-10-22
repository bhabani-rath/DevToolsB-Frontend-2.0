import { useEffect, useState, useRef } from "react";
import wevlogo from "../../assets/Home.jsx Assets/B Logo.png";

// Custom Modal Component
const CustomModal = ({
  isOpen,
  children,
  className = "",
  overlayClassName = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay for animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${overlayClassName}`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
      />
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${className}`}
      >
        {children}
      </div>
    </>
  );
};

// Advanced Loader Component
export const Loader = ({
  progress = 0,
  message = "Hang tight, we're almost ready!",
}) => {
  const [particlePositions, setParticlePositions] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticlePositions(particles);
  }, []);

  // Animate particles
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setParticlePositions((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }))
      );
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative flex flex-col gap-6 w-full h-full items-center justify-center p-8">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Main loader */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="w-64 h-64 rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-500" />
        </div>

        {/* Middle pulsing ring */}
        <div className="absolute inset-2 animate-pulse">
          <div className="w-60 h-60 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20" />
        </div>

        {/* Inner logo container */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1 animate-gradient">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <img
                className="w-36 h-36 rounded-full animate-float"
                src={wevlogo}
                alt="Loading"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {progress > 0 && (
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Message with typewriter effect */}
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-typewriter overflow-hidden whitespace-nowrap">
          {message}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 animate-fade-in animation-delay-1000">
          This won't take long...
        </p>
      </div>
    </div>
  );
};

// Main Modal Component
const PageLoader = ({ duration = 1500, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / (duration / 100);
      });
    }, 100);

    // Close modal after duration
    const timeout = setTimeout(() => {
      setModalIsOpen(false);
      if (onClose) {
        setTimeout(onClose, 300); // Wait for animation to complete
      }
    }, duration);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  return (
    <CustomModal
      isOpen={modalIsOpen}
      className="px-4"
      overlayClassName="backdrop-blur-sm"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-auto">
        <Loader progress={progress} />
      </div>
    </CustomModal>
  );
};

export default PageLoader;
