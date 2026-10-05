import { Thermometer, Droplets, Volume2, Wind, Battery } from "lucide-react";
import type { SensorReading } from "@/lib/types";
import { SENSOR_CONFIGS } from "@/lib/sensor-config";
import { cn } from "@/lib/utils";
import MiniChart from "./MiniChart";

const ICON_MAP: Record<string, React.ElementType> = {
  Thermometer,
  Droplets,
  Volume2,
  Wind,
  Battery,
};

interface SensorCardProps {
  reading: SensorReading;
  historyData?: { timestamp: string; value: number }[];
}

export default function SensorCard({ reading, historyData }: SensorCardProps) {
  const config = SENSOR_CONFIGS[reading.sensorType];
  if (!config) return null;

  const IconComponent = ICON_MAP[config.icon] || Wind;

  let statusClass = "ok";
  let chartColor = "var(--color-success)";

  if (reading.status === "warning") {
    statusClass = "warning";
    chartColor = "var(--color-warning)";
  } else if (reading.status === "critical") {
    statusClass = "critical";
    chartColor = "var(--color-danger)";
  }

  return (
    <div className={cn("card sensor-card", `status-${statusClass}`)}>
      <div className="sensor-card-header">
        <span className="sensor-card-label">{config.label}</span>
        <div className={cn("sensor-card-icon", statusClass)}>
          <IconComponent size={18} />
        </div>
      </div>

      <div className="sensor-card-value">
        {reading.value.toFixed(1)}
        <span className="unit">{reading.unit}</span>
      </div>

      {historyData && historyData.length > 0 && (
        <div className="sensor-card-chart">
          <MiniChart data={historyData} color={chartColor} height={40} />
        </div>
      )}
    </div>
  );
}
