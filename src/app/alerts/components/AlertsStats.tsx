import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle2,
} from "lucide-react";

import {
  StatCard,
} from "@/components/management/management-ui";

import type { Alert } from "@/lib/types";

interface AlertsStatsProps {
  alerts: Alert[];
  isAcknowledged: (alert: Alert) => boolean;
}

export function AlertsStats({
  alerts,
  isAcknowledged,
}: AlertsStatsProps) {
  const criticalAlerts = alerts.filter(
    (alert) =>
      alert.severity === "critical" &&
      !isAcknowledged(alert)
  ).length;

  const warningAlerts = alerts.filter(
    (alert) =>
      alert.severity === "warning" &&
      !isAcknowledged(alert)
  ).length;

  const resolvedAlerts = alerts.filter(
    (alert) => isAcknowledged(alert)
  ).length;

  return (
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
  );
}