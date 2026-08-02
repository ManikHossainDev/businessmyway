
import CustomerReviews from "@/components/Pages/Home/CustomerReviews";
import FeaturedProducts from "@/components/Pages/Home/FeaturedProducts";
import HeroBannerSection from "@/components/Pages/Home/HeroBannerSection";
import NewArrivals from "@/components/Pages/Home/NewArrivals";
import OurBrands from "@/components/Pages/Home/OurBrands";
import StayInformed from "@/components/Pages/Home/StayInformed";
import TheReserveCollection from "@/components/Pages/Home/TheReserveCollection";
import React from "react";

const HomePage = () => {
  return (
    <section>
      <HeroBannerSection />
      <FeaturedProducts />
      <OurBrands />
      <TheReserveCollection />
      <NewArrivals />
      <div className="border-y border-[#E5E5E5]">
        <CustomerReviews />
      </div>
      <StayInformed />
    </section>
  );
};

export default HomePage;
