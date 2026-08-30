"use client";

import { useState } from "react";
// import GifRevealWrapperCard from "@/components/UI/GifRevealWrapperCard";
// import GifRevealWrapper from "@/components/UI/GifRevealWrapper";
import ProductPhoto from "@/components/UI/ProductPhoto";
import WishlistHeartButton from "@/components/UI/WishlistHeartButton";
import AddToCartButton from "@/components/UI/AddToCartButton";
import ProductDetailModal from "@/components/UI/ProductDetailModal";
import type { Product } from "@/redux/features/products/productApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { isAdminRole } from "@/utils/role";

type ShopProductCardProps = {
  product: Product;
  subtitle?: string;
  showSubtitle?: boolean;
};

const ShopProductCard = ({
  product,
  subtitle,
  showSubtitle = true,
}: ShopProductCardProps) => {
  const [open, setOpen] = useState(false);
  const isAdmin = isAdminRole(useAppSelector(selectCurrentUser)?.role);
  const displaySubtitle =
    subtitle ??
    (product.subtitle || product.packSize || product.brand?.title || "");

  return (
    <>
      {/* Hover background GIF disabled for all product cards
      <GifRevealWrapperCard borderSize={5} className="h-full w-full">
      */}
        <article
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen(true);
            }
          }}
          className="group/card flex h-full w-full cursor-pointer flex-col border border-gray-200 outline-none focus-visible:ring-2 focus-visible:ring-[#BF8D2F]"
        >
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
            {showSubtitle && displaySubtitle ? (
              <p className="mb-2 text-sm text-gray-500">{displaySubtitle}</p>
            ) : null}

            <div className="relative mt-auto h-9 overflow-hidden md:h-10">
              <p
                className={`pointer-events-none absolute inset-0 flex items-center text-base font-bold text-amber-700 md:text-lg ${
                  isAdmin
                    ? ""
                    : "transition-all duration-300 ease-out translate-y-0 opacity-100 group-hover/card:-translate-y-2 group-hover/card:opacity-0"
                }`}
              >
                £{Number(product.price).toFixed(2)}
              </p>

              {isAdmin ? null : (
                <div
                  className="pointer-events-none absolute inset-0 flex w-full items-center gap-2
                             translate-y-4 opacity-0
                             transition-all duration-300 ease-out delay-75
                             group-hover/card:pointer-events-auto group-hover/card:translate-y-0 group-hover/card:opacity-100"
                >
                  {/* Hover GIF disabled on add-to-cart button
                  <GifRevealWrapper borderSize={4} className="flex-1">
                    <AddToCartButton productId={product.id} />
                  </GifRevealWrapper>
                  */}
                  <AddToCartButton productId={product.id} />
                  <WishlistHeartButton productId={product.id} />
                </div>
              )}
            </div>
          </div>
        </article>
      {/* </GifRevealWrapperCard> */}

      <ProductDetailModal open={open} product={product} onClose={() => setOpen(false)} />
    </>
  );
};

export default ShopProductCard;
