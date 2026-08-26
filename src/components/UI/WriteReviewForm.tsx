"use client";

import { FormEvent, useEffect, useState } from "react";
import { Star } from "lucide-react";
import Swal from "sweetalert2";
import { useGetProfileQuery } from "@/redux/features/Profile/Profile";
import { useCreateReviewMutation } from "@/redux/features/reviews/reviewApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, selectToken } from "@/redux/features/auth/authSlice";
import { isAdminRole } from "@/utils/role";

const WriteReviewForm = ({ compact = false }: { compact?: boolean }) => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectCurrentUser);
  const { data: profileData } = useGetProfileQuery({}, { skip: !token || isAdminRole(user?.role) });
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (profileData?.data?.name) {
      setName((current) => current || profileData.data.name);
    }
  }, [profileData]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createReview({
        name: name.trim(),
        text: text.trim(),
        rating,
        tag: "Verified Buyer",
      }).unwrap();
      setText("");
      setRating(5);
      Swal.fire({
        title: "Thank you",
        text: "Your review is now live on the homepage.",
        icon: "success",
      });
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Could not submit your review. Please try again.";
      Swal.fire({ title: "Review", text: message, icon: "error" });
    }
  };

  if (isAdminRole(user?.role)) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-md border border-[#EDEDED] bg-white ${compact ? "p-5" : "px-5 py-6"}`}
    >
      <p className="mb-3 text-sm font-semibold text-[#1A1A1A]">Write a review</p>
      <p className="mb-4 text-xs text-gray-500">
        Share your experience after your order. It will appear on the homepage carousel.
      </p>
      <div className="mb-4 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1} stars`}
            onClick={() => setRating(i + 1)}
            className="p-0.5"
          >
            <Star
              size={20}
              fill={i < rating ? "#BF8D2F" : "none"}
              stroke="#BF8D2F"
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength={2}
        placeholder="Your name"
        className="mb-3 w-full rounded-sm border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-[#BF8D2F]"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        minLength={10}
        rows={3}
        placeholder="How was your order?"
        className="mb-3 w-full rounded-sm border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-[#BF8D2F]"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-sm bg-[#BF8D2F] py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isLoading ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
};

export default WriteReviewForm;
