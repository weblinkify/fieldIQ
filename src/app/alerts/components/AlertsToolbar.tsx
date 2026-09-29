import {
  FilterSelect,
  SearchBox,
} from "@/components/management/management-ui";

import type { AlertFilter } from "../hooks/useAlertFilters";

interface AlertsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  severity: AlertFilter;
  onSeverityChange: (value: AlertFilter) => void;
}

export function AlertsToolbar({
  search,
  onSearchChange,
  severity,
  onSeverityChange,
}: AlertsToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 16,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <SearchBox
        value={search}
        onChange={onSearchChange}
        placeholder="Search by message or site ID..."
      />

      <FilterSelect
        value={severity}
        onChange={(value) =>
          onSeverityChange(value as AlertFilter)
        }
      >
        <option value="all">All severities</option>
        <option value="critical">Critical</option>
        <option value="warning">Warning</option>
        <option value="info">Info</option>
      </FilterSelect>
    </div>
  );
}