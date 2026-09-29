import { TestTube2 } from "lucide-react";

import {
  PageHeader,
  RefreshButton,
  SimBadge,
} from "@/components/management/management-ui";

interface AlertsHeaderProps {
  refreshing: boolean;
  onRefresh: () => void;
}

export function AlertsHeader({
  refreshing,
  onRefresh,
}: AlertsHeaderProps) {
  return (
    <PageHeader
      title="Alerts"
      description="Monitor sensor thresholds, anomalies, and active incidents across all sites."
      action={
        <>
          <SimBadge />

          <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <TestTube2 size={14} />
            Simulation Mode
          </div>

          <RefreshButton
            onClick={onRefresh}
            loading={refreshing}
          />
        </>
      }
    />
  );
}