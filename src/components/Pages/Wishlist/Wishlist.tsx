'use client';
import { useMemo, useState } from 'react';
import { Product } from '@/types/types';
import Pagination from '@/components/UI/Pagination';
import WishlistCard from './WishlistCard';

// Replace with real wishlist data (e.g. from context, API, or localStorage)
export const wishlistProducts: Product[] = [
  { id: 1, name: 'Dunhill Switch', brand: 'Dunhill', strength: 'Full Strength', flavour: 'Classic', packSize: '20 Pack', price: 456.0, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 2, name: 'Dunhill Switch', brand: 'Dunhill', strength: 'Full Strength', flavour: 'Classic', packSize: '20 Pack', price: 456.0, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 3, name: 'Dunhill Switch', brand: 'Dunhill', strength: 'Full Strength', flavour: 'Classic', packSize: '20 Pack', price: 456.0, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 4, name: 'Dunhill Switch', brand: 'Dunhill', strength: 'Full Strength', flavour: 'Classic', packSize: '20 Pack', price: 456.0, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
  { id: 5, name: 'Dunhill Switch', brand: 'Dunhill', strength: 'Full Strength', flavour: 'Classic', packSize: '20 Pack', price: 456.0, image: 'https://i.ibb.co/HT5WKhpP/fire.png' },
];

const TOTAL_PRODUCTS = 93; // total across the whole catalogue, per the "Showing X of Y" copy
const PRODUCTS_PER_PAGE = 8;

const Wishlist = () => {
  const [items, setItems] = useState<Product[]>(wishlistProducts);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return items.slice(start, start + PRODUCTS_PER_PAGE);
  }, [items, safePage]);

  const handleRemove = (product: Product) => {
    setItems((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleAddToCart = (product: Product) => {
    // hook up to your cart logic here
    console.log('Add to cart:', product);
  };

  const handleMoveAllToCart = () => {
    items.forEach((product) => handleAddToCart(product));
  };

  return (
    <div className="xl:container mx-auto px-2 xl:px-0 py-6">
      {/* Header bar */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-sm md:text-base">Home/Wishlist</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <span className="h-[4px] w-4 bg-[#BF8D2F]" />
            Showing {paginatedItems.length} of {TOTAL_PRODUCTS} products
          </div>
        </div>

        <button
          onClick={handleMoveAllToCart}
          disabled={items.length === 0}
          className="flex-shrink-0 rounded-md bg-[#BF8D2F] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#a87b28] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Move All to Cart
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p className="border border-gray-200 bg-white p-8 text-center text-gray-400">
            Your wishlist is empty.
          </p>
        )}
      </div>

      {/* Pagination */}
      {items.length > 0 && (
        <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default Wishlist;