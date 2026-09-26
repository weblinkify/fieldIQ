export default function AccountSettings() {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
          Workspace Name
        </label>

        <input
          type="text"
          defaultValue="FieldIQ"
          className="h-9 w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--brand-primary)]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
          Administrator Email
        </label>

        <input
          type="email"
          defaultValue="admin@fieldiq.com"
          className="h-9 w-full rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] px-3 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--brand-primary)]"
        />
      </div>

      <button
        type="button"
        className="inline-flex h-8 items-center justify-center rounded-md bg-[var(--brand-primary)] px-3 text-xs font-medium text-white transition-opacity hover:opacity-90"
      >
        Save Changes
      </button>
    </div>
  );
}