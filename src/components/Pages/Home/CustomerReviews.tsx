"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface Review {
  text: string;
  name: string;
  tag: string;
}

const reviews: Review[] = [
  {
    text: "The Reserve No. 12 is unlike anything I've found elsewhere. The packaging alone is an experience this is what luxury should feel like.",
    name: "James W.",
    tag: "Verified Buyer",
  },
  {
    text: "The Reserve No. 12 is unlike anything I've found elsewhere. The packaging alone is an experience this is what luxury should feel like.",
    name: "Sarah K.",
    tag: "Verified Buyer",
  },
  {
    text: "The Reserve No. 12 is unlike anything I've found elsewhere. The packaging alone is an experience this is what luxury should feel like.",
    name: "Michael T.",
    tag: "Verified Buyer",
  },
  {
    text: "The Reserve No. 12 is unlike anything I've found elsewhere. The packaging alone is an experience this is what luxury should feel like.",
    name: "Priya R.",
    tag: "Verified Buyer",
  },
  {
    text: "The Reserve No. 12 is unlike anything I've found elsewhere. The packaging alone is an experience this is what luxury should feel like.",
    name: "David L.",
    tag: "Verified Buyer",
  },
];

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="w-[85vw] shrink-0  border border-neutral-200 bg-white px-6 py-6 sm:w-[320px]">
    <div className="flex gap-1 text-[#BF8D2F]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={24} fill="#BF8D2F" strokeWidth={0} />
      ))}
    </div>

    <p className="mt-4 text-sm md:text-lg leading-relaxed text-neutral-800">
      {review.text}
    </p>

    <p className="mt-5 text-sm">
      <span className="font-medium text-[#BF8D2F]">{review.name}</span>
      <span className="text-neutral-400"> — {review.tag}</span>
    </p>
  </div>
);

const CustomerReviews = () => {
  // paused = true when: mouse hovering (desktop) OR user has tapped (mobile)
  const [paused, setPaused] = useState(false);

  // duplicate the list so the marquee can loop seamlessly (0% -> -50%)
  const track = [...reviews, ...reviews];

  return (
    <section className="xl:container mx-auto relative overflow-hidden  py-16 xl:py-24 ">
      <div className="mx-auto max-w-5xl px-4 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[4px] w-8 bg-[#BF8D2F]" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
            Customer Reviews
          </span>
          <span className="h-[4px] w-8 bg-[#BF8D2F]" />
        </div>

        {/* Heading */}
        <h2 className="mt-3 md:font-corvinus font-serif text-xl xl:text-4xl font-medium tracking-tight text-neutral-900 md:text-4xl">
          What <span className="text-[#BF8D2F] md:font-corvinus text-xl xl:text-4xl font-medium">our</span> customers{" "}
          <span className="text-[#BF8D2F] md:font-corvinus text-xl xl:text-4xl font-medium">say</span>
        </h2>
      </div>

      {/* Marquee viewport — full width, content bleeds beyond the max-w container */}
      <div
        className="relative mt-10 w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused((p) => !p)}
      >
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-neutral-50 to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-neutral-50 to-transparent md:w-24" />

        <div
          className="marquee-track flex w-max"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {track.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

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