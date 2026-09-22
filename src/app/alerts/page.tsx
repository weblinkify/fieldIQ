import { Bell } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="placeholder-page animate-in">
      <div className="placeholder-icon">
        <Bell size={40} />
      </div>
      <h2 className="placeholder-title">Alert Configuration</h2>
      <div className="placeholder-badge">Coming in Phase 3</div>
      <p className="placeholder-description">
        Define custom thresholds for each sensor. Choose how you want to be notified 
        (email, SMS, push) when readings go out of bounds.
      </p>
    </div>
  );
}
