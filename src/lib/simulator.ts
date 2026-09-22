/**
 * FieldIQ — Sensor Data Simulator
 *
 * This is one of the most interesting files in Phase 1!
 *
 * Instead of needing real hardware, we generate REALISTIC fake data.
 * The trick is using "random walk" — each new value is based on the
 * previous value plus a small random change. This creates smooth,
 * realistic-looking data instead of wild random jumps.
 *
 * LEARNING CONCEPT: "Random Walk"
 * Imagine you're standing on a number line at position 22 (temperature).
 * Each second, you flip a coin:
 *   - Heads: move +0.3 (temperature rises slightly)
 *   - Tails: move -0.3 (temperature drops slightly)
 * Over time, you get a realistic-looking temperature curve!
 *
 * We also add a "pull toward normal" so values don't drift too far.
 * Real sensors behave this way — temperature hovers around room temp,
 * humidity stays in a comfortable range, etc.
 */

import { SENSOR_CONFIGS } from "./sensor-config";
import type {
  SensorReading,
  SensorType,
  ReadingStatus,
  DataPoint,
  Device,
  Site,
  Alert,
  DashboardData,
} from "./types";

// ─── State Management ───────────────────────────────────────────────────────

/**
 * We store the "current" value for each sensor at each site.
 * This lets the next reading be based on the previous one (random walk).
 *
 * The key format is: "siteId:sensorType" → current value
 */
const currentValues: Map<string, number> = new Map();

// ─── Core Simulation Logic ──────────────────────────────────────────────────

/**
 * Generate a realistic sensor reading using random walk.
 *
 * @param siteId - Which site this reading is for
 * @param sensorType - Which sensor type to simulate
 * @returns A sensor reading with realistic value and status
 */
function simulateReading(siteId: string, sensorType: SensorType): SensorReading {
  const config = SENSOR_CONFIGS[sensorType];
  const key = `${siteId}:${sensorType}`;

  // Get the previous value, or start at the "normal" value
  let previousValue = currentValues.get(key) ?? config.normalValue;

  // Random walk: add a small random change (-1 to +1, scaled)
  const maxStep = (config.max - config.min) * 0.02; // 2% of range
  const randomChange = (Math.random() - 0.5) * 2 * maxStep;

  // Pull toward normal: if we've drifted far from normal, gently pull back
  // This is like a rubber band — the further you stretch, the harder it pulls
  const pullStrength = 0.05;
  const pullTowardNormal = (config.normalValue - previousValue) * pullStrength;

  // Calculate new value
  let newValue = previousValue + randomChange + pullTowardNormal;

  // Clamp to valid range (never go below min or above max)
  newValue = Math.max(config.min, Math.min(config.max, newValue));

  // Round to 1 decimal place for clean display
  newValue = Math.round(newValue * 10) / 10;

  // Save for next time
  currentValues.set(key, newValue);

  // Determine status based on thresholds
  const status = getReadingStatus(newValue, config.warningThreshold, config.criticalThreshold, config.higherIsBad);

  return {
    sensorType,
    value: newValue,
    unit: config.unit,
    timestamp: new Date().toISOString(),
    status,
  };
}

/**
 * Determine if a reading is ok, warning, or critical.
 *
 * For most sensors (temperature, noise, AQI), HIGHER is worse.
 * For battery, LOWER is worse.
 */
function getReadingStatus(
  value: number,
  warningThreshold: number,
  criticalThreshold: number,
  higherIsBad: boolean
): ReadingStatus {
  if (higherIsBad) {
    // Higher values are bad (temperature, noise, etc.)
    if (value >= criticalThreshold) return "critical";
    if (value >= warningThreshold) return "warning";
    return "ok";
  } else {
    // Lower values are bad (battery)
    if (value <= criticalThreshold) return "critical";
    if (value <= warningThreshold) return "warning";
    return "ok";
  }
}

// ─── Historical Data Generation ─────────────────────────────────────────────

