import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="placeholder-page animate-in">
      <div className="placeholder-icon">
        <Settings size={40} />
      </div>
      <h2 className="placeholder-title">System Settings</h2>
      <div className="placeholder-badge">Coming Later</div>
      <p className="placeholder-description">
        Configure user accounts, API keys, billing, and system-wide preferences.
      </p>
    </div>
  );
}
