"use client";

import CategoryProductListing from "@/components/Pages/Shop/CategoryProductListing";
import AccessoriesCard from "./AccessoriesCard";

const Accessories = () => (
  <CategoryProductListing
    categoryName="Accessories"
    breadcrumb="Home / Accessories"
    Card={AccessoriesCard}
  />
);

export default Accessories;
