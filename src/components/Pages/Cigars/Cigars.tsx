/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useMemo, useState } from 'react';
import { Product } from '@/types/types';
import Pagination from '@/components/UI/Pagination';
import CigarsSidebar from './CigarsSidebar';
import CigarsCard from './CigarsCard';

export const products: Product[] = [
  { id: 1, name: 'Davidoff Classic', brand: 'Davidoff', strength: 'Medium', flavour: 'Classic', packSize: '20 Pack', price: 12.5, image: 'https://i.ibb.co/4wCff0y7/01.png' },
  { id: 2, name: 'Davidoff Gold', brand: 'Davidoff', strength: 'Light', flavour: 'Classic', packSize: '10 Pack', price: 7.0, image: 'https://i.ibb.co/4wCff0y7/01.png' },
  { id: 3, name: 'Davidoff Menthol', brand: 'Davidoff', strength: 'Light', flavour: 'Menthol', packSize: '20 Pack', price: 13.0, image: 'https://i.ibb.co/4wCff0y7/01.png' },
  { id: 4, name: 'Marlboro Red', brand: 'Marlboro', strength: 'Full Strength', flavour: 'Classic', packSize: '20 Pack', price: 11.5, image: 'https://i.ibb.co/4wCff0y7/01.png' },
  { id: 5, name: 'Marlboro Gold', brand: 'Marlboro', strength: 'Light', flavour: 'Classic', packSize: '20 Pack', price: 11.5, image: 'https://i.ibb.co/4wCff0y7/01.png' },
  { id: 6, name: 'Marlboro Ice Blast', brand: 'Marlboro', strength: 'Medium', flavour: 'Menthol', packSize: '10 Pack', price: 6.5, image: 'https://i.ibb.co/4wCff0y7/01.png' },
  { id: 7, name: 'Dunhill Fine Cut', brand: 'Dunhill', strength: 'Ultra Light', flavour: 'Classic', packSize: '20 Pack', price: 12.0, image: 'https://i.ibb.co/4wCff0y7/01.png' },
  { id: 8, name: 'Dunhill Menthol', brand: 'Dunhill', strength: 'Medium', flavour: 'Menthol', packSize: 'Carton x 10', price: 95.0, image: 'https://i.ibb.co/4wCff0y7/01.png' },
  { id: 9, name: 'Dunhill Vanilla Mix', brand: 'Dunhill', strength: 'Light', flavour: 'Vanilla', packSize: '20 Pack', price: 12.5, image: 'https://i.ibb.co/4wCff0y7/01.png' },
  { id: 10, name: 'Davidoff Carton', brand: 'Davidoff', strength: 'Full Strength', flavour: 'Classic', packSize: 'Carton x 10', price: 98.0, image: 'https://i.ibb.co/4wCff0y7/01.png' },
];

interface Filters {
  Strength: string[];
  Flavour: string[];
  Brand: string[];
  'Pack Size': string[];
  minPrice: string;
  maxPrice: string;
}

type FilterCategory = 'Strength' | 'Flavour' | 'Brand' | 'Pack Size';
type PriceKey = 'minPrice' | 'maxPrice';

const initialFilters: Filters = {
  Strength: [],
  Flavour: [],
  Brand: [],
  'Pack Size': [],
  minPrice: '',
  maxPrice: '',
};

const categoryToField: Record<FilterCategory, keyof typeof products[number]> = {
  Strength: 'strength',
  Flavour: 'flavour',
  Brand: 'brand',
  'Pack Size': 'packSize',
};

const sortOptions = ['Best Selling', 'Price: Low to High', 'Price: High to Low', 'Newest'] as const;
type SortOption = typeof sortOptions[number];

const PRODUCTS_PER_PAGE = 8;

const Cigars = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>('Best Selling');
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (category: FilterCategory, value: string) => {
    setFilters((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const handlePriceChange = (key: PriceKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product:any) => {
      for (const category of Object.keys(categoryToField) as FilterCategory[]) {
        const selected = appliedFilters[category];
        if (selected.length > 0) {
          const field = categoryToField[category];
          if (!selected.includes(String(product[field]))) return false;
        }
      }
      const min = appliedFilters.minPrice ? parseFloat(appliedFilters.minPrice) : null;
      const max = appliedFilters.maxPrice ? parseFloat(appliedFilters.maxPrice) : null;
      if (min !== null && product.price < min) return false;
      if (max !== null && product.price > max) return false;
      return true;
    });

    if (sortBy === 'Price: Low to High') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'Newest') result = [...result].sort((a, b) => b.id - a.id);

    return result;
  }, [appliedFilters, sortBy]);

  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, safePage]);

  return (
    <div className="xl:container mx-auto px-2 xl:px-0 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <CigarsSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onPriceChange={handlePriceChange}
          onApply={handleApply}
          onReset={handleReset}
        />

        <div className="flex-1">
          {/* Header bar */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span className="w-4 h-[4px] bg-[#BF8D2F]" />
              Showing {filteredProducts.length} of {total} products
            </div>

            <div className="relative z-30">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {sortBy}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        opt === sortBy ? 'text-amber-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product grid */}
        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-px border-[1px] border-gray-200">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product:any) => (
                <div key={product.id} className="bg-white">
                  <CigarsCard product={product} />
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-full p-8 text-center bg-white">
                No products found matching the selected filters.
              </p>
            )}
        </div>
        
          {/* Pagination */}
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
        </div>
      </div>
    </div>
  );
};

export default Cigars;