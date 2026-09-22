"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Cpu,
  Wifi,
  WifiOff,
  AlertTriangle,
  MoreHorizontal,
  Clock,
  Settings2,
  Activity,
} from "lucide-react";

import type { DashboardData } from "@/lib/types";

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

export default function DevicesPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

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
      console.error("Failed to fetch devices:", error);
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

  const devices = useMemo(() => {
    return sites.map((site) => ({
      ...site.device,
      siteName: site.name,
      siteId: site.id,
      alertCount: site.alertCount,
    }));
  }, [sites]);

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch =
        device.name.toLowerCase().includes(search.toLowerCase()) ||
        device.id.toLowerCase().includes(search.toLowerCase()) ||
        device.siteName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || device.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [devices, search, status]);

  const onlineDevices = devices.filter((d) => d.status === "online").length;
  const warningDevices = devices.filter((d) => d.status === "warning").length;
  const offlineDevices = devices.filter((d) => d.status === "offline").length;

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
        title="Devices"
        description="Monitor sensor hardware health, battery levels, and connectivity."
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

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          icon={<Cpu size={22} />}
          label="Total Devices"
          value={devices.length}
          tone="brand"
        />
        <StatCard
          icon={<Wifi size={22} />}
          label="Online & Active"
          value={onlineDevices}
          tone="success"
        />
        <StatCard
          icon={<AlertTriangle size={22} />}
          label="Requires Attention"
          value={warningDevices}
          tone="warning"
        />
        <StatCard
          icon={<WifiOff size={22} />}
          label="Offline"
          value={offlineDevices}
          tone="danger"
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
          placeholder="Search device name, ID, or site..."
        />

        <FilterSelect value={status} onChange={setStatus}>
          <option value="all">All statuses</option>
          <option value="online">Online</option>
          <option value="warning">Warning</option>
          <option value="offline">Offline</option>
        </FilterSelect>
      </div>

      <Table>
        <TableHeader>
          <tr>
            <TableHead>Device & Model</TableHead>
            <TableHead>Assigned Site</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Battery</TableHead>
            <TableHead>Firmware</TableHead>
            <TableHead>Last Sync</TableHead>
            <TableHead />
          </tr>
        </TableHeader>

        <TableBody>
          {filteredDevices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="stat-icon brand" style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0 }}>
                    <Cpu size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 13 }}>
                      {device.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                      <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                        {device.id}
                      </span>
                      {device.alertCount > 0 && (
                        <span className="status-badge offline" style={{ fontSize: 10, padding: "1px 6px", gap: 4 }}>
                          <AlertTriangle size={10} />
                          {device.alertCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div style={{ fontWeight: 500, color: "var(--text-primary)" }}>
                  {device.siteName}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace", marginTop: 2 }}>
                  {device.siteId}
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
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {device.status === "online" ? <Wifi size={11} /> : device.status === "warning" ? <AlertTriangle size={11} /> : <WifiOff size={11} />}
                    {device.status}
                  </span>
                </StatusBadge>
              </TableCell>

              <TableCell>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 60, height: 6, borderRadius: 3, backgroundColor: "var(--bg-tertiary)", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${device.batteryLevel}%`,
                        height: "100%",
                        borderRadius: 3,
                        backgroundColor: device.batteryLevel > 20 ? "var(--color-success)" : "var(--color-danger)",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>
                    {device.batteryLevel.toFixed(0)}%
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "3px 8px",
                  borderRadius: 6,
                  backgroundColor: "var(--bg-tertiary)",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                }}>
                  <Settings2 size={12} style={{ color: "var(--text-tertiary)" }} />
                  v{device.firmwareVersion}
                </span>
              </TableCell>

              <TableCell>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-secondary)" }}>
                  <Clock size={13} style={{ color: "var(--text-tertiary)" }} />
                  {new Date(device.lastSeen).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </TableCell>

              <TableCell>
                <button
                  className="header-btn"
                  style={{ width: 32, height: 32, borderRadius: 8, cursor: "pointer" }}
                  aria-label="Device actions"
                >
                  <MoreHorizontal size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}

          {filteredDevices.length === 0 && (
            <tr>
              <td colSpan={7}>
                <EmptyState
                  title="No devices found"
                  description="Try changing your search or status filter."
                />
              </td>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
