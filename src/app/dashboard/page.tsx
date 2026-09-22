/**
 * FieldIQ — Dashboard Page
 *
 * This is the main view of our application.
 * It fetches data from our API and renders the overview cards,
 * sensor grids, and site summaries.
 */
"use client";

import { useState, useEffect } from "react";
import { Activity, MapPin, Cpu, AlertTriangle, AlertCircle, Info } from "lucide-react";
import type { DashboardData, SensorHistory, SensorType } from "@/lib/types";
import SensorCard from "@/components/dashboard/SensorCard";
import SiteOverview from "@/components/dashboard/SiteOverview";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [history, setHistory] = useState<Record<string, SensorHistory>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when the component mounts and every 10 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error || "Failed to fetch data");
        }
      } catch (err) {
        setError("Network error fetching dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch history data once (for the mini charts)
    const fetchHistory = async () => {
      const types: SensorType[] = ["temperature", "humidity", "noise", "air_quality", "battery"];
      const historyData: Record<string, SensorHistory> = {};
      
      for (const type of types) {
        try {
          const response = await fetch(`/api/sensors/history?sensor=${type}&hours=12`);
          const result = await response.json();
          if (result.success) {
            historyData[type] = result.data;
          }
        } catch (err) {
          console.error(`Failed to fetch history for ${type}`);
        }
      }
      setHistory(historyData);
    };

    fetchData();
    fetchHistory();

    // Set up polling interval for live updates
    const interval = setInterval(fetchData, 5000); // 5 seconds for demo
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin text-brand-primary">
          <Activity size={32} />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4 bg-danger-bg text-danger border border-danger/20 rounded-xl flex items-start gap-3">
        <AlertTriangle size={20} className="mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">Error Loading Dashboard</h3>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      </div>
    );
  }

  // Get all readings from all sites to show aggregate sensor cards
  // For the MVP dashboard, we just show the readings from the first site as a "featured" view
  const featuredSite = data.sites[0];

  return (
    <div className="stagger-in">
      <div className="section-header">
        <div>
          <h2 className="section-title">System Overview</h2>
          <p className="section-subtitle">Real-time status of all monitored environments</p>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon brand">
            <MapPin size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{data.stats.totalSites}</span>
            <span className="stat-label">Active Sites</span>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon success">
            <Cpu size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">
              {data.stats.onlineDevices} <span className="text-sm font-normal text-text-tertiary">/ {data.stats.totalDevices}</span>
            </span>
            <span className="stat-label">Devices Online</span>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon warning">
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{data.stats.totalSites * 5}</span>
            <span className="stat-label">Data Streams</span>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className={`stat-icon ${data.stats.activeAlerts > 0 ? "danger" : "success"}`}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{data.stats.activeAlerts}</span>
            <span className="stat-label">Active Alerts</span>
          </div>
        </div>
      </div>

      {/* Main Sensor Cards (Featured Site) */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Live Readings</h3>
          <span className="text-sm text-text-secondary px-2 py-1 bg-bg-tertiary rounded-md">
            {featuredSite?.name}
          </span>
        </div>
        
        <div className="sensor-grid">
          {featuredSite?.currentReadings.map((reading) => (
            <SensorCard 
              key={reading.sensorType} 
              reading={reading} 
              historyData={history[reading.sensorType]?.data}
            />
          ))}
        </div>
      </div>

      {/* Active Alerts (if any) */}
      {data.recentAlerts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-color-danger" />
            Recent Alerts
          </h3>
          <div className="alerts-list">
            {data.recentAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className={`alert-item ${alert.severity}`}>
                <div className="alert-icon">
                  {alert.severity === "critical" ? (
                    <AlertTriangle size={18} className="text-color-danger" />
                  ) : (
                    <Info size={18} className="text-color-warning" />
                  )}
                </div>
                <div className="alert-content">
                  <div className="alert-message">{alert.message}</div>
                  <div className="alert-meta">
                    {alert.siteName} • {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Sites Overview */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">All Sites</h3>
        <div className="sites-grid">
          {data.sites.map((site) => (
            <SiteOverview key={site.id} site={site} />
          ))}
        </div>
      </div>
    </div>
  );
}
