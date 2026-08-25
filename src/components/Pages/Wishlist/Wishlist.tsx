'use client';
import { useMemo, useState } from 'react';
import { Spin } from 'antd';
import Pagination from '@/components/UI/Pagination';
import WishlistCard from './WishlistCard';
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from '@/redux/features/wishlist/wishlistApi';
import { resolveMediaUrl } from '@/utils/media';
import type { Product } from '@/redux/features/products/productApi';

const PRODUCTS_PER_PAGE = 8;

const Wishlist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const items = useMemo(
    () =>
      (data?.data || []).map((product) => ({
        ...product,
        image: resolveMediaUrl(product.image) || '',
      })),
    [data?.data],
  );

  const totalPages = Math.max(1, Math.ceil(items.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedItems = items.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE,
  );

  const handleRemove = async (product: Product) => {
    await removeFromWishlist(product.id).unwrap();
    if (paginatedItems.length === 1 && currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="xl:container mx-auto px-2 xl:px-0 py-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-sm md:text-base">Home/Wishlist</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <span className="h-[4px] w-4 bg-[#BF8D2F]" />
            Showing {paginatedItems.length} of {items.length} products
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              inStock={product.stockQty > 0}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p className="border border-gray-200 bg-white p-8 text-center text-gray-400">
            Your wishlist is empty.
          </p>
        )}
      </div>

      {items.length > PRODUCTS_PER_PAGE && (
        <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default Wishlist;
