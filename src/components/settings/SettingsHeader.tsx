import { Settings } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
            <Settings size={20} />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">
              System Settings
            </h1>

            <p className="mt-0.5 text-sm text-[var(--text-tertiary)]">
              Configure your FieldIQ workspace and monitoring preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}