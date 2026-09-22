/**
 * FieldIQ — Mini Chart Component (Sparkline)
 *
 * LEARNING CONCEPT: "Sparkline"
 * A sparkline is a tiny chart without axes or labels.
 * It shows the TREND at a glance — is the value going up or down?
 *
 * We use Recharts (a React charting library) to render these.
 * The <ResponsiveContainer> makes the chart resize automatically.
 */
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import type { DataPoint } from "@/lib/types";

interface MiniChartProps {
  /** Array of data points with timestamp and value */
  data: DataPoint[];
  /** Color of the chart line and fill */
  color?: string;
  /** Height of the chart in pixels */
  height?: number;
}

export default function MiniChart({
  data,
  color = "var(--brand-primary)",
  height = 40,
}: MiniChartProps) {
  // Don't render if no data
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          {/* Define a gradient for the fill area */}
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#gradient-${color})`}
            dot={false}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
