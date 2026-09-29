import { useMemo, useState } from "react";

import type { Alert } from "@/lib/types";

export type AlertSeverity =
  | "critical"
  | "warning"
  | "info";

export type AlertFilter = "all" | AlertSeverity;

export function useAlertFilters(alerts: Alert[]) {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] =
    useState<AlertFilter>("all");

  const filteredAlerts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return alerts.filter((alert) => {
      const matchesSearch =
        alert.message.toLowerCase().includes(query) ||
        alert.siteId.toLowerCase().includes(query);

      const matchesSeverity =
        severity === "all" ||
        alert.severity === severity;

      return matchesSearch && matchesSeverity;
    });
  }, [alerts, search, severity]);

  return {
    search,
    setSearch,
    severity,
    setSeverity,
    filteredAlerts,
  };
}