/**
 * FieldIQ — Header Component
 *
 * The top bar with page title, theme toggle, and mobile menu button.
 *
 * LEARNING CONCEPT: "Props"
 * Props are like function arguments but for components.
 * The parent component says:
 *   <Header title="Dashboard" onToggleTheme={...} />
 * And this component receives those values as props.
 */
"use client";

import { Sun, Moon, Menu, Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
  alertCount?: number;
}

export default function Header({
  title,
  theme,
  onToggleTheme,
  onToggleSidebar,
  alertCount = 0,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        {/* Mobile-only hamburger menu button */}
        <button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        {/* Alert bell with count */}
        <button className="header-btn" aria-label="View alerts" style={{ position: "relative" }}>
          <Bell size={18} />
          {alertCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "var(--color-danger)",
              }}
            />
          )}
        </button>

        {/* Theme toggle button */}
        <button
          className="header-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}
