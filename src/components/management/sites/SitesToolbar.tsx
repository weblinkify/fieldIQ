"use client";

import {
  FilterSelect,
  SearchBox,
} from "@/components/management/management-ui";

interface SitesToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

export default function SitesToolbar({
  search,
  setSearch,
  status,
  setStatus,
}: SitesToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <SearchBox
        value={search}
        onChange={setSearch}
        placeholder="Search sites or locations..."
      />

      <FilterSelect value={status} onChange={setStatus}>
        <option value="all">All device states</option>
        <option value="online">Online</option>
        <option value="warning">Warning</option>
        <option value="offline">Offline</option>
      </FilterSelect>
    </div>
  );
}