/**
 * Generate historical data points for charts.
 *
 * This creates a series of past readings, as if the sensor had been
 * recording for the specified time period.
 *
 * @param sensorType - Which sensor to generate history for
 * @param hours - How many hours of history to generate
 * @param pointCount - How many data points to create
 */
export function generateHistory(
  sensorType: SensorType,
  hours: number = 24,
  pointCount: number = 48
): DataPoint[] {
  const config = SENSOR_CONFIGS[sensorType];
  const now = Date.now();
  const intervalMs = (hours * 60 * 60 * 1000) / pointCount;

  const points: DataPoint[] = [];
  let value = config.normalValue;

  for (let i = 0; i < pointCount; i++) {
    const timestamp = new Date(now - (pointCount - i) * intervalMs).toISOString();

    // Random walk for historical data too
    const maxStep = (config.max - config.min) * 0.03;
    const change = (Math.random() - 0.5) * 2 * maxStep;
    const pull = (config.normalValue - value) * 0.03;
    value = Math.max(config.min, Math.min(config.max, value + change + pull));
    value = Math.round(value * 10) / 10;

    points.push({ timestamp, value });
  }

  return points;
}

// ─── Demo Sites ─────────────────────────────────────────────────────────────

/** Our three demo monitoring sites */
const DEMO_SITES = [
  {
    id: "site-1",
    name: "Downtown Office",
    location: "123 Main Street, Floor 3",
    description: "Main headquarters office space monitoring",
    deviceName: "FIQ-Alpha-001",
    deviceStatus: "online" as const,
    firmwareVersion: "1.2.0",
  },
  {
    id: "site-2",
    name: "Warehouse North",
    location: "45 Industrial Park, Unit B",
    description: "Temperature-controlled storage facility",
    deviceName: "FIQ-Beta-002",
    deviceStatus: "online" as const,
    firmwareVersion: "1.2.0",
  },
  {
    id: "site-3",
    name: "Rooftop Garden",
    location: "123 Main Street, Rooftop",
    description: "Urban garden environmental monitoring",
    deviceName: "FIQ-Gamma-003",
    deviceStatus: "offline" as const,
    firmwareVersion: "1.1.3",
  },
];

// ─── Public API ─────────────────────────────────────────────────────────────

/** Generate all current sensor readings for a site */
function generateSiteReadings(siteId: string): SensorReading[] {
  const sensorTypes: SensorType[] = [
    "temperature",
    "humidity",
    "noise",
    "air_quality",
    "battery",
  ];
  return sensorTypes.map((type) => simulateReading(siteId, type));
}

/** Build a complete Site object with device and readings */
function buildSite(demo: (typeof DEMO_SITES)[number]): Site {
  const readings = generateSiteReadings(demo.id);
  const batteryReading = readings.find((r) => r.sensorType === "battery");

  const device: Device = {
    id: `device-${demo.id}`,
    name: demo.deviceName,
    status: demo.deviceStatus,
    lastSeen:
      demo.deviceStatus === "online"
        ? new Date().toISOString()
        : new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    batteryLevel: batteryReading?.value ?? 85,
    firmwareVersion: demo.firmwareVersion,
  };

  // Count how many readings are in warning or critical state
  const alertCount = readings.filter(
    (r) => r.status === "warning" || r.status === "critical"
  ).length;

  return {
    id: demo.id,
    name: demo.name,
    location: demo.location,
    description: demo.description,
    device,
    currentReadings: readings,
    alertCount,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
  };
}

/** Generate alerts from readings that exceed thresholds */
function generateAlerts(sites: Site[]): Alert[] {
  const alerts: Alert[] = [];

  for (const site of sites) {
    for (const reading of site.currentReadings) {
      if (reading.status === "warning" || reading.status === "critical") {
        const config = SENSOR_CONFIGS[reading.sensorType];
        const threshold =
          reading.status === "critical"
            ? config.criticalThreshold
            : config.warningThreshold;

        alerts.push({
          id: `alert-${site.id}-${reading.sensorType}-${Date.now()}`,
          siteId: site.id,
          siteName: site.name,
          sensorType: reading.sensorType,
          message: `${config.label} ${config.higherIsBad ? "exceeded" : "dropped below"} ${reading.status} threshold`,
          severity: reading.status === "critical" ? "critical" : "warning",
          value: reading.value,
          threshold,
          timestamp: reading.timestamp,
          acknowledged: false,
        });
      }
    }
  }

  return alerts;
}

