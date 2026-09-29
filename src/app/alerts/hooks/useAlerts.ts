import { useCallback, useEffect, useState } from "react";

import type {
  Alert,
  DashboardData,
} from "@/lib/types";

import { mockAlerts } from "../data/mockAlerts";

export function useAlerts() {
  const [data, setData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [acknowledged, setAcknowledged] =
    useState<Set<string>>(new Set());

  const fetchData = useCallback(
    async (manual = false) => {
      try {
        if (manual) {
          setRefreshing(true);
        }

        const response = await fetch("/api/dashboard", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Dashboard request failed: ${response.status}`
          );
        }

        const result = await response.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch alerts:",
          error
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  const acknowledgeAlert = useCallback(
    (alertId: string) => {
      setAcknowledged((previous) => {
        const next = new Set(previous);
        next.add(alertId);
        return next;
      });
    },
    []
  );

  const unacknowledgeAlert = useCallback(
    (alertId: string) => {
      setAcknowledged((previous) => {
        const next = new Set(previous);
        next.delete(alertId);
        return next;
      });
    },
    []
  );

  const alerts: Alert[] = [
    ...mockAlerts,
    ...(data?.recentAlerts ?? []),
  ];

  const isAcknowledged = useCallback(
    (alert: Alert) => {
      return (
        alert.acknowledged ||
        acknowledged.has(alert.id)
      );
    },
    [acknowledged]
  );

  return {
    data,
    alerts,
    loading,
    refreshing,
    isAcknowledged,
    acknowledgeAlert,
    unacknowledgeAlert,
    refresh: fetchData,
  };
}