/**
 * FieldIQ — Main App Layout
 *
 * This wrapper handles the global layout state:
 * - Sidebar open/closed (for mobile)
 * - Dark/light theme toggle
 * - Wrapping all page content
 */
"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("fieldiq-theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // Fallback to system preference
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("fieldiq-theme", newTheme);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} alertCount={2} />
      
      <main className="main-content">
        <Header 
          title="FieldIQ" 
          theme={theme} 
          onToggleTheme={toggleTheme} 
          onToggleSidebar={toggleSidebar}
          alertCount={2}
        />
        <div className="page-content animate-in">
          {children}
        </div>
      </main>
    </div>
  );
}
