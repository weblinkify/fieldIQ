/**
 * FieldIQ — Sensor Configuration
 *
 * This file defines the "rules" for each sensor type:
 * - What's the normal range?
 * - When should we show a warning?
 * - When is it critical?
 * - What icon and label to display?
 *
 * When you add a new sensor type in the future, you just add
 * a new entry here — the rest of the app picks it up automatically.
 */

import { SensorConfig } from "./types";

export const SENSOR_CONFIGS: Record<string, SensorConfig> = {
  temperature: {
    type: "temperature",
    label: "Temperature",
    unit: "°C",
    icon: "Thermometer",
    warningThreshold: 28,
    criticalThreshold: 30,
    min: 0,
    max: 45,
    normalValue: 22,
    higherIsBad: true,
  },
  humidity: {
    type: "humidity",
    label: "Humidity",
    unit: "%",
    icon: "Droplets",
    warningThreshold: 70,
    criticalThreshold: 80,
    min: 10,
    max: 100,
    normalValue: 45,
    higherIsBad: true,
  },
  noise: {
    type: "noise",
    label: "Noise Level",
    unit: "dB",
    icon: "Volume2",
    warningThreshold: 60,
    criticalThreshold: 70,
    min: 20,
    max: 100,
    normalValue: 40,
    higherIsBad: true,
  },
  air_quality: {
    type: "air_quality",
    label: "Air Quality",
    unit: "AQI",
    icon: "Wind",
    warningThreshold: 75,
    criticalThreshold: 100,
    min: 0,
    max: 200,
    normalValue: 35,
    higherIsBad: true,
  },
  battery: {
    type: "battery",
    label: "Battery",
    unit: "%",
    icon: "Battery",
    warningThreshold: 30,
    criticalThreshold: 20,
    min: 0,
    max: 100,
    normalValue: 85,
    higherIsBad: false, // Lower battery = worse
  },
};

/**
 * Get all sensor configs as an array.
 * Useful for looping: SENSOR_LIST.map(sensor => ...)
 */
export const SENSOR_LIST: SensorConfig[] = Object.values(SENSOR_CONFIGS);
