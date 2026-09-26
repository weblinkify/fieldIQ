"use client";

import { useState } from "react";

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-5 w-9 rounded-full transition-colors ${
        enabled
          ? "bg-[var(--brand-primary)]"
          : "bg-[var(--bg-tertiary)] border border-[var(--border-primary)]"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function NotificationSettings() {
  const [critical, setCritical] = useState(true);
  const [warnings, setWarnings] = useState(true);
  const [offline, setOffline] = useState(false);

  const rows = [
    {
      label: "Critical alerts",
      description: "Immediately notify when a critical threshold is exceeded.",
      value: critical,
      setValue: setCritical,
    },
    {
      label: "Warning alerts",
      description: "Notify when environmental readings approach limits.",
      value: warnings,
      setValue: setWarnings,
    },
    {
      label: "Device offline",
      description: "Notify when a monitoring device stops responding.",
      value: offline,
      setValue: setOffline,
    },
  ];

  return (
    <div className="divide-y divide-[var(--border-primary)]">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
        >
          <div>
            <div className="text-sm font-medium text-[var(--text-primary)]">
              {row.label}
            </div>

            <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">
              {row.description}
            </div>
          </div>

          <Toggle
            enabled={row.value}
            onChange={row.setValue}
          />
        </div>
      ))}
    </div>
  );
}