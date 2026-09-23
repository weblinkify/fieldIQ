/**
 * FieldIQ — Header Component
 *
 * Top bar with page title, theme toggle, mobile menu,
 * and interactive notification popover.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sun,
  Moon,
  Menu,
  Bell,
  AlertTriangle,
  Thermometer,
  Wind,
  ArrowRight,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
  alertCount?: number;
}

interface MockAlert {
  id: string;
  severity: "critical" | "warning";
  message: string;
  reading: string;
  sensorType: "temperature" | "co2";
  site: string;
  time: string;
  date: string;
}

const mockAlerts: MockAlert[] = [
  {
    id: "alert-001",
    severity: "critical",
    message:
      "Temperature exceeded critical threshold in Server Room",
    reading: "31.80",
    sensorType: "temperature",
    site: "SITE-001",
    time: "09:22:57 PM",
    date: "9/23/2026",
  },
  {
    id: "alert-002",
    severity: "warning",
    message:
      "CO2 level is above recommended range in Conference Room A",
    reading: "1248.00",
    sensorType: "co2",
    site: "SITE-002",
    time: "09:12:57 PM",
    date: "9/23/2026",
  },
];

export default function Header({
  title,
  theme,
  onToggleTheme,
  onToggleSidebar,
  alertCount = mockAlerts.length,
}: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [readAlerts, setReadAlerts] = useState<string[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = mockAlerts.filter(
    (alert) => !readAlerts.includes(alert.id)
  ).length;

  const markAsRead = (id: string) => {
    setReadAlerts((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  const markAllAsRead = () => {
    setReadAlerts(mockAlerts.map((alert) => alert.id));
  };

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
        {/* Notification bell */}
        <div
          ref={notificationRef}
          style={{
            position: "relative",
          }}
        >
          <button
            className="header-btn"
            onClick={() =>
              setNotificationsOpen((current) => !current)
            }
            aria-label="View notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell size={18} />

            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  minWidth: 8,
                  height: 8,
                  padding: 0,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-danger)",
                  boxShadow:
                    "0 0 0 2px var(--color-background)",
                }}
              />
            )}
          </button>

          {/* Notification popover */}
          {notificationsOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 12px)",
                right: 0,
                width: 390,
                maxWidth: "calc(100vw - 24px)",
                borderRadius: 14,
                border:
                  theme === "light"
                    ? "1px solid #e4e4e7"
                    : "1px solid #27272a",
                backgroundColor:
                  theme === "light" ? "#ffffff" : "#09090b",
                boxShadow:
                  theme === "light"
                    ? "0 16px 40px rgba(0, 0, 0, 0.12)"
                    : "0 16px 40px rgba(0, 0, 0, 0.45)",
                overflow: "hidden",
                zIndex: 1000,
              }}
            >
              {/* Popover header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderBottom:
                    theme === "light"
                      ? "1px solid #e4e4e7"
                      : "1px solid #27272a",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color:
                        theme === "light" ? "#18181b" : "#f4f4f5",
                    }}
                  >
                    Notifications
                  </div>

                  <div
                    style={{
                      marginTop: 2,
                      fontSize: 12,
                      color:
                        theme === "light" ? "#71717a" : "#a1a1aa",
                    }}
                  >
                    {unreadCount > 0
                      ? `${unreadCount} unread alert${unreadCount === 1 ? "" : "s"
                      }`
                      : "All caught up"}
                  </div>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      border: 0,
                      background: "transparent",
                      color:
                        theme === "light" ? "#4f46e5" : "#818cf8",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Check size={14} />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Alerts */}
              <div
                style={{
                  maxHeight: 360,
                  overflowY: "auto",
                }}
              >
                {mockAlerts.map((alert) => {
                  const isRead = readAlerts.includes(alert.id);
                  const isCritical = alert.severity === "critical";

                  return (
                    <button
                      key={alert.id}
                      type="button"
                      onClick={() => markAsRead(alert.id)}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "14px 16px",
                        border: 0,
                        borderBottom:
                          theme === "light"
                            ? "1px solid #e4e4e7"
                            : "1px solid #27272a",
                        backgroundColor: isRead
                          ? theme === "light"
                            ? "#ffffff"
                            : "#09090b"
                          : isCritical
                            ? theme === "light"
                              ? "#fef2f2"
                              : "rgba(127, 29, 29, 0.18)"
                            : theme === "light"
                              ? "#fffbeb"
                              : "rgba(120, 53, 15, 0.18)",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 11,
                        }}
                      >
                        {/* Severity icon */}
                        <div
                          style={{
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 32,
                            height: 32,
                            borderRadius: 9,
                            backgroundColor: isCritical
                              ? theme === "light"
                                ? "#fee2e2"
                                : "rgba(239, 68, 68, 0.15)"
                              : theme === "light"
                                ? "#fef3c7"
                                : "rgba(245, 158, 11, 0.15)",
                            color: isCritical
                              ? "#ef4444"
                              : "#f59e0b",
                          }}
                        >
                          <AlertTriangle size={16} />
                        </div>

                        <div
                          style={{
                            minWidth: 0,
                            flex: 1,
                          }}
                        >
                          {/* Severity + unread */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 8,
                              marginBottom: 4,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                color: isCritical
                                  ? "#ef4444"
                                  : "#d97706",
                              }}
                            >
                              {alert.severity}
                            </span>

                            {!isRead && (
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor:
                                    theme === "light"
                                      ? "#4f46e5"
                                      : "#818cf8",
                                }}
                              />
                            )}
                          </div>

                          {/* Message */}
                          <div
                            style={{
                              fontSize: 12,
                              lineHeight: 1.45,
                              fontWeight: 600,
                              color:
                                theme === "light"
                                  ? "#18181b"
                                  : "#f4f4f5",
                            }}
                          >
                            {alert.message}
                          </div>

                          {/* Metadata */}
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              gap: 8,
                              marginTop: 8,
                              fontSize: 10,
                              color:
                                theme === "light"
                                  ? "#52525b"
                                  : "#a1a1aa",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              {alert.sensorType === "temperature" ? (
                                <Thermometer size={12} />
                              ) : (
                                <Wind size={12} />
                              )}

                              {alert.sensorType === "temperature"
                                ? "Temperature"
                                : "CO₂"}
                            </span>

                            <span
                              style={{
                                color:
                                  theme === "light"
                                    ? "#d4d4d8"
                                    : "#52525b",
                              }}
                            >
                              •
                            </span>

                            <span>Reading: {alert.reading}</span>

                            <span
                              style={{
                                color:
                                  theme === "light"
                                    ? "#d4d4d8"
                                    : "#52525b",
                              }}
                            >
                              •
                            </span>

                            <span>{alert.site}</span>
                          </div>

                          {/* Time */}
                          <div
                            style={{
                              marginTop: 5,
                              fontSize: 10,
                              color:
                                theme === "light"
                                  ? "#71717a"
                                  : "#71717a",
                            }}
                          >
                            {alert.time} · {alert.date}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(false);
                  router.push("/alerts");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  width: "100%",
                  padding: "12px 16px",
                  border: 0,
                  backgroundColor:
                    theme === "light" ? "#ffffff" : "#09090b",
                  color:
                    theme === "light" ? "#4f46e5" : "#818cf8",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View all alerts
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Theme toggle button */}
        <button
          className="header-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"
            } mode`}
        >
          {theme === "light" ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}
        </button>
      </div>
    </header>
  );
}