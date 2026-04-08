import React from "react";
import { X, LayoutDashboard, Receipt, BarChart3, Settings } from "lucide-react";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        
          <div className="sidebar-header">
          <h2 className="logo">Zorvyn</h2>
    
          <button className="close-btn" onClick={toggleSidebar}>
            <X size={18} />
          </button>
        </div>

           <nav className="sidebar-menu">
          <a href="#" className="menu-item active">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a href="#" className="menu-item">
            <Receipt size={18} /> Transactions
          </a>
          <a href="#" className="menu-item">
            <BarChart3 size={18} /> Reports
          </a>
          <a href="#" className="menu-item">
            <Settings size={18} /> Settings
          </a>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;