"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  Droplets,
  Download,
  Gauge,
  Leaf,
  RefreshCw,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";

import type { DashboardData } from "@/lib/types";

import {
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

export default function AnalyticsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("7d");
  const [siteFilter, setSiteFilter] = useState("all");

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
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();

    const interval = setInterval(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sites = data?.sites ?? [];

  const filteredSites = useMemo(() => {
    return sites.filter((site) => {
      const matchesSearch =
        site.name.toLowerCase().includes(search.toLowerCase()) ||
        site.id.toLowerCase().includes(search.toLowerCase());

      const matchesSite =
        siteFilter === "all" || site.id === siteFilter;

      return matchesSearch && matchesSite;
    });
  }, [sites, search, siteFilter]);

  const totalSites = sites.length;

  const totalAlerts = sites.reduce(
    (sum, site) => sum + (site.alertCount ?? 0),
    0
  );

  const onlineDevices = sites.filter(
    (site) => site.device.status === "online"
  ).length;

  const averageBattery =
    sites.length > 0
      ? sites.reduce(
          (sum, site) => sum + site.device.batteryLevel,
          0
        ) / sites.length
      : 0;

  const totalDevices = sites.length;

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin text-brand-primary">
          <Activity size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="stagger-in">
      <PageHeader
        title="Analytics"
        description="Analyze environmental trends, device performance, and site health."
        action={
          <>
            <SimBadge />

            <RefreshButton
              onClick={() => fetchData(true)}
              loading={refreshing}
            />
          </>
        }
      />

      {/* Summary */}
      <div className="stats-grid">
        <StatCard
          icon={<BarChart3 size={22} />}
          label="Sites Analyzed"
          value={totalSites}
          tone="brand"
        />

        <StatCard
          icon={<Activity size={22} />}
          label="Active Devices"
          value={`${onlineDevices}/${totalDevices}`}
          tone="success"
        />

        <StatCard
          icon={<AlertTriangle size={22} />}
          label="Total Alerts"
          value={totalAlerts}
          tone={totalAlerts > 0 ? "warning" : "success"}
        />

        <StatCard
          icon={<Gauge size={22} />}
          label="Avg. Battery"
          value={`${averageBattery.toFixed(0)}%`}
          tone={averageBattery > 20 ? "success" : "danger"}
        />
      </div>

      {/* Filters */}
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
          placeholder="Search site or site ID..."
        />

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FilterSelect value={period} onChange={setPeriod}>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </FilterSelect>

          <FilterSelect
            value={siteFilter}
            onChange={setSiteFilter}
          >
            <option value="all">All sites</option>

            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </FilterSelect>
        </div>
      </div>

      {/* Trend Overview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
          gap: 16,
          marginBottom: 16,
        }}
      >
        {/* Environmental trend card */}
        <div
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-primary)",
            borderRadius: 12,
            padding: 20,
            minHeight: 320,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Environmental Trends
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-tertiary)",
                  marginTop: 4,
                }}
              >
                Average sensor readings over the selected period
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12,
                color: "var(--color-success)",
                fontWeight: 600,
              }}
            >
              <TrendingDown size={14} />
              Stable
            </div>
          </div>

          {/* Chart placeholder */}
          <div
            style={{
              height: 210,
              position: "relative",
              borderLeft: "1px solid var(--border-primary)",
              borderBottom: "1px solid var(--border-primary)",
              padding: "20px 12px 0",
            }}
          >
            {/* Grid lines */}
            <div
              style={{
                position: "absolute",
                inset: "20px 0 0 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                pointerEvents: "none",
              }}
            >
              {[0, 1, 2, 3, 4].map((line) => (
                <div
                  key={line}
                  style={{
                    borderTop: "1px dashed var(--border-primary)",
                    width: "100%",
                  }}
                />
              ))}
            </div>

            {/* Simple trend visualization */}
            <div
              style={{
                position: "absolute",
                left: 20,
                right: 20,
                top: 35,
                bottom: 20,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              {[58, 64, 52, 70, 62, 76, 68, 82, 72, 78, 69, 84].map(
                (height, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      maxWidth: 34,
                      height: `${height}%`,
                      minHeight: 20,
                      borderRadius: "5px 5px 0 0",
                      backgroundColor:
                        index % 3 === 0
                          ? "var(--color-primary)"
                          : "var(--color-success)",
                      opacity: 0.75,
                      transition: "height 0.3s ease",
                    }}
                  />
                )
              )}
            </div>

            {/* X axis labels */}
            <div
              style={{
                position: "absolute",
                left: 20,
                right: 20,
                bottom: -22,
                display: "flex",
                justifyContent: "space-between",
                color: "var(--text-tertiary)",
                fontSize: 10,
              }}
            >
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <Legend
              icon={<Thermometer size={13} />}
              label="Temperature"
            />

            <Legend
              icon={<Wind size={13} />}
              label="Air Quality"
            />

            <Legend
              icon={<Droplets size={13} />}
              label="Humidity"
            />
          </div>
        </div>

        {/* Health overview */}
        <div
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-primary)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            System Health
          </div>

          <div
            style={{
              fontSize: 12,
              color: "var(--text-tertiary)",
              marginTop: 4,
              marginBottom: 22,
            }}
          >
            Current infrastructure performance
          </div>

          <HealthRow
            icon={<Activity size={16} />}
            label="Device Connectivity"
            value={
              totalDevices > 0
                ? `${Math.round(
                    (onlineDevices / totalDevices) * 100
                  )}%`
                : "0%"
            }
            progress={
              totalDevices > 0
                ? (onlineDevices / totalDevices) * 100
                : 0
            }
            tone="success"
          />

          <HealthRow
            icon={<Zap size={16} />}
            label="Power Health"
            value={`${averageBattery.toFixed(0)}%`}
            progress={averageBattery}
            tone={averageBattery > 20 ? "success" : "warning"}
          />

          <HealthRow
            icon={<CheckCircle2 size={16} />}
            label="Sites Reporting"
            value={`${totalSites}`}
            progress={100}
            tone="success"
          />

          <HealthRow
            icon={<AlertTriangle size={16} />}
            label="Active Alerts"
            value={`${totalAlerts}`}
            progress={
              totalSites > 0
                ? Math.min((totalAlerts / totalSites) * 25, 100)
                : 0
            }
            tone={totalAlerts > 0 ? "warning" : "success"}
          />
        </div>
      </div>

      {/* Metric cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <MetricCard
          icon={<Thermometer size={18} />}
          label="Temperature"
          value="24.6°C"
          change="+0.8%"
          trend="up"
          description="Average"
        />

        <MetricCard
          icon={<Droplets size={18} />}
          label="Humidity"
          value="54.2%"
          change="-1.4%"
          trend="down"
          description="Average"
        />

        <MetricCard
          icon={<Wind size={18} />}
          label="Air Quality"
          value="Good"
          change="12%"
          trend="down"
          description="Improvement"
        />

        <MetricCard
          icon={<Leaf size={18} />}
          label="Environment Score"
          value="92"
          change="+3.2%"
          trend="up"
          description="Overall score"
        />
      </div>

      {/* Site analytics */}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "16px 18px",
            borderBottom: "1px solid var(--border-primary)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Site Performance
            </div>

            <div
              style={{
                fontSize: 12,
                color: "var(--text-tertiary)",
                marginTop: 3,
              }}
            >
              Compare current performance across monitored sites
            </div>
          </div>

          <button
            type="button"
            className="header-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "7px 10px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text-secondary)",
            }}
          >
            <Download size={14} />
            Export
          </button>
        </div>

        <Table>
          <TableHeader>
            <tr>
              <TableHead>Site</TableHead>
              <TableHead>Device Status</TableHead>
              <TableHead>Battery</TableHead>
              <TableHead>Alerts</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Last Sync</TableHead>
            </tr>
          </TableHeader>

          <TableBody>
            {filteredSites.map((site) => {
              const device = site.device;
              const performance =
                device.status === "online"
                  ? Math.min(
                      98,
                      Math.max(80, device.batteryLevel + 25)
                    )
                  : device.status === "warning"
                    ? 68
                    : 35;

              return (
                <TableRow key={site.id}>
                  <TableCell>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 13,
                          color: "var(--text-primary)",
                        }}
                      >
                        {site.name}
                      </div>

                      <div
                        style={{
                          marginTop: 2,
                          fontSize: 11,
                          fontFamily: "monospace",
                          color: "var(--text-tertiary)",
                        }}
                      >
                        {site.id}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusBadge
                      tone={
                        device.status === "online"
                          ? "success"
                          : device.status === "warning"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {device.status}
                    </StatusBadge>
                  </TableCell>

                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 60,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "var(--bg-tertiary)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${device.batteryLevel}%`,
                            height: "100%",
                            borderRadius: 3,
                            backgroundColor:
                              device.batteryLevel > 20
                                ? "var(--color-success)"
                                : "var(--color-danger)",
                          }}
                        />
                      </div>

                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                        }}
                      >
                        {device.batteryLevel.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        color:
                          site.alertCount > 0
                            ? "var(--color-danger)"
                            : "var(--color-success)",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {site.alertCount > 0 ? (
                        <AlertTriangle size={13} />
                      ) : (
                        <CheckCircle2 size={13} />
                      )}

                      {site.alertCount}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 70,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "var(--bg-tertiary)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${performance}%`,
                            height: "100%",
                            borderRadius: 3,
                            backgroundColor:
                              performance >= 80
                                ? "var(--color-success)"
                                : performance >= 60
                                  ? "var(--color-warning)"
                                  : "var(--color-danger)",
                          }}
                        />
                      </div>

                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                        }}
                      >
                        {performance.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 12,
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Clock
                        size={13}
                        style={{
                          color: "var(--text-tertiary)",
                        }}
                      />

                      {new Date(
                        device.lastSeen
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {filteredSites.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: 30,
                    textAlign: "center",
                    color: "var(--text-tertiary)",
                  }}
                >
                  No sites found.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer information */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 14,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 11,
            color: "var(--text-tertiary)",
          }}
        >
          <RefreshCw size={12} />
          Analytics update automatically every 5 seconds
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 11,
            color: "var(--text-tertiary)",
          }}
        >
          <CalendarDays size={12} />
          Period:{" "}
          <span style={{ color: "var(--text-secondary)" }}>
            {period === "24h"
              ? "Last 24 hours"
              : period === "7d"
                ? "Last 7 days"
                : period === "30d"
                  ? "Last 30 days"
                  : "Last 90 days"}
          </span>
        </div>
      </div>
    </div>
  );
}

