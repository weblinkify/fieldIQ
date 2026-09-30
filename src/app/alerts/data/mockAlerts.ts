import type { Alert } from "@/lib/types";

export const mockAlerts: Alert[] = [
  {
    id: "mock-alert-001",
    siteId: "SITE-001",
    siteName: "Helsinki Data Center",
    severity: "critical",
    message:
      "Temperature exceeded critical",
    sensorType: "temperature",
    value: 31.8,
    threshold: 30,
    timestamp: new Date(
      Date.now() - 2 * 60 * 1000
    ).toISOString(),
    acknowledged: false,
  },

  {
    id: "mock-alert-002",
    siteId: "SITE-002",
    siteName: "Helsinki Office",
    severity: "warning",
    message:
      "CO2 level is above recommended range",
    sensorType: "noise",
    value: 1248,
    threshold: 1000,
    timestamp: new Date(
      Date.now() - 12 * 60 * 1000
    ).toISOString(),
    acknowledged: false,
  },
];