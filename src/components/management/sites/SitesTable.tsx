"use client";

import type { Site } from "@/lib/types";

import {
  EmptyState,
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/management/management-ui";

import SiteRow from "./SiteRow";

interface SitesTableProps {
  sites: Site[];
  totalSites: number;
}

export default function SitesTable({
  sites,
  totalSites,
}: SitesTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <tr>
            <TableHead>Site</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sensors</TableHead>
            <TableHead>Alerts</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead />
          </tr>
        </TableHeader>

        <TableBody>
          {sites.map((site) => (
            <SiteRow
              key={site.id}
              site={site}
            />
          ))}

          {sites.length === 0 && (
            <tr>
              <td colSpan={8}>
                <EmptyState
                  title="No sites found"
                  description="Try changing your search or status filter."
                />
              </td>
            </tr>
          )}
        </TableBody>
      </Table>

      <div className="mt-3 flex justify-between text-xs text-[var(--text-tertiary)]">
        <span>
          Showing {sites.length} of {totalSites} sites
        </span>

        <span>
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </>
  );
}