function Legend({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: "var(--text-secondary)",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          color: "var(--text-tertiary)",
        }}
      >
        {icon}
      </span>

      {label}
    </div>
  );
}

function HealthRow({
  icon,
  label,
  value,
  progress,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  progress: number;
  tone: "success" | "warning";
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            color: "var(--text-secondary)",
          }}
        >
          <span style={{ color: "var(--text-tertiary)" }}>
            {icon}
          </span>

          {label}
        </div>

        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color:
              tone === "success"
                ? "var(--color-success)"
                : "var(--color-warning)",
          }}
        >
          {value}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: 6,
          borderRadius: 3,
          backgroundColor: "var(--bg-tertiary)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
            height: "100%",
            borderRadius: 3,
            backgroundColor:
              tone === "success"
                ? "var(--color-success)"
                : "var(--color-warning)",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  change,
  trend,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          marginBottom: 14,
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
          }}
        >
          {icon}
        </div>

        <span
          style={{
            fontSize: 12,
            color: "var(--text-secondary)",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 9,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {value}
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            fontSize: 11,
            fontWeight: 600,
            color:
              trend === "up"
                ? "var(--color-success)"
                : "var(--color-success)",
          }}
        >
          {trend === "up" ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}

          {change}
        </span>
      </div>

      <div
        style={{
          fontSize: 11,
          color: "var(--text-tertiary)",
          marginTop: 4,
        }}
      >
        {description}
      </div>
    </div>
  );
}