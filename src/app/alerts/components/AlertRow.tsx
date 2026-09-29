import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Droplets,
  Thermometer,
  Wind,
} from "lucide-react";

import {
  StatusBadge,
} from "@/components/management/management-ui";

import type { Alert } from "@/lib/types";

import { AlertActionsMenu } from "./AlertActionsMenu";

interface AlertRowProps {
  alert: Alert;
  siteName: string;
  isResolved: boolean;
  onAcknowledge: () => void;
  onUnacknowledge: () => void;
}

function getSensorIcon(type: string) {
  switch (type) {
    case "temperature":
      return (
        <Thermometer
          size={14}
          className="text-orange-500"
        />
      );

    case "humidity":
      return (
        <Droplets
          size={14}
          className="text-blue-500"
        />
      );

    case "co2":
      return (
        <Wind
          size={14}
          className="text-slate-500"
        />
      );

    default:
      return (
        <AlertCircle
          size={14}
          className="text-zinc-500"
        />
      );
  }
}

function getStatusTone(
  alert: Alert,
  isResolved: boolean
) {
  if (isResolved) {
    return "success";
  }

  if (alert.severity === "critical") {
    return "danger";
  }

  if (alert.severity === "warning") {
    return "warning";
  }

  return "neutral";
}

function getStatusIcon(
  alert: Alert,
  isResolved: boolean
) {
  if (isResolved) {
    return <CheckCircle2 size={12} />;
  }

  if (alert.severity === "critical") {
    return <AlertCircle size={12} />;
  }

  if (alert.severity === "warning") {
    return <AlertTriangle size={12} />;
  }

  return <Bell size={12} />;
}

export function AlertRow({
  alert,
  siteName,
  isResolved,
  onAcknowledge,
  onUnacknowledge,
}: AlertRowProps) {
  const statusTone = getStatusTone(
    alert,
    isResolved
  );

  return (
    <tr
      className={
        isResolved ? "opacity-60" : ""
      }
    >
      <td className="px-4 py-3">
        <StatusBadge tone={statusTone}>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
            {getStatusIcon(
              alert,
              isResolved
            )}

            {isResolved
              ? "Resolved"
              : alert.severity}
          </div>
        </StatusBadge>
      </td>

      <td className="px-4 py-3">
        <div className="max-w-md">
          <div
            style={{
              color: isResolved
                ? "var(--text-secondary)"
                : "var(--text-primary)",
              fontWeight: 500,
              fontSize: 13,
              lineHeight: 1.4,
            }}
          >
            {alert.message}
          </div>

          {alert.value !== undefined && (
            <div className="mt-0.5 text-xs text-zinc-500">
              Reading:{" "}
              <span className="font-mono">
                {alert.value.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="inline-flex items-center gap-1.5 rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          {getSensorIcon(alert.sensorType)}

          <span className="capitalize">
            {alert.sensorType}
          </span>
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {siteName}
        </div>

        <div className="font-mono text-xs text-zinc-400">
          {alert.siteId}
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-col gap-0.5 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Clock size={12} />

            {new Date(
              alert.timestamp
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>

          <div className="text-xs text-zinc-400">
            {new Date(
              alert.timestamp
            ).toLocaleDateString()}
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <AlertActionsMenu
          isResolved={isResolved}
          onAcknowledge={onAcknowledge}
          onUnacknowledge={onUnacknowledge}
        />
      </td>
    </tr>
  );
}