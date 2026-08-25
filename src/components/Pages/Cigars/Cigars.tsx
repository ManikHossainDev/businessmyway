"use client";

import CategoryProductListing from "@/components/Pages/Shop/CategoryProductListing";
import CigarsCard from "./CigarsCard";

const Cigars = () => (
  <CategoryProductListing
    categoryName="Cigars"
    breadcrumb="Home / Cigars"
    Card={CigarsCard}
  />
);

export default Cigars;
