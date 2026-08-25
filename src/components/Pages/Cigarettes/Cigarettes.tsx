"use client";

import CategoryProductListing from "@/components/Pages/Shop/CategoryProductListing";
import ProductCard from "./ProductCard";

const Cigarettes = () => (
  <CategoryProductListing
    categoryName="Cigarettes"
    breadcrumb="Home / Cigarettes"
    Card={ProductCard}
  />
);

export default Cigarettes;
