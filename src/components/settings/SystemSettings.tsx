export default function SystemSettings() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-3">
        <div>
          <div className="text-sm font-medium text-[var(--text-primary)]">
            Data Refresh
          </div>
          <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">
            How frequently dashboard data is refreshed.
          </div>
        </div>

        <select
          defaultValue="5"
          className="h-8 rounded-md border border-[var(--border-primary)] bg-[var(--bg-primary)] px-2 text-xs text-[var(--text-secondary)] outline-none"
        >
          <option value="5">5 seconds</option>
          <option value="10">10 seconds</option>
          <option value="30">30 seconds</option>
        </select>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-3">
        <div>
          <div className="text-sm font-medium text-[var(--text-primary)]">
            Timezone
          </div>
          <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">
            Used for timestamps and alert notifications.
          </div>
        </div>

        <span className="text-xs font-medium text-[var(--text-secondary)]">
          System Default
        </span>
      </div>
    </div>
  );
}