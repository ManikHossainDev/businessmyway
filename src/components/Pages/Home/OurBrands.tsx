"use client";

import { useState } from "react";
import Link from "next/link";
import { Spin } from "antd";
import { useGetBrandsQuery } from "@/redux/features/brands/brandApi";

const OurBrands = () => {
  const { data, isLoading } = useGetBrandsQuery({ page: 1, limit: 100 });
  const brands = data?.data || [];
  const [paused, setPaused] = useState(false);

  const padded =
    brands.length > 0 && brands.length < 8
      ? Array.from({ length: Math.ceil(8 / brands.length) }, () => brands).flat()
      : brands;
  const track = padded.length ? [...padded, ...padded] : [];

  return (
    <section className="xl:container xl:mx-auto py-10 xl:pt-24">
      <div className="mb-5 flex items-center justify-center gap-4 px-4">
        <span className="h-[4px] w-8 bg-[#BF8D2F]" />
        <h2 className="text-[26px] font-medium tracking-wide text-neutral-800 md:font-corvinus">
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
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-neutral-50 to-transparent md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-neutral-50 to-transparent md:w-16" />

          <div
            className="brands-marquee flex w-max items-center"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {track.map((brand, index) => (
              <Link
                key={`${brand.id}-${index}`}
                href={`/brands?brand=${encodeURIComponent(brand.title)}`}
                className="shrink-0 border-r border-neutral-300 px-6 py-2 text-[16px] text-neutral-500 transition-colors hover:text-[#BF8D2F] md:px-10 md:text-[24px]"
              >
                {brand.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .brands-marquee {
          animation: brands-scroll 32s linear infinite;
        }

        @keyframes brands-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .brands-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default OurBrands;
