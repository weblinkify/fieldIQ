import { Brain } from "lucide-react";

export default function AIInsightsPage() {
  return (
    <div className="placeholder-page animate-in">
      <div className="placeholder-icon">
        <Brain size={40} />
      </div>
      <h2 className="placeholder-title">AI Insights</h2>
      <div className="placeholder-badge">Coming in Phase 5</div>
      <p className="placeholder-description">
        We'll plug in an AI agent here later. It will analyze your data streams to spot 
        unusual patterns, predict maintenance needs, and suggest optimizations for your environments.
      </p>
    </div>
  );
}
