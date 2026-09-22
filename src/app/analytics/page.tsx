import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="placeholder-page animate-in">
      <div className="placeholder-icon">
        <BarChart3 size={40} />
      </div>
      <h2 className="placeholder-title">Advanced Analytics</h2>
      <div className="placeholder-badge">Coming in Phase 3</div>
      <p className="placeholder-description">
        Deep dive into your historical data. Compare multiple sites, generate compliance reports,
        and spot long-term environmental trends.
      </p>
    </div>
  );
}
