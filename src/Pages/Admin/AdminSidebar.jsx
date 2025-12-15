/**
 * AdminSidebar Component
 *
 * @description Wrapper component for the Sidebar in the Admin dashboard context.
 * Acts as a bridge between AdminLayout and the reusable Sidebar component.
 *
 * @component
 * @props
 * @param {boolean} isOpen - Controls whether the sidebar is expanded or collapsed
 * @param {function} setIsOpen - Callback function to toggle sidebar state
 * @param {string} activeSection - Currently active section (Dashboard, Users, etc.)
 * @param {function} onActiveChange - Callback when user clicks a different section
 *
 * @author DevToolsB Team
 * @version 1.1.0
 */

import React from "react";
import Sidebar from "./../../Components/Sidebar/Sidebar";

const AdminSidebar = ({ isOpen, setIsOpen, activeSection, onActiveChange }) => {
  return (
    <div>
      {/* Render the shared Sidebar component with controlled state */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeSection={activeSection}
        onActiveChange={onActiveChange}
      />
    </div>
  );
};

export default AdminSidebar;