/**
 * Get the complete dashboard data from the database.
 * This replaces the hardcoded DEMO_SITES with real DB calls.
 */
export async function getDashboardData() {
  const { prisma } = await import("@/lib/prisma");

  const sites = await prisma.site.findMany({
    include: {
      devices: {
        include: {
          measurements: {
            orderBy: { timestamp: 'desc' },
            take: 5, // Get latest 5 (one for each sensor type roughly)
          }
        }
      }
    }
  });

  // Calculate stats
  const totalSites = sites.length;
  let totalDevices = 0;
  let onlineDevices = 0;

  // Format to match the old DashboardData interface for frontend compatibility
  const formattedSites = sites.map((site: any) => {
    const device = site.devices[0]; // Assuming 1 device per site for simplicity

    if (device) {
      totalDevices++;
      if (device.status === 'online') onlineDevices++;
    }

    // Format current readings
    const currentReadings = device ? device.measurements.map((m: any) => ({
      sensorType: m.sensorType as SensorType,
      value: m.value,
      unit: m.unit,
      timestamp: m.timestamp.toISOString(),
      status: m.status as ReadingStatus,
    })) : [];

    const alertCount = currentReadings.filter((r: any) => r.status === 'warning' || r.status === 'critical').length;

    return {
      id: site.id,
      name: site.name,
      location: site.location,
      description: site.description || "",
      device: device ? {
        id: device.id,
        name: device.name,
        status: device.status as any,
        lastSeen: device.lastSeen.toISOString(),
        batteryLevel: device.batteryLevel,
        firmwareVersion: device.firmwareVersion,
      } : {
        id: "none",
        name: "No Device",
        status: "offline" as any,
        lastSeen: new Date().toISOString(),
        batteryLevel: 0,
        firmwareVersion: "0.0.0"
      },
      currentReadings,
      alertCount,
      createdAt: site.createdAt.toISOString()
    };
  });

  const recentAlerts = generateAlerts(formattedSites);

  return {
    sites: formattedSites,
    recentAlerts,
    stats: {
      totalSites,
      totalDevices,
      onlineDevices,
      activeAlerts: recentAlerts.length,
    },
  };
}

/**
 * Get readings for a specific site.
 */
export async function getSiteReadings(siteId: string): Promise<SensorReading[]> {
  const { prisma } = await import("@/lib/prisma");
  const site = await prisma.site.findUnique({
    where: { id: siteId },
    include: {
      devices: {
        include: {
          measurements: {
            orderBy: { timestamp: 'desc' },
            take: 5
          }
        }
      }
    }
  });

  if (!site || !site.devices[0]) return [];

  return site.devices[0].measurements.map((m: any) => ({
    sensorType: m.sensorType as SensorType,
    value: m.value,
    unit: m.unit,
    timestamp: m.timestamp.toISOString(),
    status: m.status as ReadingStatus,
  }));
}

/**
 * Generate readings and save them to the DB.
 */
export async function simulateAndSaveReadings() {
  const { prisma } = await import("@/lib/prisma");
  const devices = await prisma.device.findMany();
  const sensorTypes: SensorType[] = ["temperature", "humidity", "noise", "air_quality", "battery"];

  for (const device of devices) {
    for (const type of sensorTypes) {
      const reading = simulateReading(`site-db`, type); // use a generic key for random walk tracking
      await prisma.sensorMeasurement.create({
        data: {
          deviceId: device.id,
          sensorType: reading.sensorType,
          value: reading.value,
          unit: reading.unit,
          status: reading.status,
          timestamp: new Date(reading.timestamp),
        }
      });
    }
  }
}

