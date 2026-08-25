"use client";

import { useMemo, useState } from "react";
import { Spin } from "antd";
import { useGetProductsQuery, type Product } from "@/redux/features/products/productApi";
import { resolveMediaUrl } from "@/utils/media";
import Pagination from "@/components/UI/Pagination";
import NewArrivalsCard from "./NewArrivalsCard";

const NEW_ARRIVALS_LIMIT = 12;
const PRODUCTS_PER_PAGE = 8;

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "priceAsc" },
  { label: "Price: High to Low", value: "priceDesc" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const NewArrivals = () => {
  const [sortBy, setSortBy] = useState<SortValue>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useGetProductsQuery({
    featured: false,
    sort: "newest",
    page: 1,
    limit: NEW_ARRIVALS_LIMIT,
  });

  const latestProducts = useMemo(
    () =>
      (data?.data || []).map((product) => ({
        ...product,
        image: resolveMediaUrl(product.image) || "",
      })),
    [data?.data],
  );

  const products = useMemo(() => {
    const result = [...latestProducts];
    if (sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
      );
    }
    return result;
  }, [latestProducts, sortBy]);

  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = products.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE,
  );

  return (
    <div className="xl:container mx-auto px-2 xl:px-0 py-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-sm md:text-base">Home / New Arrivals</h2>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="w-4 h-[4px] bg-[#BF8D2F]" />
            Showing {paginatedProducts.length} of {total} latest products
          </div>
        </div>

        <div className="relative z-30">
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            {sortOptions.find((option) => option.value === sortBy)?.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSortBy(option.value);
                    setSortOpen(false);
                    setCurrentPage(1);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    option.value === sortBy ? "text-amber-700 font-medium" : "text-gray-700"
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
      ) : products.length === 0 ? (
        <p className="border border-gray-200 bg-white px-6 py-16 text-center text-sm text-gray-500">
          No new products yet. Newly created products will appear here.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px border border-gray-200">
            {paginatedProducts.map((product: Product) => (
              <div key={product.id} className="bg-white">
                <NewArrivalsCard product={product} />
              </div>
            ))}
          </div>
          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default NewArrivals;
