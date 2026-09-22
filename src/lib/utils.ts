/**
 * FieldIQ — Utility Functions
 *
 * Small helper functions used across the app.
 * Keep this file focused on pure utility — no React, no API calls.
 */

/**
 * Format a date string into a human-readable relative time.
 * Examples: "2 minutes ago", "1 hour ago", "3 days ago"
 *
 * LEARNING CONCEPT: "Relative Time"
 * Instead of showing "2026-09-22T10:30:00Z" (confusing!),
 * we show "5 minutes ago" (much better for users).
 */
export function timeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffSeconds = Math.floor((now - then) / 1000);

  if (diffSeconds < 60) return "just now";
  if (diffSeconds < 3600) {
    const mins = Math.floor(diffSeconds / 60);
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  }
  if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  const days = Math.floor(diffSeconds / 86400);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

/**
 * Format a timestamp for display in charts.
 * Shows time like "10:30" or "Sep 22" depending on the range.
 */
export function formatChartTime(dateString: string, showDate: boolean = false): string {
  const date = new Date(dateString);
  if (showDate) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
}

/**
 * Combine CSS class names, filtering out falsy values.
 * This lets you conditionally add classes:
 *
 *   cn("base-class", isActive && "active", isLarge && "large")
 *   // If isActive is true and isLarge is false:
 *   // Result: "base-class active"
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Clamp a number between a min and max.
 * clamp(150, 0, 100) → 100
 * clamp(-5, 0, 100) → 0
 * clamp(50, 0, 100) → 50
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
