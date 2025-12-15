/**
 * UserLayout Component - Main layout for User Panel
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import UserTopbar from "./UserTopbar";
import UserDashboard from "./UserDashboard";
import UserFavorites from "./UserFavorites";
import UserHistory from "./UserHistory";
import UserProfile from "./UserProfile";
import ChatBot from "../../Components/ChatBot/ChatBot";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const handleSectionChange = (section) => setActiveSection(section);

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <UserDashboard />;
      case "Favorites":
        return <UserFavorites />;
      case "History":
        return <UserHistory />;
      case "Profile":
        return <UserProfile />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <UserSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeSection={activeSection}
        onActiveChange={handleSectionChange}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "tablet:ml-[240px]" : "tablet:ml-[72px]"
        }`}
      >
        <UserTopbar activeSection={activeSection} />
        <main className="flex-1 p-6 dark:bg-black">{renderSection()}</main>
      </div>
      <ChatBot />
    </div>
  );
};

export default UserLayout;
