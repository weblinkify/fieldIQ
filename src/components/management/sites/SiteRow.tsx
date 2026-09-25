"use client";

import {
  Activity,
  Building2,
  MapPin,
  MoreHorizontal,
} from "lucide-react";

import type { Site } from "@/lib/types";

import {
  StatusBadge,
  TableCell,
  TableRow,
} from "@/components/management/management-ui";

interface SiteRowProps {
  site: Site;
}

export default function SiteRow({ site }: SiteRowProps) {
  const sensorCount = site.currentReadings?.length ?? 0;

  return (
    <TableRow>
      {/* Site */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div
            className="stat-icon brand flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
          >
            <Building2 size={16} />
          </div>

          <div>
            <div className="text-[13px] font-semibold text-[var(--text-primary)]">
              {site.name}
            </div>

            <div className="mt-0.5 font-mono text-[11px] text-[var(--text-tertiary)]">
              {site.id}
            </div>
          </div>
        </div>
      </TableCell>

      {/* Location */}
      <TableCell>
        <div className="flex items-start gap-1.5">
          <MapPin
            size={14}
            className="mt-0.5 shrink-0 text-[var(--text-tertiary)]"
          />

          <div>
            <div className="text-[var(--text-primary)]">
              {site.location}
            </div>

            {site.description && (
              <div className="mt-0.5 max-w-[200px] truncate text-[11px] text-[var(--text-tertiary)]">
                {site.description}
              </div>
            )}
          </div>
        </div>
      </TableCell>

      {/* Device */}
      <TableCell>
        <div className="font-medium text-[var(--text-primary)]">
          {site.device.name}
        </div>

        <div className="mt-0.5 font-mono text-[11px] text-[var(--text-tertiary)]">
          v{site.device.firmwareVersion}
        </div>
      </TableCell>

      {/* Status */}
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

      {/* Sensors */}
      <TableCell>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)]">
          <Activity
            size={13}
            className="text-[var(--text-tertiary)]"
          />
          {sensorCount}
        </span>
      </TableCell>

      {/* Alerts */}
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

      {/* Last Seen */}
      <TableCell>
        <span className="text-xs text-[var(--text-tertiary)]">
          {new Date(site.device.lastSeen).toLocaleString()}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <button
          type="button"
          className="header-btn flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg"
          aria-label={`Actions for ${site.name}`}
        >
          <MoreHorizontal size={16} />
        </button>
      </TableCell>
    </TableRow>
  );
}
