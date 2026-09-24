"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  KeyRound,
  CreditCard,
  Globe2,
  Database,
  Mail,
  Save,
  CheckCircle2,
  Smartphone,
  Clock,
  Palette,
  ChevronRight,
} from "lucide-react";

import {
  PageHeader,
  SimBadge,
  RefreshButton,
  StatusBadge,
} from "@/components/management/management-ui";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [timezone, setTimezone] = useState("Europe/Helsinki");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="stagger-in">
      <PageHeader
        title="Settings"
        description="Manage system preferences, notifications, security, and account configuration."
        action={
          <>
            <SimBadge />

            <RefreshButton
              onClick={() => window.location.reload()}
              loading={false}
            />
          </>
        }
      />

      {/* System Status */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <StatusCard
          icon={<CheckCircle2 size={18} />}
          label="System Status"
          value="Operational"
          tone="success"
        />

        <StatusCard
          icon={<Database size={18} />}
          label="Data Connection"
          value="Connected"
          tone="success"
        />

        <StatusCard
          icon={<Shield size={18} />}
          label="Security"
          value="Protected"
          tone="success"
        />

        <StatusCard
          icon={<Smartphone size={18} />}
          label="Devices"
          value="Synced"
          tone="success"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* Main settings */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* General */}
          <SettingsSection
            icon={<Globe2 size={18} />}
            title="General"
            description="Configure regional and system-wide preferences."
          >
            <SettingRow
              icon={<Globe2 size={16} />}
              title="Timezone"
              description="Used when displaying timestamps and schedules."
            >
              <select
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                style={selectStyle}
              >
                <option value="Europe/Helsinki">Europe/Helsinki</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Europe/Berlin">Europe/Berlin</option>
                <option value="America/New_York">
                  America/New_York
                </option>
                <option value="America/Los_Angeles">
                  America/Los_Angeles
                </option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </SettingRow>

            <SettingRow
              icon={<Clock size={16} />}
              title="Date & Time Format"
              description="Choose how dates and times appear throughout the dashboard."
            >
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: 7,
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                24-hour · DD/MM/YYYY
              </span>
            </SettingRow>

            <SettingRow
              icon={<Palette size={16} />}
              title="Interface Theme"
              description="Theme follows your dashboard appearance preference."
              last
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 7,
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                System Default
              </span>
            </SettingRow>
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection
            icon={<Bell size={18} />}
            title="Notifications"
            description="Control alerts and system notification behavior."
          >
            <SettingRow
              icon={<Bell size={16} />}
              title="Push Notifications"
              description="Receive important system and device notifications."
            >
              <Toggle
                checked={notifications}
                onChange={setNotifications}
              />
            </SettingRow>

            <SettingRow
              icon={<Mail size={16} />}
              title="Email Alerts"
              description="Send critical environmental alerts to configured recipients."
            >
              <Toggle
                checked={emailAlerts}
                onChange={setEmailAlerts}
              />
            </SettingRow>

            <SettingRow
              icon={<Settings size={16} />}
              title="Critical Alert Threshold"
              description="Notify when a sensor enters a critical state."
              last
            >
              <span
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Enabled
              </span>
            </SettingRow>
          </SettingsSection>

          {/* Security */}
          <SettingsSection
            icon={<Shield size={18} />}
            title="Security"
            description="Manage authentication and system access."
          >
            <SettingRow
              icon={<Shield size={16} />}
              title="Two-Factor Authentication"
              description="Additional protection for administrator accounts."
            >
              <StatusBadge tone="success">
                Enabled
              </StatusBadge>
            </SettingRow>

            <SettingRow
              icon={<KeyRound size={16} />}
              title="API Access"
              description="Manage keys used by external applications and integrations."
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 7,
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                Manage keys
              </span>
            </SettingRow>

            <SettingRow
              icon={<Clock size={16} />}
              title="Session Timeout"
              description="Automatically sign out inactive users."
              last
            >
              <select defaultValue="30" style={selectStyle}>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </SettingRow>
          </SettingsSection>

          {/* Billing */}
          <SettingsSection
            icon={<CreditCard size={18} />}
            title="Billing & Subscription"
            description="View your current plan and billing configuration."
          >
            <SettingRow
              icon={<CreditCard size={16} />}
              title="Current Plan"
              description="Your active management platform subscription."
            >
              <span
                style={{
                  padding: "5px 9px",
                  borderRadius: 6,
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Enterprise
              </span>
            </SettingRow>

            <SettingRow
              icon={<Database size={16} />}
              title="Data Retention"
              description="Historical environmental data retention period."
            >
              <span
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                12 months
              </span>
            </SettingRow>

            <SettingRow
              icon={<CreditCard size={16} />}
              title="Billing Management"
              description="Invoices, payment methods, and subscription details."
              last
            >

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 7,
                  backgroundColor: "var(--bg-tertiary)",
                  color: "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                Manage keys
              </span>
            </SettingRow>
          </SettingsSection>
        </div>

        {/* Right sidebar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Account */}
          <div
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 18px",
                borderBottom: "1px solid var(--border-primary)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Account
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  marginTop: 3,
                }}
              >
                Administrator profile
              </div>
            </div>

            <div style={{ padding: 18 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                <div
                  className="stat-icon brand"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 11,
                    flexShrink: 0,
                  }}
                >
                  <User size={18} />
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: "var(--text-primary)",
                    }}
                  >
                    Administrator
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-tertiary)",
                      marginTop: 2,
                    }}
                  >
                    System Administrator
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="header-btn"
                style={{
                  width: "100%",
                  height: 36,
                  borderRadius: 8,
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                Manage Profile
              </button>
            </div>
          </div>

          {/* Maintenance */}
          <div
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: 12,
              padding: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                marginBottom: 6,
              }}
            >
              <Settings
                size={17}
                style={{ color: "var(--text-tertiary)" }}
              />

              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Maintenance Mode
              </span>
            </div>

            <p
              style={{
                margin: "0 0 16px",
                fontSize: 11,
                lineHeight: 1.5,
                color: "var(--text-tertiary)",
              }}
            >
              Temporarily restrict system operations while maintenance
              work is being performed.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: 10,
                borderRadius: 8,
                backgroundColor: "var(--bg-tertiary)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                }}
              >
                System access
              </div>

              <Toggle
                checked={maintenanceMode}
                onChange={setMaintenanceMode}
              />
            </div>
          </div>

          {/* Configuration summary */}
          <div
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: 12,
              padding: 18,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: 14,
              }}
            >
              Configuration
            </div>

            <InfoRow
              label="Environment"
              value="Production"
            />

            <InfoRow
              label="API Status"
              value="Connected"
            />

            <InfoRow
              label="Last Backup"
              value="Today, 03:00"
            />

            <InfoRow
              label="Version"
              value="v2.4.0"
              last
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "16px 18px",
          borderBottom: "1px solid var(--border-primary)",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--bg-tertiary)",
            color: "var(--text-tertiary)",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              marginTop: 2,
            }}
          >
            {description}
          </div>
        </div>
      </div>

      <div>{children}</div>
    </section>
  );
}

