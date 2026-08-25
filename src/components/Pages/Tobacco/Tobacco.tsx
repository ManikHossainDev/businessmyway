"use client";

import CategoryProductListing from "@/components/Pages/Shop/CategoryProductListing";
import TobaccoCard from "./TobaccoCard";

const Tobacco = () => (
  <CategoryProductListing
    categoryName="Tobacco"
    breadcrumb="Home / Tobacco"
    Card={TobaccoCard}
  />
);

export default Tobacco;
