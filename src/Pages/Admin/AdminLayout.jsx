/**
 * AdminLayout Component
 *
 * @description Main layout wrapper for the admin dashboard interface.
 * Manages the responsive layout structure with a collapsible sidebar and topbar.
 * Controls navigation between dashboard sections.
 *
 * @component
 * @features
 * - Responsive sidebar with expand/collapse functionality
 * - Dynamic margin adjustment based on sidebar state
 * - Section-based navigation (Dashboard, Users, Developers, Tools, Ratings)
 * - Smooth transitions for layout changes
 * - Mobile-first responsive design
 *
 * @author DevToolsB Team
 * @version 2.0.0
 */

import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import AdminDashboard from "./AdminDashboard";
import ChatBot from "../../Components/ChatBot/ChatBot";

const AdminLayout = () => {
  // State to control sidebar open/close status
  // Default is open (true) on initial load
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State to track the currently active section
  // This syncs with the sidebar menu items
  const [activeSection, setActiveSection] = useState("Dashboard");

  /**
   * Handle section change when user clicks sidebar menu items
   * @param {string} section - The new active section
   */
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component - Fixed positioning on desktop, overlay on mobile */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeSection={activeSection}
        onActiveChange={handleSectionChange}
      />

      {/* Main Content Area - Dynamically adjusts based on sidebar state */}
      {/* On tablet+: ml-[240px] when expanded, ml-[72px] when collapsed */}
      {/* On mobile: Full width (no margin) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "tablet:ml-[240px]" : "tablet:ml-[72px]"
        }`}
      >
        {/* Topbar Component - Contains dashboard title, search, and theme toggle */}
        <AdminTopbar activeSection={activeSection} />

        {/* Main Content Section - Renders content based on active section */}
        <main className="flex-1 p-6 dark:bg-black">
          {/* Dashboard renders different content based on activeSection */}
          <AdminDashboard activeSection={activeSection} />
        </main>
      </div>

      {/* AI ChatBot - Floating assistant */}
      <ChatBot />
    </div>
  );
};

export default AdminLayout;
