/**
 * FieldIQ — Core Type Definitions
 *
 * These types define the "shape" of our data. Think of them as blueprints.
 * TypeScript uses these to catch mistakes BEFORE you run the code.
 *
 * For example, if you accidentally write `sensor.temperatre` (typo),
 * TypeScript will underline it in red and say "did you mean temperature?"
 */

// ─── Sensor Types ───────────────────────────────────────────────────────────

/** The five types of sensors our platform supports */
export type SensorType =
  | "temperature"
  | "humidity"
  | "noise"
  | "air_quality"
  | "battery";

/** A single reading from a sensor at a specific moment */
export interface SensorReading {
  /** Which type of sensor produced this reading */
  sensorType: SensorType;
  /** The measured value (e.g., 23.5 for temperature) */
  value: number;
  /** The unit of measurement (e.g., "°C", "%", "dB") */
  unit: string;
  /** When this reading was taken */
  timestamp: string;
  /** How the reading compares to normal: ok, warning, or critical */
  status: ReadingStatus;
}

/** Possible statuses for a sensor reading */
export type ReadingStatus = "ok" | "warning" | "critical";

/** Configuration for a sensor type — its limits and display info */
export interface SensorConfig {
  type: SensorType;
  /** Human-readable name (e.g., "Temperature") */
  label: string;
  unit: string;
  /** Icon name from Lucide icons */
  icon: string;
  /** What value means "warning" */
  warningThreshold: number;
  /** What value means "critical/alert" */
  criticalThreshold: number;
  /** Minimum realistic value */
  min: number;
  /** Maximum realistic value */
  max: number;
  /** What's considered "normal" center value */
  normalValue: number;
  /** Whether higher values are worse (true) or lower values are worse (false) */
  higherIsBad: boolean;
}

// ─── Device Types ───────────────────────────────────────────────────────────

/** Whether a device is currently communicating */
export type DeviceStatus = "online" | "offline" | "warning";

/** A physical (or simulated) sensor device */
export interface Device {
  id: string;
  /** Human-readable name (e.g., "Warehouse Sensor Alpha") */
  name: string;
  status: DeviceStatus;
  /** When we last heard from this device */
  lastSeen: string;
  /** Battery percentage (0-100) */
  batteryLevel: number;
  /** Firmware version running on the device */
  firmwareVersion: string;
}

// ─── Site Types ─────────────────────────────────────────────────────────────

/** A monitored location with one or more devices */
export interface Site {
  id: string;
  name: string;
  location: string;
  /** Short description of the site */
  description: string;
  /** The device installed at this site */
  device: Device;
  /** Most recent readings from all sensors */
  currentReadings: SensorReading[];
  /** Number of active alerts */
  alertCount: number;
  /** When this site was added to the system */
  createdAt: string;
}

// ─── Alert Types ────────────────────────────────────────────────────────────

/** Severity of an alert */
export type AlertSeverity = "warning" | "critical";

/** An alert triggered by a sensor exceeding its threshold */
export interface Alert {
  id: string;
  siteId: string;
  siteName: string;
  sensorType: SensorType;
  message: string;
  severity: AlertSeverity;
  /** The value that triggered the alert */
  value: number;
  /** The threshold that was exceeded */
  threshold: number;
  timestamp: string;
  /** Whether someone has acknowledged this alert */
  acknowledged: boolean;
}

// ─── Historical Data ────────────────────────────────────────────────────────

/** A data point for charts — value at a specific time */
export interface DataPoint {
  timestamp: string;
  value: number;
}

/** Historical data for one sensor type */
export interface SensorHistory {
  sensorType: SensorType;
  label: string;
  unit: string;
  data: DataPoint[];
}

// ─── API Response Types ─────────────────────────────────────────────────────

/** Standard API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

/** Dashboard overview data returned by the API */
export interface DashboardData {
  sites: Site[];
  recentAlerts: Alert[];
  /** Summary statistics */
  stats: {
    totalSites: number;
    totalDevices: number;
    onlineDevices: number;
    activeAlerts: number;
  };
}
