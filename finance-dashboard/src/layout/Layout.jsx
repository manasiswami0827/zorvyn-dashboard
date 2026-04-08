import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Sun, Moon, Menu } from "lucide-react";
import RoleSwitcher from "../components/Roleswitcher";

function Layout({ children, darkMode, toggleDarkMode, role, setRole }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content">

        {/* HEADER */}
        <header className="header">
          
          {/* LEFT */}
          <div className="header-left">
            <button className="menu-btn" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>

            <div>
              <h1 className="app-title">Zorvyn</h1>
              <p className="app-subtitle">Track your income & expenses</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="header-right">
            <RoleSwitcher role={role} setRole={setRole} />

            <button className="btn-secondary icon-btn" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {children}

        <Footer />
      </div>
    </div>
  );
}

export default Layout;