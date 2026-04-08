import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Layout from "./layout/Layout";

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
    <Layout
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      role={userRole}
      setRole={setUserRole}
    >
      <Dashboard role={userRole} />
    </Layout>
  );
}

export default App;