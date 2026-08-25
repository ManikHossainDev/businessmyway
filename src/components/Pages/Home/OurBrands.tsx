"use client";

import Link from "next/link";
import { Spin } from "antd";
import { useGetBrandsQuery } from "@/redux/features/brands/brandApi";

const OurBrands = () => {
  const { data, isLoading } = useGetBrandsQuery({ page: 1, limit: 100 });
  const brands = data?.data || [];

  return (
    <section className="py-10 xl:pt-24 px-4">
      <div className="flex items-center justify-center gap-4 mb-5">
        <span className="h-[4px] w-8 bg-[#BF8D2F]" />
        <h2 className="text-[26px] md:font-corvinus font-medium tracking-wide text-neutral-800">
          Our Brands
        </h2>
        <span className="h-[4px] w-8 bg-[#BF8D2F]" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Spin />
        </div>
      ) : brands.length === 0 ? (
        <p className="text-center text-neutral-500">No brands available yet.</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center divide-x divide-neutral-300">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href="/brands"
              className="px-2 lg:px-6 py-2 text-[16px] md:text-[24px] text-neutral-500 hover:text-[#BF8D2F] transition-colors"
            >
              {brand.title}
              {/* {(brand.productCount ?? 0) > 0 ? (
                <span className="ml-1 text-sm text-neutral-400">({brand.productCount})</span>
              ) : null} */}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default OurBrands;
