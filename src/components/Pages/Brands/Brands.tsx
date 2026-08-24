'use client';

import { useMemo, useState } from 'react';
import { Spin } from 'antd';
import GifRevealWrapperCard from '@/components/UI/GifRevealWrapperCard';
import Pagination from '@/components/UI/Pagination';
import { useGetCategoriesQuery } from '@/redux/features/category/categoryApi';
import { useGetBrandsQuery } from '@/redux/features/brands/brandApi';

const ALL_BRANDS = 'All Brands';
const PAGE_SIZE = 12;

const Brands = () => {
  const [activeCategory, setActiveCategory] = useState(ALL_BRANDS);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: categoryData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const { data: brandData, isFetching: isBrandsLoading } = useGetBrandsQuery(
    activeCategory === ALL_BRANDS ? undefined : { category: activeCategory },
  );

  const categories = categoryData?.data || [];
  const brands = brandData?.data || [];
  const tabs = useMemo(
    () => [ALL_BRANDS, ...categories.map((category) => category.name)],
    [categories],
  );

  const totalPages = Math.max(1, Math.ceil(brands.length / PAGE_SIZE));
  const paginatedBrands = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return brands.slice(start, start + PAGE_SIZE);
  }, [brands, currentPage]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="xl:container mx-auto px-2 xl:px-0 py-6">
      <p className="text-gray-400 mb-4">Home / Brands</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {isCategoriesLoading ? (
          <Spin />
        ) : (
          tabs.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-white border-gray-800 text-gray-900'
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))
        )}
      </div>

      {isBrandsLoading ? (
        <div className="flex min-h-[240px] items-center justify-center rounded-md bg-white">
          <Spin />
        </div>
      ) : paginatedBrands.length === 0 ? (
        <p className="rounded-md bg-white px-6 py-16 text-center text-sm text-gray-500">
          No brands found in this category.
        </p>
      ) : (
        <div className="rounded-md bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {paginatedBrands.map((brand) => (
              <GifRevealWrapperCard borderSize={4} key={brand.id}>
                <div className="text-center px-6 py-8 border bg-white">
                  <h3 className="text-xl font-serif text-gray-900 mb-2">{brand.title}</h3>
                  {brand.subtitles.length > 0 && (
                    <p className="text-amber-600 text-sm mb-3">
                      {brand.subtitles.join(' / ')}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm leading-relaxed">{brand.description}</p>
                </div>
              </GifRevealWrapperCard>
            ))}
          </div>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Brands;
