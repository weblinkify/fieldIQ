"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  MoreHorizontal,
  TestTube2,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  Check,
  RotateCcw,
  Eye,
} from "lucide-react";

import type { DashboardData, Alert } from "@/lib/types";

import {
  EmptyState,
  FilterSelect,
  PageHeader,
  RefreshButton,
  SearchBox,
  SimBadge,
  StatCard,
  StatusBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/management/management-ui";

type AlertSeverity = "critical" | "warning" | "info";

type AlertFilter = "all" | AlertSeverity;

export default function AlertsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<AlertFilter>("all");

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [acknowledged, setAcknowledged] = useState<Set<string>>(
    new Set()
  );

  const fetchData = async (manual = false) => {
    try {
      if (manual) setRefreshing(true);

      const response = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Close action menu when clicking outside.
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(null);
    };

    if (openMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenu]);

  // const alerts = data?.recentAlerts ?? [];

  const mockAlerts: Alert[] = [
    {
      id: "mock-alert-001",
      siteId: "SITE-001",
      siteName: "Helsinki Data Center",
      severity: "critical",
      message: "Temperature exceeded critical threshold in Server Room",
      sensorType: "temperature",
      value: 31.8,
      threshold: 30,
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      acknowledged: false,
    },
    {
      id: "mock-alert-002",
      siteId: "SITE-002",
      siteName: "Helsinki Office",
      severity: "warning",
      message: "CO2 level is above recommended range in Conference Room A",
      sensorType: "noise",
      value: 1248,
      threshold: 1000,
      timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      acknowledged: false,
    },
  ];

  const alerts = [...mockAlerts, ...(data?.recentAlerts ?? [])];
  const isAlertAcknowledged = (alert: Alert) => {
    return alert.acknowledged || acknowledged.has(alert.id);
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert: Alert) => {
      const query = search.toLowerCase();

      const matchesSearch =
        alert.message.toLowerCase().includes(query) ||
        alert.siteId.toLowerCase().includes(query);

      const matchesSeverity =
        severity === "all" || alert.severity === severity;

      return matchesSearch && matchesSeverity;
    });
  }, [alerts, search, severity]);

  const criticalAlerts = alerts.filter(
    (alert: Alert) =>
      alert.severity === "critical" &&
      !isAlertAcknowledged(alert)
  ).length;

  const warningAlerts = alerts.filter(
    (alert: Alert) =>
      alert.severity === "warning" &&
      !isAlertAcknowledged(alert)
  ).length;

  const resolvedAlerts = alerts.filter(
    (alert: Alert) => isAlertAcknowledged(alert)
  ).length;

  const acknowledgeAlert = (alertId: string) => {
    setAcknowledged((previous) => {
      const next = new Set(previous);
      next.add(alertId);
      return next;
    });

    setOpenMenu(null);
  };

  const unacknowledgeAlert = (alertId: string) => {
    setAcknowledged((previous) => {
      const next = new Set(previous);
      next.delete(alertId);
      return next;
    });

    setOpenMenu(null);
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case "temperature":
        return <Thermometer size={14} className="text-orange-500" />;

      case "humidity":
        return <Droplets size={14} className="text-blue-500" />;

      case "co2":
        return <Wind size={14} className="text-slate-500" />;

      default:
        return <AlertCircle size={14} className="text-zinc-500" />;
    }
  };

  if (loading && !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-spin text-brand-primary">
          <AlertCircle size={32} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="stagger-in"
      onClick={() => setOpenMenu(null)}
    >
      <PageHeader
        title="Alerts"
        description="Monitor sensor thresholds, anomalies, and active incidents across all sites."
        action={
          <>
            <SimBadge />

            <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <TestTube2 size={14} />
              Simulation Mode
            </div>

            <RefreshButton
              onClick={() => fetchData(true)}
              loading={refreshing}
            />
          </>
        }
      />

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          icon={<Bell size={22} />}
          label="Total Alerts"
          value={alerts.length}
          tone="brand"
        />

        <StatCard
          icon={<AlertCircle size={22} />}
          label="Critical"
          value={criticalAlerts}
          tone="danger"
        />

        <StatCard
          icon={<AlertTriangle size={22} />}
          label="Warnings"
          value={warningAlerts}
          tone="warning"
        />

        <StatCard
          icon={<CheckCircle2 size={22} />}
          label="Resolved"
          value={resolvedAlerts}
          tone="success"
        />
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search by message or site ID..."
        />

        <FilterSelect
          value={severity}
          onChange={(value) => setSeverity(value as AlertFilter)}
        >
          <option value="all">All severities</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </FilterSelect>
      </div>

      {/* Alerts Table */}
      <Table>
        <TableHeader>
          <tr>
            <TableHead>Severity & Status</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Sensor Type</TableHead>
            <TableHead>Site</TableHead>
            <TableHead>Time</TableHead>
            <TableHead />
          </tr>
        </TableHeader>

        <TableBody>
          {filteredAlerts.map((alert: Alert) => {
            const isResolved = isAlertAcknowledged(alert);

            const statusTone =
              isResolved
                ? "success"
                : alert.severity === "critical"
                  ? "danger"
                  : alert.severity === "warning"
                    ? "warning"
                    : "neutral";

            return (
              <TableRow
                key={alert.id}
                className={isResolved ? "opacity-60" : ""}
              >
                <TableCell>
                  <StatusBadge tone={statusTone}>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                      {isResolved ? (
                        <CheckCircle2 size={12} />
                      ) : alert.severity === "critical" ? (
                        <AlertCircle size={12} />
                      ) : alert.severity === "warning" ? (
                        <AlertTriangle size={12} />
                      ) : (
                        <Bell size={12} />
                      )}

                      {isResolved ? "Resolved" : alert.severity}
                    </div>
                  </StatusBadge>
                </TableCell>

                <TableCell>
                  <div className="max-w-md">
                    <div
                      style={{
                        color: isResolved
                          ? "var(--text-secondary)"
                          : "var(--text-primary)",
                        fontWeight: 500,
                        fontSize: 13,
                        lineHeight: 1.4,
                      }}
                    >
                      {alert.message}
                    </div>

                    {alert.value !== undefined && (
                      <div className="mt-0.5 text-xs text-zinc-500">
                        Reading:{" "}
                        <span className="font-mono">
                          {alert.value.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="inline-flex items-center gap-1.5 rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                    {getSensorIcon(alert.sensorType)}

                    <span className="capitalize">
                      {alert.sensorType}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {data?.sites.find(
                      (site) => site.id === alert.siteId
                    )?.name || alert.siteId}
                  </div>

                  <div className="font-mono text-xs text-zinc-400">
                    {alert.siteId}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} />

                      {new Date(
                        alert.timestamp
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>

                    <div className="text-xs text-zinc-400">
                      {new Date(
                        alert.timestamp
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div
                    style={{
                      position: "relative",
                    }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      className="header-btn"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                      aria-label="Alert actions"
                      aria-expanded={openMenu === alert.id}
                      onClick={() =>
                        setOpenMenu(
                          openMenu === alert.id
                            ? null
                            : alert.id
                        )
                      }
                    >
                      <MoreHorizontal size={17} />
                    </button>

                    {openMenu === alert.id && (
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 38,
                          zIndex: 50,
                          width: 170,
                          padding: 4,
                          borderRadius: 10,
                          border:
                            "1px solid var(--border-primary)",
                          background:
                            "var(--bg-secondary)",
                          boxShadow:
                            "0 10px 30px rgba(0,0,0,0.15)",
                        }}
                      >
                        <button
                          onClick={() => {
                            // Add your details modal/navigation here.
                            setOpenMenu(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          <Eye size={14} />
                          View details
                        </button>

                        {isResolved ? (
                          <button
                            onClick={() =>
                              unacknowledgeAlert(alert.id)
                            }
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                          >
                            <RotateCcw size={14} />
                            Mark unresolved
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              acknowledgeAlert(alert.id)
                            }
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                          >
                            <Check size={14} />
                            Acknowledge
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}

          {filteredAlerts.length === 0 && (
            <tr>
              <td colSpan={6}>
                <EmptyState
                  title="No alerts found"
                  description={
                    alerts.length === 0
                      ? "Everything is running smoothly."
                      : "Try changing your search or severity filter."
                  }
                />
              </td>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
