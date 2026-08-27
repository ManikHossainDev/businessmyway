"use client";

import ShopProductCard from "@/components/UI/ShopProductCard";
import type { Product } from "@/redux/features/products/productApi";

const CigarsCard = ({ product }: { product: Product }) => (
  <ShopProductCard product={product} />
);

export default CigarsCard;
