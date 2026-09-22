"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Building2,
  Cpu,
  Bell,
  MoreHorizontal,
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

export default function SitesPage() {
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
      console.error("Failed to fetch sites:", error);
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
        site.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        site.location
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        site.device.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        site.device.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [sites, search, status]);

  const onlineSites = sites.filter(
    (site) => site.device.status === "online"
  ).length;

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
        title="Sites"
        description="Manage monitored locations and their environmental health."
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
          icon={<Building2 size={22} />}
          label="Active Sites"
          value={data?.stats.totalSites ?? 0}
          tone="brand"
        />
        <StatCard
          icon={<Activity size={22} />}
          label="Online"
          value={onlineSites}
          tone="success"
        />
        <StatCard
          icon={<Bell size={22} />}
          label="With Alerts"
          value={sites.filter((s) => s.alertCount > 0).length}
          tone="warning"
        />
        <StatCard
          icon={<Cpu size={22} />}
          label="Devices"
          value={data?.stats.totalDevices ?? 0}
          tone="brand"
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
          placeholder="Search sites or locations..."
        />

        <FilterSelect value={status} onChange={setStatus}>
          <option value="all">All device states</option>
          <option value="online">Online</option>
          <option value="warning">Warning</option>
          <option value="offline">Offline</option>
        </FilterSelect>
      </div>

      <Table>
        <TableHeader>
          <tr>
            <TableHead>Site</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sensors</TableHead>
            <TableHead>Alerts</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead />
          </tr>
        </TableHeader>

        <TableBody>
          {filteredSites.map((site) => {
            const sensorCount = site.currentReadings?.length ?? 0;

            return (
              <TableRow key={site.id}>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="stat-icon brand" style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0 }}>
                      <Building2 size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 13 }}>
                        {site.name}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace", marginTop: 2 }}>
                        {site.id}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                    <MapPin size={14} style={{ color: "var(--text-tertiary)", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ color: "var(--text-primary)" }}>{site.location}</div>
                      {site.description && (
                        <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {site.description}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div style={{ fontWeight: 500, color: "var(--text-primary)" }}>
                    {site.device.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace", marginTop: 2 }}>
                    v{site.device.firmwareVersion}
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge
                    tone={
                      site.device.status === "online"
                        ? "success"
                        : site.device.status === "warning"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {site.device.status}
                  </StatusBadge>
                </TableCell>

                <TableCell>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    borderRadius: 8,
                    backgroundColor: "var(--bg-tertiary)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}>
                    <Activity size={13} style={{ color: "var(--text-tertiary)" }} />
                    {sensorCount}
                  </span>
                </TableCell>

                <TableCell>
                  {site.alertCount > 0 ? (
                    <StatusBadge tone="danger">
                      {site.alertCount} active
                    </StatusBadge>
                  ) : (
                    <StatusBadge tone="success">
                      Healthy
                    </StatusBadge>
                  )}
                </TableCell>

                <TableCell>
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
                    {new Date(site.device.lastSeen).toLocaleString()}
                  </span>
                </TableCell>

                <TableCell>
                  <button
                    className="header-btn"
                    style={{ width: 32, height: 32, borderRadius: 8, cursor: "pointer" }}
                    aria-label="Site actions"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}

          {filteredSites.length === 0 && (
            <tr>
              <td colSpan={8}>
                <EmptyState
                  title="No sites found"
                  description="Try changing your search or status filter."
                />
              </td>
            </tr>
          )}
        </TableBody>
      </Table>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 12, color: "var(--text-tertiary)" }}>
        <span>
          Showing {filteredSites.length} of {sites.length} sites
        </span>
        <span>
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
