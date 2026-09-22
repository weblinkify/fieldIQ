import React from "react";
import { Search, RotateCw, InboxIcon } from "lucide-react";

/* ── Page Header ──────────────────────────────────────────────────────── */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-header" style={{ marginBottom: 20 }}>
      <div>
        <h2 className="section-title">{title}</h2>
        {description && <p className="section-subtitle">{description}</p>}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}

/* ── Simulation Mode Badge ────────────────────────────────────────────── */

export function SimBadge({ label = "Simulation Mode" }: { label?: string }) {
  return (
    <div className="placeholder-badge" style={{ fontSize: 12, padding: "4px 12px" }}>
      {label}
    </div>
  );
}

/* ── Stat Card (shared across pages) ──────────────────────────────────── */

export function StatCard({
  icon,
  label,
  value,
  tone = "brand",
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  tone?: "brand" | "success" | "warning" | "danger";
}) {
  return (
    <div className="card stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div className="stat-info">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

/* ── Empty State ──────────────────────────────────────────────────────── */

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="stat-icon brand"
        style={{ width: 56, height: 56, borderRadius: 16, marginBottom: 16 }}
      >
        <InboxIcon size={24} />
      </div>
      <h3
        style={{ fontSize: 15, fontWeight: 600 }}
        className="text-text-primary"
      >
        {title}
      </h3>
      <p className="text-text-secondary mt-2" style={{ fontSize: 13, maxWidth: 320 }}>
        {description}
      </p>
    </div>
  );
}

/* ── Filter Select ────────────────────────────────────────────────────── */

export function FilterSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (val: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="header-btn"
      style={{
        width: "auto",
        height: "auto",
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        appearance: "auto" as React.CSSProperties["appearance"],
      }}
    >
      {children}
    </select>
  );
}

/* ── Refresh Button ───────────────────────────────────────────────────── */

export function RefreshButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="header-btn"
      style={{
        width: "auto",
        height: "auto",
        padding: "8px 14px",
        gap: 8,
        display: "inline-flex",
        alignItems: "center",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        opacity: loading ? 0.6 : 1,
      }}
    >
      <RotateCw
        size={15}
        className={loading ? "animate-spin" : ""}
        style={{ color: "var(--text-tertiary)" }}
      />
      Refresh
    </button>
  );
}

/* ── Search Box ───────────────────────────────────────────────────────── */

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  return (
    <div style={{ position: "relative", maxWidth: 320, width: "100%" }}>
      <div
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        <Search size={16} style={{ color: "var(--text-tertiary)" }} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="header-btn"
        style={{
          width: "100%",
          height: "auto",
          padding: "8px 14px 8px 36px",
          fontSize: 13,
          fontWeight: 400,
          borderRadius: 10,
        }}
      />
    </div>
  );
}

/* ── Status Badge ─────────────────────────────────────────────────────── */

export function StatusBadge({
  tone,
  children,
}: {
  tone: "success" | "warning" | "danger" | "neutral" | "brand";
  children: React.ReactNode;
}) {
  const map = {
    success: "online",
    warning: "warning",
    danger: "offline",
    neutral: "warning",
    brand: "brand",
  } as const;

  return (
    <span className={`status-badge ${map[tone]}`}>
      <span className="status-dot" />
      {children}
    </span>
  );
}

/* ── Table primitives ─────────────────────────────────────────────────── */

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead
      style={{
        borderBottom: "1px solid var(--border-color)",
        backgroundColor: "var(--bg-tertiary)",
      }}
    >
      {children}
    </thead>
  );
}

export function TableHead({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={className}
      style={{
        padding: "12px 16px",
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--text-tertiary)",
        textAlign: "left",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </th>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={className}
      style={{
        borderBottom: "1px solid var(--border-color-light)",
        transition: "background-color var(--transition-fast)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--bg-tertiary)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {children}
    </tr>
  );
}

export function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: "14px 16px",
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </td>
  );
}
