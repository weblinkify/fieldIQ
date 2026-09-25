"use client";

import { Activity, Bell, Building2, Cpu } from "lucide-react";
import { StatCard } from "@/components/management/management-ui";
import type { DashboardData } from "@/lib/types";

interface SitesStatsProps {
  data: DashboardData | null;
}

export default function SitesStats({ data }: SitesStatsProps) {
  const sites = data?.sites ?? [];

  const onlineSites = sites.filter(
    (site) => site.device.status === "online"
  ).length;

  const sitesWithAlerts = sites.filter(
    (site) => site.alertCount > 0
  ).length;

  return (
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
        value={sitesWithAlerts}
        tone="warning"
      />

      <StatCard
        icon={<Cpu size={22} />}
        label="Devices"
        value={data?.stats.totalDevices ?? 0}
        tone="brand"
      />
    </div>
  );
}
