import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Dashboard from "./components/Dashboard";
import RoleSwitcher from "./components/Roleswitcher";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState("viewer");

  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDark);
    document.body.classList.toggle("dark", savedDark);
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
    setDarkMode(isDark);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header container">
        <div className="header-left">
          <h1 className="app-title">Zorvyn</h1>
          <p className="app-subtitle">Track your income & expenses</p>
        </div>

        <div className="header-right">
          <RoleSwitcher role={userRole} setRole={setUserRole} />

          <button className="btn-secondary icon-btn" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="container">
        <Dashboard role={userRole} />
      </main>
    </div>
  );
}

export default App;
