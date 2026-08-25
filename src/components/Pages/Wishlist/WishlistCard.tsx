'use client';
import type { Product } from '@/redux/features/products/productApi';
import ProductPhoto from '@/components/UI/ProductPhoto';
import AddToCartButton from '@/components/UI/AddToCartButton';

interface WishlistCardProps {
  product: Product;
  inStock?: boolean;
  onAddToCart?: (product: Product) => void;
  onRemove?: (product: Product) => void;
}

const WishlistCard = ({ product, inStock = true, onAddToCart, onRemove }: WishlistCardProps) => {
  const subtitle =
    product.subtitle ||
    product.packSize ||
    product.attributes?.strength ||
    product.brand?.title ||
    '';

  return (
    <div className="flex items-center gap-4 border border-gray-200 bg-white p-2 ">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden md:h-20 md:w-20">
        <ProductPhoto
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-gray-900 md:text-base">
          {product.name}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-xs text-gray-500 md:text-sm">{subtitle}</p>
        ) : null}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
          <span className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-400'}`} />
          {inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      <div className="flex flex-shrink-0 flex-col items-end gap-2">
        <span className="text-base font-semibold text-[#BF8D2F] md:text-lg">
          &pound;{Number(product.price).toFixed(2)}
        </span>
        <AddToCartButton
          productId={product.id}
          disabled={!inStock}
          className="rounded-md bg-[#BF8D2F] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#a87b28] disabled:cursor-not-allowed disabled:bg-gray-300"
        />
        <button
          type="button"
          onClick={() => onRemove?.(product)}
          className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
