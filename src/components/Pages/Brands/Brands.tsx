'use client';

import GifRevealWrapperCard from '@/components/UI/GifRevealWrapperCard';
import Pagination from '@/components/UI/Pagination';
import { useState, useMemo } from 'react';
export interface Brand {
  id: number;
  name: string;
  origin: string;
  description: string;
  productCount: number;
  category: 'Cigarettes' | 'Cigars' | 'Tobacco' | 'Accessories';
}

// Replace with real API data when ready
export const brandsData: Brand[] = [
  {
    id: 1,
    name: 'Davidoff',
    origin: 'Switzerland / Worldwide',
    description:
      'Forty years of relationships with the most prestigious tobacco houses across three continents. Every brand we carry has earned its place.',
    productCount: 42,
    category: 'Cigars',
  },
  {
    id: 2,
    name: 'Cohiba',
    origin: 'Cuba / Dominican Republic',
    description:
      'Born from the personal blend once reserved for Fidel Castro, Cohiba remains the benchmark for prestige and craftsmanship in premium cigars.',
    productCount: 36,
    category: 'Cigars',
  },
  {
    id: 3,
    name: 'Montecristo',
    origin: 'Cuba / Dominican Republic',
    description:
      'Named after the classic novel, Montecristo has been a symbol of consistency and rich, full-bodied flavor since 1935.',
    productCount: 51,
    category: 'Cigars',
  },
  {
    id: 4,
    name: 'Romeo y Julieta',
    origin: 'Cuba / Honduras',
    description:
      'A storied house favored by Winston Churchill, known for balanced, medium-bodied cigars with a smooth, elegant finish.',
    productCount: 29,
    category: 'Cigars',
  },
  {
    id: 5,
    name: 'Marlboro',
    origin: 'United States / Worldwide',
    description:
      'One of the most recognized cigarette brands in the world, offering a consistent range of full-flavor and light blends.',
    productCount: 18,
    category: 'Cigarettes',
  },
  {
    id: 6,
    name: 'Camel',
    origin: 'United States / Worldwide',
    description:
      'A century-old blend of Turkish and American tobaccos, known for its smooth character and distinctive packaging.',
    productCount: 24,
    category: 'Cigarettes',
  },
  {
    id: 7,
    name: 'Dunhill',
    origin: 'United Kingdom / Worldwide',
    description:
      'A heritage British brand blending refined tobacco craftsmanship with a legacy of luxury lifestyle products.',
    productCount: 33,
    category: 'Cigarettes',
  },
  {
    id: 8,
    name: 'Winston',
    origin: 'United States / Worldwide',
    description:
      'A full-flavor American blend known for its bold taste and loyal following since the 1950s.',
    productCount: 15,
    category: 'Cigarettes',
  },
  {
    id: 9,
    name: 'Peterson',
    origin: 'Ireland / Worldwide',
    description:
      'Renowned Irish pipe tobacco maker offering rich, aromatic blends crafted using traditional slow-curing methods.',
    productCount: 22,
    category: 'Tobacco',
  },
  {
    id: 10,
    name: 'Amphora',
    origin: 'Netherlands / Worldwide',
    description:
      'A classic Dutch pipe tobacco brand offering smooth, naturally sweet blends favored by pipe smokers for generations.',
    productCount: 19,
    category: 'Tobacco',
  },
  {
    id: 11,
    name: 'Golden Virginia',
    origin: 'United Kingdom / Worldwide',
    description:
      'A leading rolling tobacco brand known for its rich, full-bodied flavor and finely cut leaf.',
    productCount: 27,
    category: 'Tobacco',
  },
  {
    id: 12,
    name: 'Al Fakher',
    origin: 'United Arab Emirates / Worldwide',
    description:
      'A premium shisha tobacco brand celebrated for its wide range of flavors and consistently smooth smoke.',
    productCount: 45,
    category: 'Tobacco',
  },
  {
    id: 13,
    name: 'Xikar',
    origin: 'United States / Worldwide',
    description:
      'A leading name in cigar accessories, offering precision-engineered cutters, lighters, and cases built to last.',
    productCount: 31,
    category: 'Accessories',
  },
  {
    id: 14,
    name: 'Zippo',
    origin: 'United States / Worldwide',
    description:
      'An iconic lighter brand known for its durable, refillable design and lifetime guarantee since 1932.',
    productCount: 40,
    category: 'Accessories',
  },
  {
    id: 15,
    name: 'Colibri',
    origin: 'United States / Worldwide',
    description:
      'A premium accessories brand specializing in high-performance torch lighters and precision cigar cutters.',
    productCount: 26,
    category: 'Accessories',
  },
  {
    id: 16,
    name: 'Savoy',
    origin: 'Germany / Worldwide',
    description:
      'A craftsman brand producing elegant humidors, cases, and travel accessories for the discerning cigar enthusiast.',
    productCount: 14,
    category: 'Accessories',
  },
];

const CATEGORIES = ['All Brands', 'Cigarettes', 'Cigars', 'Tobacco', 'Accessories'] as const;
type Category = (typeof CATEGORIES)[number];

const PAGE_SIZE = 12;

const Brands = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All Brands');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBrands = useMemo(() => {
    if (activeCategory === 'All Brands') return brandsData;
    return brandsData.filter((brand) => brand.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredBrands.length / PAGE_SIZE));

  const paginatedBrands = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredBrands.slice(start, start + PAGE_SIZE);
  }, [filteredBrands, currentPage]);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="xl:container mx-auto px-2 xl:px-0 py-6">
      <p className="text-gray-400 mb-4">Home / Brands</p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-white border-gray-800 text-gray-900'
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Brands Grid */}
      <div className="rounded-md bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedBrands.map((brand) => (
            <GifRevealWrapperCard borderSize={4} key={brand.id}>
            <div  className="text-center px-6 py-8 border bg-white">
              <h3 className="text-xl font-serif text-gray-900 mb-2">{brand.name}</h3>
              <p className="text-amber-600 text-sm mb-3">{brand.origin}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{brand.description}</p>
              <p className="text-gray-400 text-xs">{brand.productCount} products</p>
            </div>
            </GifRevealWrapperCard>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Brands;