/**
 * FieldIQ — Status Badge Component
 *
 * Displays a small pill-shaped badge indicating whether a device
 * is online, offline, or has a warning.
 */
import { cn } from "@/lib/utils";
import type { DeviceStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: DeviceStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const labels: Record<DeviceStatus, string> = {
    online: "Online",
    offline: "Offline",
    warning: "Warning",
  };

  return (
    <div className={cn("status-badge", status)}>
      {/* 
        The pulse animation is only active when online.
        It gives the impression of a heartbeat/active connection.
      */}
      <span className={cn("status-dot", status === "online" && "pulse")} />
      {labels[status]}
    </div>
  );
}
