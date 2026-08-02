"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import GifRevealWrapperCard from "@/components/UI/GifRevealWrapperCard";
import Image from "next/image";
import GifRevealWrapper from "@/components/UI/GifRevealWrapper";

const PRODUCT = {
  name: "Zino Honduras Robusto Cigars – Box of 25",
  price: 456.0,
  image: "https://i.ibb.co/4wCff0y7/01.png",
};

// ── Responsive card count (custom breakpoints) ─────────────────────────────────
// sm: 375px | md: 768px | lg: 1024px | xl: 1336px
const getCardCount = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1336) return 4; // xl
  if (window.innerWidth >= 1024) return 3; // lg
  if (window.innerWidth >= 768)  return 2; // md
  return 1;                                // sm / mobile
};

const FeaturedProducts = () =>  {
  const [cardCount, setCardCount] = useState(getCardCount);
  const [start, setStart] = useState(0);
  const trackRef = useRef(null);

  // 20 items so the carousel actually has room to scroll on every breakpoint
  const items = Array.from({ length: 20 }, (_, i) => ({ id: i, ...PRODUCT }));

  useEffect(() => {
    const handleResize = () => {
      const next = getCardCount();
      setCardCount(next);
      setStart((s) => Math.min(s, Math.max(0, items.length - next)));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items.length]);

  const canPrev = start > 0;
  const canNext = start + cardCount < items.length;

  return (
    <section className="w-full bg-white px-3 xl:px-0 py-10  md:py-12 xl:py-24 border-b border-[#E5E5E5] ">
      <div className="mx-auto xl:container">

        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-8 bg-[#BF8D2F]" />
              <span className="text-xs md:text-sm xl:text-base tracking-[0.18em] text-neutral-500">
                Curated Selection
              </span>
            </div>
            <h2 className="md:font-corvinus font-serif text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-neutral-900">
              Featured{" "}
              <span className="md:font-corvinus bg-gradient-to-r from-[#b9862f] to-[#e0b563] font-medium bg-clip-text text-transparent">
                Products
              </span>
            </h2>
          </div>

          <button
            type="button"
            className="rounded-sm border border-neutral-300 px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm xl:text-base font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
          >
            View All Products
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            type="button"
            aria-label="Previous products"
            disabled={!canPrev}
            onClick={() => setStart((s) => Math.max(0, s - 1))}
            className="absolute left-0 top-2/4 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white p-1.5 md:p-2 shadow-sm transition-opacity hover:border-neutral-900 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={16} strokeWidth={1.75} className="md:w-[18px] md:h-[18px]" />
          </button>

          <button
            type="button"
            aria-label="Next products"
            disabled={!canNext}
            onClick={() => setStart((s) => Math.min(items.length - cardCount, s + 1))}
            className="absolute right-0 top-2/4 z-10 translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white p-1.5 md:p-2 shadow-sm transition-opacity hover:border-neutral-900 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight size={16} strokeWidth={1.75} className="md:w-[18px] md:h-[18px]" />
          </button>

          <div className="overflow-hidden border border-neutral-200">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{
                width: `${(items.length / cardCount) * 100}%`,
                transform: `translateX(-${(start * 100) / items.length}%)`,
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{ width: `${100 / items.length}%` }}
                  className="w-full h-full shrink-0 border-r border-neutral-200 last:border-r-0"
                >
                  <GifRevealWrapperCard
                    borderSize={5}
                    className="w-full h-full"
                  >
                <article className="group/card flex flex-col w-full h-full">
                  <div className="aspect-square w-full overflow-hidden bg-white p-3 md:p-4">
                    <Image
                     width={300}
                     height={300}
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover/card:scale-[1.03]"
                    />
                  </div>

                  <div className="bg-white border-t border-neutral-200 px-4 py-3 md:px-5 md:py-4">
                    <h3 className="text-xs md:text-sm xl:text-base font-semibold leading-snug text-neutral-800">
                      {item.name}
                    </h3>

                    {/* Price <-> Actions. Fixed-height wrapper so no stray gap is reserved. */}
                    <div className="relative mt-1.5 md:mt-2 h-9 md:h-10 overflow-hidden">
                      {/* Default state: price — fades out and eases up slightly */}
                      <p
                        className="absolute inset-0 flex items-center text-base md:text-lg xl:text-xl font-bold text-[#BF8D2F]
                                   transition-all duration-300 ease-out
                                   opacity-100 translate-y-0
                                   group-hover/card:opacity-0 group-hover/card:-translate-y-2
                                   pointer-events-none"
                      >
                        £{item.price.toFixed(2)}
                      </p>

                      {/* Hover state: Explore Collection + wishlist — slides up from below */}
                      <div
                        className="w-full absolute inset-0 flex items-center gap-2
                                   transition-all duration-300 ease-out delay-75
                                   opacity-0 translate-y-4
                                   group-hover/card:opacity-100 group-hover/card:translate-y-0
                                   pointer-events-none group-hover/card:pointer-events-auto"
                      >
                        <GifRevealWrapper borderSize={4} className="flex-1">
                        <button
                          type="button"
                          className="w-full h-full rounded-sm bg-[#BF8D2F] px-3 py-3 text-xs md:text-sm font-semibold
                                    text-white transition-colors hover:bg-[#a67809]
                                    flex items-center justify-center"
                        >
                          <span>Explore Collection</span>
                        </button>
                      </GifRevealWrapper>
                        <button
                          type="button"
                          aria-label="Add to wishlist"
                          className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-sm
                                     border border-neutral-300 text-neutral-700 transition-colors
                                     hover:border-neutral-900 hover:text-neutral-900"
                        >
                          <Heart size={32} strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
                </GifRevealWrapperCard>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;