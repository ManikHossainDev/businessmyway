"use client";

import GifRevealWrapperCard from "@/components/UI/GifRevealWrapperCard";
import GifRevealWrapper from "@/components/UI/GifRevealWrapper";
import ProductPhoto from "@/components/UI/ProductPhoto";
import WishlistHeartButton from "@/components/UI/WishlistHeartButton";
import AddToCartButton from "@/components/UI/AddToCartButton";
import type { Product } from "@/redux/features/products/productApi";

const SearchResultCard = ({ product }: { product: Product }) => {
  const subtitle =
    product.subtitle ||
    product.packSize?.replace("Pack", "piece/pack") ||
    product.brand?.title ||
    "";

  return (
    <GifRevealWrapperCard borderSize={5} className="h-full w-full">
      <article className="group/card flex h-full w-full flex-col border border-gray-200">
        <div className="aspect-square w-full overflow-hidden bg-white p-3 md:p-4">
          <ProductPhoto
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover/card:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col border-t border-gray-200 bg-white px-4 py-3 md:px-5 md:py-4">
          <h4 className="mb-1 text-[15px] font-semibold leading-snug text-gray-900">
            {product.name}
          </h4>
          {subtitle ? <p className="mb-2 text-sm text-gray-500">{subtitle}</p> : null}

          <div className="relative mt-auto h-9 overflow-hidden md:h-10">
            <p
              className="pointer-events-none absolute inset-0 flex items-center text-base font-bold text-amber-700
                         transition-all duration-300 ease-out
                         translate-y-0 opacity-100
                         group-hover/card:-translate-y-2 group-hover/card:opacity-0
                         md:text-lg"
            >
              £{Number(product.price).toFixed(2)}
            </p>

            <div
              className="pointer-events-none absolute inset-0 flex w-full items-center gap-2
                         translate-y-4 opacity-0
                         transition-all duration-300 ease-out delay-75
                         group-hover/card:pointer-events-auto group-hover/card:translate-y-0 group-hover/card:opacity-100"
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

export default SearchResultCard;
