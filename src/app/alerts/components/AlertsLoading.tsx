import { AlertCircle } from "lucide-react";

export function AlertsLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="animate-spin text-brand-primary">
        <AlertCircle size={32} />
      </div>
    </div>
  );
}