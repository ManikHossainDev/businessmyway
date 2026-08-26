"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useGetReviewsQuery, type Review } from "@/redux/features/reviews/reviewApi";

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="flex w-[85vw] shrink-0 flex-col self-stretch border border-neutral-200 bg-white px-6 py-6 sm:w-[340px]">
    <div className="flex gap-1 text-[#BF8D2F]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={24}
          fill={i < review.rating ? "#BF8D2F" : "none"}
          stroke={i < review.rating ? "#BF8D2F" : "#D6D3D1"}
          strokeWidth={i < review.rating ? 0 : 1.5}
        />
      ))}
    </div>

    <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-800 md:text-base">
      {review.text}
    </p>

    <p className="mt-4 text-sm">
      <span className="font-medium text-[#BF8D2F]">{review.name}</span>
      <span className="text-neutral-400"> — {review.tag}</span>
    </p>
  </div>
);

const CustomerReviews = () => {
  
  const { data, isLoading } = useGetReviewsQuery();
  const reviews = (data?.data || []).filter((review) => review?.id);
  const [paused, setPaused] = useState(false);
  const track = reviews.length ? [...reviews, ...reviews] : [];

  return (
    <section className="relative overflow-hidden py-16 xl:container mx-auto xl:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-[4px] w-8 bg-[#BF8D2F]" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
            Customer Reviews
          </span>
          <span className="h-[4px] w-8 bg-[#BF8D2F]" />
        </div>

        <h2 className="mt-3 font-serif text-xl font-medium tracking-tight text-neutral-900 md:font-corvinus md:text-4xl xl:text-4xl">
          What <span className="text-[#BF8D2F] md:font-corvinus">our</span> customers{" "}
          <span className="text-[#BF8D2F] md:font-corvinus">say</span>
        </h2>
      </div>

      {isLoading ? (
        <p className="mt-10 text-center text-sm text-neutral-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="mt-10 text-center text-sm text-neutral-500">
          Reviews from verified buyers will appear here.
        </p>
      ) : (
        <div
          className="relative mt-10 w-full overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused((p) => !p)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-neutral-50 to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-neutral-50 to-transparent md:w-24" />

          <div
            className="marquee-track flex w-max items-stretch"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {track.map((review, i) => (
              <ReviewCard key={`${review.id}-${i}`} review={review} />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .marquee-track {
          animation: scroll 28s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default CustomerReviews;
