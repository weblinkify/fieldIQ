import { ChevronRight } from "lucide-react";

export default function BillingSettings() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--text-tertiary)]">
              Current Plan
            </div>

            <div className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
              Professional
            </div>

            <div className="mt-1 text-xs text-[var(--text-tertiary)]">
              Advanced monitoring and environmental analytics.
            </div>
          </div>

          <span className="rounded-md bg-[var(--bg-tertiary)] px-2 py-1 text-[10px] font-semibold text-[var(--text-secondary)]">
            ACTIVE
          </span>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-2.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
      >
        Open Billing
        <ChevronRight size={13} />
      </button>
    </div>
  );
}