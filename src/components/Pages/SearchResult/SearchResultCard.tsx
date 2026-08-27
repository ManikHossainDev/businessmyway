"use client";

import ShopProductCard from "@/components/UI/ShopProductCard";
import type { Product } from "@/redux/features/products/productApi";

const SearchResultCard = ({ product }: { product: Product }) => {
  const subtitle =
    product.subtitle ||
    product.packSize?.replace("Pack", "piece/pack") ||
    product.brand?.title ||
    "";

  return <ShopProductCard product={product} subtitle={subtitle} />;
};

export default SearchResultCard;
