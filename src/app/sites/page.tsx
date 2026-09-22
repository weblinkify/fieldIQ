import { MapPin } from "lucide-react";

export default function SitesPage() {
  return (
    <div className="placeholder-page animate-in">
      <div className="placeholder-icon">
        <MapPin size={40} />
      </div>
      <h2 className="placeholder-title">Sites Management</h2>
      <div className="placeholder-badge">Coming in Phase 2</div>
      <p className="placeholder-description">
        This is where you will be able to add new monitoring locations, configure 
        site-specific settings, and view a detailed map of all your deployed sensors.
      </p>
    </div>
  );
}
