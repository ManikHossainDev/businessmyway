"use client";

import { useMemo, useState, type ComponentType } from "react";
import { Spin } from "antd";
import { getAttributeFields, hasFilterSidebar } from "@/constants/productAttributes";
import { useGetProductsQuery, type Product } from "@/redux/features/products/productApi";
import ShopFilterSidebar, { type ShopFilters } from "./ShopFilterSidebar";
import Pagination from "@/components/UI/Pagination";
import { resolveMediaUrl } from "@/utils/media";

const sortOptions = [
  { label: "Best Selling", value: "bestSelling" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
  { label: "Newest", value: "newest" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const PRODUCTS_PER_PAGE = 8;

const initialFilters: ShopFilters = {
  brand: [],
  minPrice: "",
  maxPrice: "",
  attributes: {},
};

type CategoryProductListingProps = {
  categoryName: string;
  breadcrumb: string;
  Card: ComponentType<{ product: Product }>;
};

const CategoryProductListing = ({
  categoryName,
  breadcrumb,
  Card,
}: CategoryProductListingProps) => {
  const [filters, setFilters] = useState<ShopFilters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<ShopFilters>(initialFilters);
  const [sortBy, setSortBy] = useState<SortValue>("bestSelling");
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const groups = useMemo(() => getAttributeFields(categoryName), [categoryName]);
  const showAttributeFilters = hasFilterSidebar(categoryName);

  const { data, isFetching } = useGetProductsQuery({
    category: categoryName,
    brand: appliedFilters.brand,
    minPrice: appliedFilters.minPrice,
    maxPrice: appliedFilters.maxPrice,
    attributes: appliedFilters.attributes,
    sort: sortBy,
    page: currentPage,
    limit: PRODUCTS_PER_PAGE,
  });

  const products = (data?.data || []).map((product) => ({
    ...product,
    image: resolveMediaUrl(product.image) || "",
  }));
  const total = data?.meta?.total ?? 0;
  const totalInCategory = data?.meta?.totalInCategory ?? total;
  const totalPages = Math.max(1, data?.meta?.totalPages ?? 1);
  const facets = data?.meta?.facets;

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      if (key === "brand") {
        const next = prev.brand.includes(value)
          ? prev.brand.filter((item) => item !== value)
          : [...prev.brand, value];
        return { ...prev, brand: next };
      }
      const current = prev.attributes[key] || [];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return {
        ...prev,
        attributes: { ...prev.attributes, [key]: next },
      };
    });
  };

  return (
    <div className="xl:container mx-auto px-2 py-6 xl:px-0">
      <div className="flex flex-col gap-8 lg:flex-row">
        <ShopFilterSidebar
          breadcrumb={breadcrumb}
          groups={showAttributeFilters ? groups : []}
          filters={filters}
          facets={facets}
          onFilterChange={handleFilterChange}
          onPriceChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
          onApply={() => {
            setAppliedFilters(filters);
            setCurrentPage(1);
          }}
          onReset={() => {
            setFilters(initialFilters);
            setAppliedFilters(initialFilters);
            setCurrentPage(1);
          }}
        />

        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="h-[4px] w-4 bg-[#BF8D2F]" />
              Showing {total} of {totalInCategory} products
            </div>
            <div className="relative z-30">
              <button
                type="button"
                onClick={() => setSortOpen((open) => !open)}
                className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {sortOptions.find((option) => option.value === sortBy)?.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {sortOpen && (
                <div className="absolute right-0 z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortBy(option.value);
                        setSortOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                        option.value === sortBy ? "font-medium text-amber-700" : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {isFetching ? (
            <div className="flex min-h-[240px] items-center justify-center border border-gray-200 bg-white">
              <Spin />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-px border border-gray-200 md:grid-cols-2 xl:grid-cols-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="bg-white">
                    <Card product={product} />
                  </div>
                ))
              ) : (
                <p className="col-span-full bg-white p-8 text-center text-gray-400">
                  No products found matching the selected filters.
                </p>
              )}
            </div>
          )}

          <Pagination
            currentPage={Math.min(currentPage, totalPages)}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryProductListing;
