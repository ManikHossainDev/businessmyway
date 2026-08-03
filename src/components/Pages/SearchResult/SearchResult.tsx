'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Pagination from '@/components/UI/Pagination';
import SearchResultCard from './SearchResultCard';

// ---------------------------------------------
// Types
// ---------------------------------------------
export interface Product {
  id: number;
  name: string;
  brand: string;
  strength: string;
  flavour: string;
  packSize: string;
  price: number;
  image: string;
}

// ---------------------------------------------
// Data
// ---------------------------------------------
export const products: Product[] = [
  { id: 1, name: 'Davidoff Classic', brand: 'Davidoff', strength: 'Medium', flavour: 'Classic', packSize: '20 Pack', price: 12.5, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 2, name: 'Davidoff Gold', brand: 'Davidoff', strength: 'Light', flavour: 'Classic', packSize: '10 Pack', price: 7.0, image: 'https://i.ibb.co/ymXj1gFw/kachh.png' },
  { id: 3, name: 'Davidoff Menthol', brand: 'Davidoff', strength: 'Light', flavour: 'Menthol', packSize: '20 Pack', price: 13.0, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 4, name: 'Marlboro Red', brand: 'Marlboro', strength: 'Full Strength', flavour: 'Classic', packSize: '20 Pack', price: 11.5, image: 'https://i.ibb.co/ymXj1gFw/kachh.png' },
  { id: 5, name: 'Marlboro Gold', brand: 'Marlboro', strength: 'Light', flavour: 'Classic', packSize: '20 Pack', price: 11.5, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 6, name: 'Marlboro Ice Blast', brand: 'Marlboro', strength: 'Medium', flavour: 'Menthol', packSize: '10 Pack', price: 6.5, image: 'https://i.ibb.co/ymXj1gFw/kachh.png' },
  { id: 7, name: 'Dunhill Fine Cut', brand: 'Dunhill', strength: 'Ultra Light', flavour: 'Classic', packSize: '20 Pack', price: 12.0, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 8, name: 'Dunhill Menthol', brand: 'Dunhill', strength: 'Medium', flavour: 'Menthol', packSize: 'Carton x 10', price: 95.0, image: 'https://i.ibb.co/ymXj1gFw/kachh.png' },
  { id: 9, name: 'Dunhill Vanilla Mix', brand: 'Dunhill', strength: 'Light', flavour: 'Vanilla', packSize: '20 Pack', price: 12.5, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 10, name: 'Davidoff Carton', brand: 'Davidoff', strength: 'Full Strength', flavour: 'Classic', packSize: 'Carton x 10', price: 98.0, image: 'https://i.ibb.co/ymXj1gFw/kachh.png' },
  { id: 11, name: 'Zino Honduras Robusto', brand: 'Dunhill Switch', strength: 'Medium', flavour: 'Classic', packSize: '20 pieces/pack', price: 456.0, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 12, name: 'Cohiba Robusto', brand: 'Cohiba', strength: 'Full Strength', flavour: 'Classic', packSize: '20 pieces/pack', price: 456.0, image: 'https://i.ibb.co/ymXj1gFw/kachh.png' },
];

const popularSearches = [
  'Boarding No 15',
  'Davidoff',
  'Menthol',
  'Robusto',
  'Dark Lights',
  'Fill up',
  'Cohiba',
  'Slim',
];

const sortOptions = ['Best Selling', 'Price: Low to High', 'Price: High to Low', 'Newest'] as const;
type SortOption = (typeof sortOptions)[number];

const RESULTS_PER_PAGE = 8;

// ---------------------------------------------
// Main single-page component
// ---------------------------------------------
const SearchResult = ({ onClose }: { onClose?: () => void }) => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('Best Selling');
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasSearched = submittedQuery.trim().length > 0;

  // close sort dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!hasSearched) return [];
    const q = submittedQuery.toLowerCase();
    let result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.flavour.toLowerCase().includes(q)
    );

    if (sortBy === 'Price: Low to High') result = result.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') result = result.sort((a, b) => b.price - a.price);
    if (sortBy === 'Newest') result = result.sort((a, b) => b.id - a.id);

    return result;
  }, [hasSearched, submittedQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / RESULTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * RESULTS_PER_PAGE;
    return filteredProducts.slice(start, start + RESULTS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const runSearch = (term: string) => {
    setQuery(term);
    setSubmittedQuery(term);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setQuery('');
    setSubmittedQuery('');
    setCurrentPage(1);
  };

  // Close icon now also clears the search (same function as the old "Clear search" button),
  // then closes the panel if a parent onClose was provided.
  const handleCloseClick = () => {
    clearSearch();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="xl:container mx-auto px-4 py-4">
        <br /> <br />
        <div className="w-full lg:w-[50%] mx-auto flex flex-col gap-4">
            {/* Top search bar */}
                <div className="w-full  flex items-center gap-4 border-b-2 border-[#BF8D2F]  mt-28">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BF8D2F" strokeWidth="2" className="shrink-0">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>

                <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && runSearch(query)}
                    placeholder="Search products, brands..."
                    className="flex-1 text-lg outline-none placeholder:text-gray-400"
                />

                <button
                    onClick={handleCloseClick}
                    className="text-red-500 hover:text-gray-800 shrink-0"
                    aria-label="Close search"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                </div>

                {/* STATE 1: nothing searched yet — popular searches (Image 1) */}
                {!hasSearched && (
                <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-2 text-center">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                        <button
                        key={term}
                        onClick={() => runSearch(term)}
                        className="border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                        {term}
                        </button>
                    ))}
                    </div>
                </div>
             )}
        </div>

        {/* STATE 2: results (Image 2) */}
        {hasSearched && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} results for &quot;{submittedQuery}&quot;
              </p>

              {/* Sort dropdown moved here, where "Clear search" used to be */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                >
                  {sortBy}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {sortOpen && (
                  <div className="absolute z-40 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48">
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

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-px border border-gray-200">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <div key={product.id} className="bg-white">
                    <SearchResultCard product={product} />
                  </div>
                ))
              ) : (
                <p className="text-gray-400 col-span-full p-8 text-center bg-white">
                  No products found for &quot;{submittedQuery}&quot;.
                </p>
              )}
            </div>

            {/* Pagination */}
            <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )} 
      </div>
    </div>
  );
};

export default SearchResult;