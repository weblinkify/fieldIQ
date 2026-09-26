import { ChevronRight } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3">
        <div>
          <div className="text-sm font-medium text-[var(--text-primary)]">
            API Keys
          </div>

          <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">
            Manage credentials used to access FieldIQ APIs.
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-2.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
        >
          Manage Keys
          <ChevronRight size={13} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3">
        <div>
          <div className="text-sm font-medium text-[var(--text-primary)]">
            Session Security
          </div>

          <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">
            Manage active sessions and authentication settings.
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-2.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
        >
          Configure
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}