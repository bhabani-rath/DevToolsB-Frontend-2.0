import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Admin/Sidebar";
import Header from "../Admin/Header";
import BackgroundStars from "./../../Components/Background/BackgroundStars";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#E0E6F0] relative overflow-hidden">
      <BackgroundStars />

      <div className="flex relative z-10">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "lg:ml-64" : "ml-0"
          }`}
        >
          <Header
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />

          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
