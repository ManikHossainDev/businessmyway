"use client";

import { useState, type ReactNode } from "react";
import type { ProductAttributeField } from "@/constants/productAttributes";
import type { ProductFacetItem } from "@/redux/features/products/productApi";

export type ShopFilters = {
  brand: string[];
  minPrice: string;
  maxPrice: string;
  attributes: Record<string, string[]>;
};

type ShopFilterSidebarProps = {
  breadcrumb: string;
  groups: ProductAttributeField[];
  filters: ShopFilters;
  facets?: Record<string, ProductFacetItem[]>;
  onFilterChange: (key: string, value: string) => void;
  onPriceChange: (key: "minPrice" | "maxPrice", value: string) => void;
  onApply: () => void;
  onReset: () => void;
};

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`shrink-0 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const FilterSection = ({
  title,
  open,
  selectedCount = 0,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  selectedCount?: number;
  onToggle: () => void;
  children: ReactNode;
}) => (
  <div className="mb-1 border-b border-gray-200">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between py-3 text-left"
      aria-expanded={open}
    >
      <span className="flex items-center gap-2 font-semibold text-gray-900">
        {title}
        {selectedCount > 0 ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#BF8D2F] px-1.5 text-[11px] font-medium text-white">
            {selectedCount}
          </span>
        ) : null}
      </span>
      <Chevron open={open} />
    </button>
    {open ? <div className="pb-4">{children}</div> : null}
  </div>
);

const ShopFilterSidebar = ({
  breadcrumb,
  groups,
  filters,
  facets,
  onFilterChange,
  onPriceChange,
  onApply,
  onReset,
}: ShopFilterSidebarProps) => {
  const firstGroupKey = groups[0]?.key;
  const [openKeys, setOpenKeys] = useState<string[]>(
    firstGroupKey ? [firstGroupKey, "price"] : ["price"],
  );

  const toggle = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const renderOptions = (key: string, items: { label: string; count: number }[]) => (
    <div className="space-y-2">
      {items.map((item) => {
        const selected =
          key === "brand"
            ? filters.brand.includes(item.label)
            : (filters.attributes[key] || []).includes(item.label);
        return (
          <label
            key={item.label}
            className="flex cursor-pointer items-center justify-between hover:text-gray-900"
          >
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-gray-800"
                checked={selected}
                onChange={() => onFilterChange(key, item.label)}
              />
              {item.label}
            </span>
            <span className="text-gray-400">{item.count}</span>
          </label>
        );
      })}
    </div>
  );

  const priceSelected = Number(Boolean(filters.minPrice)) + Number(Boolean(filters.maxPrice));

  return (
    <aside className="w-full shrink-0 text-sm text-gray-700 lg:w-64">
      <p className="mb-4 text-gray-400">{breadcrumb}</p>

      {groups.map((group) => (
        <FilterSection
          key={group.key}
          title={group.label}
          open={openKeys.includes(group.key)}
          selectedCount={(filters.attributes[group.key] || []).length}
          onToggle={() => toggle(group.key)}
        >
          {renderOptions(
            group.key,
            facets?.[group.key] || group.options.map((label) => ({ label, count: 0 })),
          )}
        </FilterSection>
      ))}

      <FilterSection
        title="Brand"
        open={openKeys.includes("brand")}
        selectedCount={filters.brand.length}
        onToggle={() => toggle("brand")}
      >
        {renderOptions("brand", facets?.brand || [])}
      </FilterSection>

      <FilterSection
        title="Price Range"
        open={openKeys.includes("price")}
        selectedCount={priceSelected}
        onToggle={() => toggle("price")}
      >
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="$ Min"
            value={filters.minPrice}
            onChange={(event) => onPriceChange("minPrice", event.target.value)}
            className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <input
            type="number"
            placeholder="$ Max"
            value={filters.maxPrice}
            onChange={(event) => onPriceChange("maxPrice", event.target.value)}
            className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </FilterSection>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onApply}
          className="rounded-md bg-amber-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-600"
        >
          Apply Filter
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </aside>
  );
};

export default ShopFilterSidebar;
