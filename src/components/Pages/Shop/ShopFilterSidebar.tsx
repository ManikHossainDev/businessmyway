"use client";

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
  const renderGroup = (title: string, key: string, items: { label: string; count: number }[]) => (
    <div key={key} className="mb-6">
      <h3 className="mb-3 font-semibold text-gray-900">{title}</h3>
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
    </div>
  );

  return (
    <aside className="w-full shrink-0 text-sm text-gray-700 lg:w-64">
      <p className="mb-4 text-gray-400">{breadcrumb}</p>

      {groups.map((group) =>
        renderGroup(
          group.label,
          group.key,
          facets?.[group.key] || group.options.map((label) => ({ label, count: 0 })),
        ),
      )}

      {renderGroup("Brand", "brand", facets?.brand || [])}

      <div className="mb-6">
        <h3 className="mb-3 font-semibold text-gray-900">Price Range</h3>
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
      </div>

      <div className="flex gap-3">
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
