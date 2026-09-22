/**
 * FieldIQ — Site Overview Component
 *
 * Displays a summary card for a specific site, showing its name,
 * location, device status, and latest key readings.
 */
import { MapPin, Clock } from "lucide-react";
import type { Site } from "@/lib/types";
import { SENSOR_CONFIGS } from "@/lib/sensor-config";
import { timeAgo } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

interface SiteOverviewProps {
  site: Site;
}

export default function SiteOverview({ site }: SiteOverviewProps) {
  // Pick the top two readings to show on the overview card
  // (usually temperature and humidity are most important)
  const keyReadings = site.currentReadings.filter(
    (r) => r.sensorType === "temperature" || r.sensorType === "humidity"
  ).slice(0, 2);

  return (
    <div className="card">
      <div className="site-card-header">
        <div>
          <h3 className="site-card-title">{site.name}</h3>
          <div className="site-card-location">
            <MapPin size={12} />
            {site.location}
          </div>
        </div>
        <StatusBadge status={site.device.status} />
      </div>

      {/* Mini grid of key readings */}
      <div className="site-card-readings">
        {keyReadings.map((reading) => {
          const config = SENSOR_CONFIGS[reading.sensorType];
          if (!config) return null;

          return (
            <div key={reading.sensorType} className="site-reading">
              <span className="site-reading-label">{config.label}</span>
              <span className="site-reading-value">
                {reading.value.toFixed(1)} {reading.unit}
              </span>
            </div>
          );
        })}
      </div>

      <div className="site-card-footer">
        <div className="site-card-device">
          Device: {site.device.name}
        </div>
        <div className="site-card-updated" title={site.device.lastSeen}>
          <Clock size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "-2px" }} />
          {timeAgo(site.device.lastSeen)}
        </div>
      </div>
    </div>
  );
}
