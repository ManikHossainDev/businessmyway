"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { Heart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import {
  useAddToWishlistMutation,
  useGetWishlistIdsQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/features/wishlist/wishlistApi";

type WishlistHeartButtonProps = {
  productId?: string;
  iconSize?: number;
  className?: string;
  onSuccess?: () => void;
};

const WishlistHeartButton = ({
  productId,
  iconSize = 18,
  onSuccess,
  className = "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-gray-300 text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900 md:h-10 md:w-10",
}: WishlistHeartButtonProps) => {
  const router = useRouter();
  const token = useAppSelector(selectToken);
  const { data } = useGetWishlistIdsQuery(undefined, { skip: !token });
  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

  const saved = Boolean(productId && (data?.data || []).includes(productId));
  const busy = isAdding || isRemoving;

  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!productId || busy) return;
    if (!token) {
      onSuccess?.();
      router.push("/login");
      return;
    }
    try {
      if (saved) {
        await removeFromWishlist(productId).unwrap();
      } else {
        await addToWishlist(productId).unwrap();
      }
      onSuccess?.();
    } catch {
      // duplicate add is ignored after invalidate
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy || !productId}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      className={className}
    >
      <Heart
        size={iconSize}
        strokeWidth={1.75}
        className={saved ? "fill-[#BF8D2F] text-[#BF8D2F]" : undefined}
      />
    </button>
  );
};

export default WishlistHeartButton;
