import {
  EmptyState,
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/management/management-ui";

import type {
  Alert,
  DashboardData,
} from "@/lib/types";

import { AlertRow } from "./AlertRow";

interface AlertsTableProps {
  alerts: Alert[];
  totalAlerts: number;
  sites: DashboardData["sites"];
  isAcknowledged: (alert: Alert) => boolean;
  onAcknowledge: (alertId: string) => void;
  onUnacknowledge: (alertId: string) => void;
}

export function AlertsTable({
  alerts,
  totalAlerts,
  sites,
  isAcknowledged,
  onAcknowledge,
  onUnacknowledge,
}: AlertsTableProps) {
  return (
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
        {alerts.map((alert) => {
          const isResolved = isAcknowledged(alert);

          const siteName =
            sites.find(
              (site) => site.id === alert.siteId
            )?.name ||
            alert.siteName ||
            alert.siteId;

          return (
            <AlertRow
              key={alert.id}
              alert={alert}
              siteName={siteName}
              isResolved={isResolved}
              onAcknowledge={() =>
                onAcknowledge(alert.id)
              }
              onUnacknowledge={() =>
                onUnacknowledge(alert.id)
              }
            />
          );
        })}

        {alerts.length === 0 && (
          <tr>
            <td colSpan={6}>
              <EmptyState
                title="No alerts found"
                description={
                  totalAlerts === 0
                    ? "Everything is running smoothly."
                    : "Try changing your search or severity filter."
                }
              />
            </td>
          </tr>
        )}
      </TableBody>
    </Table>
  );
}