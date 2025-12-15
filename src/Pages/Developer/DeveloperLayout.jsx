/**
 * DeveloperLayout Component
 *
 * @description Main layout wrapper for the developer dashboard interface.
 * Manages the responsive layout structure with a collapsible sidebar and topbar.
 * Controls navigation between dashboard sections.
 *
 * @component
 * @features
 * - Responsive sidebar with expand/collapse functionality
 * - Dynamic margin adjustment based on sidebar state
 * - Section-based navigation (Dashboard, My Tools, Analytics, Profile)
 * - Smooth transitions for layout changes
 * - Mobile-first responsive design
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import DeveloperSidebar from "./DeveloperSidebar";
import DeveloperTopbar from "./DeveloperTopbar";
import DeveloperDashboard from "./DeveloperDashboard";
import DeveloperMyTools from "./DeveloperMyTools";
import DeveloperAnalytics from "./DeveloperAnalytics";
import DeveloperProfile from "./DeveloperProfile";
import ChatBot from "../../Components/ChatBot/ChatBot";

const DeveloperLayout = () => {
  // State to control sidebar open/close status
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State to track the currently active section
  const [activeSection, setActiveSection] = useState("Dashboard");

  /**
   * Handle section change when user clicks sidebar menu items
   * @param {string} section - The new active section
   */
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  /**
   * Render the appropriate section based on activeSection state
   */
  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <DeveloperDashboard />;
      case "My Tools":
        return <DeveloperMyTools />;
      case "Analytics":
        return <DeveloperAnalytics />;
      case "Profile":
        return <DeveloperProfile />;
      default:
        return <DeveloperDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component - Fixed positioning on desktop, overlay on mobile */}
      <DeveloperSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeSection={activeSection}
        onActiveChange={handleSectionChange}
      />

      {/* Main Content Area - Dynamically adjusts based on sidebar state */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "tablet:ml-[240px]" : "tablet:ml-[72px]"
        }`}
      >
        {/* Topbar Component - Contains dashboard title, search, and theme toggle */}
        <DeveloperTopbar activeSection={activeSection} />

        {/* Main Content Section - Renders content based on active section */}
        <main className="flex-1 p-6 dark:bg-black">{renderSection()}</main>
      </div>

      {/* AI ChatBot - Floating assistant */}
      <ChatBot />
    </div>
  );
};

export default DeveloperLayout;
