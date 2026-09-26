import { ReactNode } from "react";

interface SettingsSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

export default function SettingsSection({
  icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-sm">
      <div className="border-b border-[var(--border-color)] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
            {icon}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              {title}
            </h2>

            <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {children}
      </div>
    </section>
  );
}