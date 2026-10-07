"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Cpu,
  Bell,
  BarChart3,
  Brain,
  Settings,
  Zap,
} from "lucide-react";

/**
 * Navigation items configuration.
 * Each item has a label, URL path, and icon.
 * Adding a new page? Just add a new entry here!
 */
const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Sites", href: "/sites", icon: MapPin },
      { label: "Devices", href: "/devices", icon: Cpu },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { label: "Alerts", href: "/alerts", icon: Bell, showBadge: true },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "AI Insights", href: "/ai-insights", icon: Brain },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  alertCount?: number;
}

export default function Sidebar({ isOpen, onClose, alertCount = 0 }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Zap size={20} />
          </div>
          <div className="sidebar-logo-text">
            Field<span>IQ</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="sidebar-section-label">{section.label}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                // Check if this link is the currently active page
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link ${isActive ? "active" : ""}`}
                    onClick={onClose} // Close sidebar on mobile after clicking
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {/* Show alert count badge on the Alerts link */}
                    {item.showBadge && alertCount > 0 && (
                      <span className="sidebar-link-badge">{alertCount}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
