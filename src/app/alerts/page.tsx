"use client";

import { AlertsHeader } from "./components/AlertsHeader";
import { AlertsLoading } from "./components/AlertsLoading";
import { AlertsStats } from "./components/AlertsStats";
import { AlertsTable } from "./components/AlertsTable";
import { AlertsToolbar } from "./components/AlertsToolbar";
import { useAlertFilters } from "./hooks/useAlertFilters";
import { useAlerts } from "./hooks/useAlerts";

export default function AlertsPage() {
  const {
    alerts,
    data,
    loading,
    refreshing,
    isAcknowledged,
    acknowledgeAlert,
    unacknowledgeAlert,
    refresh,
  } = useAlerts();

  const {
    search,
    setSearch,
    severity,
    setSeverity,
    filteredAlerts,
  } = useAlertFilters(alerts);

  if (loading && !data) {
    return <AlertsLoading />;
  }

  return (
    <div className="stagger-in">
      <AlertsHeader
        refreshing={refreshing}
        onRefresh={() => refresh(true)}
      />

      <AlertsStats
        alerts={alerts}
        isAcknowledged={isAcknowledged}
      />

      <AlertsToolbar
        search={search}
        onSearchChange={setSearch}
        severity={severity}
        onSeverityChange={setSeverity}
      />

      <AlertsTable
        alerts={filteredAlerts}
        totalAlerts={alerts.length}
        sites={data?.sites ?? []}
        isAcknowledged={isAcknowledged}
        onAcknowledge={acknowledgeAlert}
        onUnacknowledge={unacknowledgeAlert}
      />
    </div>
  );
}