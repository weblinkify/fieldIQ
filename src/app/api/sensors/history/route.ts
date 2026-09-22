/**
 * FieldIQ — Sensor History API Route
 *
 * Returns historical data for charts.
 * Query parameters:
 *   - sensor: which sensor type (temperature, humidity, etc.)
 *   - hours: how many hours of history (default: 24)
 *
 * Example: /api/sensors/history?sensor=temperature&hours=24
 */

import { NextRequest, NextResponse } from "next/server";
import { generateHistory } from "@/lib/simulator";
import { SENSOR_CONFIGS } from "@/lib/sensor-config";
import type { SensorType, ApiResponse, SensorHistory } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters from the URL
    const searchParams = request.nextUrl.searchParams;
    const sensorType = searchParams.get("sensor") as SensorType | null;
    const hours = parseInt(searchParams.get("hours") ?? "24", 10);

    // Validate: is the sensor type valid?
    if (!sensorType || !SENSOR_CONFIGS[sensorType]) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid sensor type. Valid types: ${Object.keys(SENSOR_CONFIGS).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate: is the hours value reasonable?
    if (isNaN(hours) || hours < 1 || hours > 720) {
      return NextResponse.json(
        { success: false, error: "Hours must be between 1 and 720" },
        { status: 400 }
      );
    }

    // Calculate how many data points based on time range
    const pointCount = Math.min(hours * 2, 200);
    const config = SENSOR_CONFIGS[sensorType];
    const data = generateHistory(sensorType, hours, pointCount);

    const history: SensorHistory = {
      sensorType,
      label: config.label,
      unit: config.unit,
      data,
    };

    const response: ApiResponse<SensorHistory> = {
      success: true,
      data: history,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Sensor history API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sensor history" },
      { status: 500 }
    );
  }
}
