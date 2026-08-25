/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import GifRevealWrapperCard from '@/components/UI/GifRevealWrapperCard';
import GifRevealWrapper from '@/components/UI/GifRevealWrapper';
import ProductPhoto from '@/components/UI/ProductPhoto';
import WishlistHeartButton from '@/components/UI/WishlistHeartButton';
import AddToCartButton from '@/components/UI/AddToCartButton';

const AccessoriesCard = ({ product }: { product: any }) => {
  return (
    <GifRevealWrapperCard borderSize={5} className="w-full h-full">
      <article className="group/card flex flex-col w-full h-full border border-gray-200">
        {/* Image */}
        <div className="aspect-square w-full bg-white overflow-hidden p-3 md:p-4">
          <ProductPhoto
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover/card:scale-[1.03]"
          />
        </div>

        {/* Info */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 md:px-5 md:py-4 flex-1 flex flex-col">
          <h4 className="font-semibold text-gray-900 text-[15px] mb-1 leading-snug">
            {product.name}
          </h4>
          <p className="text-gray-500 text-sm mb-2">
            {product.subtitle || product.packSize || ''}
          </p>

          {/* Price <-> Actions swap on hover, fixed-height wrapper so no layout jump */}
          <div className="relative mt-auto h-9 md:h-10 overflow-hidden">
            {/* Default: price */}
            <p
              className="absolute inset-0 flex items-center text-base md:text-lg font-bold text-amber-700
                         transition-all duration-300 ease-out
                         opacity-100 translate-y-0
                         group-hover/card:opacity-0 group-hover/card:-translate-y-2
                         pointer-events-none"
            >
              £{Number(product.price).toFixed(2)}
            </p>

            {/* Hover: Explore Collection + wishlist, slides up from below */}
            <div
              className="w-full absolute inset-0 flex items-center gap-2
                         transition-all duration-300 ease-out delay-75
                         opacity-0 translate-y-4
                         group-hover/card:opacity-100 group-hover/card:translate-y-0
                         pointer-events-none group-hover/card:pointer-events-auto"
            >
              <GifRevealWrapper borderSize={4} className="flex-1">
                <AddToCartButton productId={product.id} />
              </GifRevealWrapper>
              <WishlistHeartButton productId={product.id} />
            </div>
          </div>
        </div>
      </article>
    </GifRevealWrapperCard>
  );
};

export default AccessoriesCard;