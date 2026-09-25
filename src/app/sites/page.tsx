"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity } from "lucide-react";

import type { DashboardData } from "@/lib/types";

import {
  PageHeader,
  RefreshButton,
  SimBadge,
} from "@/components/management/management-ui";

import SitesStats from "@/components/management/sites/SitesStats";
import SitesToolbar from "@/components/management/sites/SitesToolbar";
import SitesTable from "@/components/management/sites/SitesTable";

export default function SitesPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const fetchData = async (manual = false) => {
    try {
      if (manual) setRefreshing(true);

      const response = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch sites:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();

    const interval = setInterval(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sites = data?.sites ?? [];

  const filteredSites = useMemo(() => {
    const query = search.toLowerCase();

    return sites.filter((site) => {
      const matchesSearch =
        site.name.toLowerCase().includes(query) ||
        site.location.toLowerCase().includes(query) ||
        site.device.name.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" ||
        site.device.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [sites, search, status]);

  if (loading && !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-spin text-brand-primary">
          <Activity size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="stagger-in">
      <PageHeader
        title="Sites"
        description="Manage monitored locations and their environmental health."
        action={
          <>
            <SimBadge />

            <RefreshButton
              onClick={() => fetchData(true)}
              loading={refreshing}
            />
          </>
        }
      />

      <SitesStats data={data} />

      <SitesToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <SitesTable
        sites={filteredSites}
        totalSites={sites.length}
      />
    </div>
  );
}