function SettingRow({
  icon,
  title,
  description,
  children,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        padding: "15px 18px",
        borderBottom: last
          ? "none"
          : "1px solid var(--border-primary)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 11,
          minWidth: 0,
        }}
      >
        <div
          style={{
            color: "var(--text-tertiary)",
            marginTop: 2,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 11,
              lineHeight: 1.4,
              color: "var(--text-tertiary)",
              marginTop: 3,
            }}
          >
            {description}
          </div>
        </div>
      </div>

      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function StatusCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "success" | "warning" | "danger";
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "13px 15px",
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--bg-tertiary)",
          color:
            tone === "success"
              ? "var(--color-success)"
              : tone === "warning"
                ? "var(--color-warning)"
                : "var(--color-danger)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: 10,
            color: "var(--text-tertiary)",
            marginBottom: 2,
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "9px 0",
        borderBottom: last
          ? "none"
          : "1px solid var(--border-primary)",
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: "var(--text-tertiary)",
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--text-secondary)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        position: "relative",
        width: 38,
        height: 21,
        padding: 0,
        border: "none",
        borderRadius: 20,
        backgroundColor: checked
          ? "var(--color-success)"
          : "var(--bg-tertiary)",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 20 : 3,
          width: 15,
          height: 15,
          borderRadius: "50%",
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          transition: "left 0.2s ease",
        }}
      />
    </button>
  );
}

const selectStyle: React.CSSProperties = {
  height: 32,
  minWidth: 150,
  padding: "0 9px",
  borderRadius: 7,
  border: "1px solid var(--border-primary)",
  backgroundColor: "var(--bg-tertiary)",
  color: "var(--text-secondary)",
  fontSize: 12,
  outline: "none",
  cursor: "pointer",
};
