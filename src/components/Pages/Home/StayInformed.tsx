"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { useSubscribeNewsletterMutation } from "@/redux/features/subscribers/subscriberApi";

const StayInformed = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [subscribe, { isLoading }] = useSubscribeNewsletterMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (!agreed) {
      Swal.fire({
        title: "Agreement required",
        text: "Please accept the Privacy Policy to subscribe.",
        icon: "warning",
      });
      return;
    }

    try {
      await subscribe({ email: email.trim(), agreed: true }).unwrap();
      setEmail("");
      setAgreed(false);
      Swal.fire({
        title: "Subscribed",
        text: "You are now on the Inner Circle list.",
        icon: "success",
      });
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Failed to subscribe. Please try again.";
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });
    }
  };

  return (
    <section className="px-2 lg:px-6 py-10 md:py-16 xl:py-24">
      <div className="xl:container mx-auto grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-[4px] w-8 bg-[#BF8D2F]" />
            <span className="font-[Jost] text-[20px] leading-none tracking-normal text-neutral-700">
              Stay Informed
            </span>
          </div>

          <h2 className="mt-3 md:font-corvinus font-medium xl:text-[60px] tracking-normal text-neutral-900">
            Join the <span className="text-[#BF8D2F] md:font-corvinus font-medium">Inner Circle</span>
          </h2>

          <p className="mt-4 max-w-md font-[Jost] font-normal text-[20px] leading-none tracking-normal text-neutral-600">
            Be the first to discover new arrivals, exclusive reserve
            releases, and members-only offers. We send thoughtfully — never
            more than twice a month.
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-sm border border-neutral-300 bg-white px-4 py-3 font-[Jost] text-sm
                         text-neutral-900 placeholder:text-neutral-400 outline-none
                         focus:border-[#BF8D2F] focus:ring-1 focus:ring-[#BF8D2F]"
            />
            <button
              type="submit"
              disabled={!agreed || isLoading}
              className="shrink-0 rounded-sm bg-[#BF8D2F] px-6 py-3 font-[Jost] text-sm font-semibold text-white
                         transition-colors hover:bg-[#a67809] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Subscribe"}
            </button>
          </form>

          <label className="mt-3 flex items-start gap-2 font-[Jost] text-xs leading-relaxed text-neutral-600">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm border-neutral-300 accent-[#BF8D2F]"
            />
            <span>
              I agree to receive marketing emails and accept the{" "}
              <Link
                href="/privacy-policy"
                className="text-[#BF8D2F] underline underline-offset-2 hover:text-[#a67809]"
              >
                Privacy Policy.
              </Link>
              <br />
              Unsubscribe at any time.
            </span>
          </label>
        </div>
      </div>
    </section>
  );
};

export default StayInformed;
