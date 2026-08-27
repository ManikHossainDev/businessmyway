"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, selectToken } from "@/redux/features/auth/authSlice";
import { isAdminRole } from "@/utils/role";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import {
  useGetWishlistIdsQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/features/wishlist/wishlistApi";

type AddToCartButtonProps = {
  productId?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  onSuccess?: () => void;
};

const AddToCartButton = ({
  productId,
  label = "Add to Cart",
  disabled = false,
  onSuccess,
  className = "flex h-full w-full items-center justify-center rounded-sm bg-[#BF8D2F] px-3 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#a67809] disabled:opacity-60 md:text-sm",
}: AddToCartButtonProps) => {
  const router = useRouter();
  const token = useAppSelector(selectToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const isAdmin = isAdminRole(currentUser?.role);
  const { data: wishlistIdsData } = useGetWishlistIdsQuery(undefined, {
    skip: !token || isAdmin,
  });
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [removeFromWishlist, { isLoading: isRemovingWishlist }] = useRemoveFromWishlistMutation();

  const isLoading = isAddingToCart || isRemovingWishlist;
  const inWishlist = Boolean(
    productId && (wishlistIdsData?.data || []).includes(productId),
  );

  if (isAdmin) return null;

  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!productId || isLoading || disabled) return;
    if (!token) {
      onSuccess?.();
      router.push("/login");
      return;
    }
    try {
      await addToCart({ productId, qty: 1 }).unwrap();
      if (inWishlist) {
        try {
          await removeFromWishlist(productId).unwrap();
        } catch {
          // cart succeeded; wishlist cleanup failure stays silent
        }
      }
      onSuccess?.();
    } catch {
      // stock / auth errors stay silent in the card UI
    }
  };

  return (
    <button type="button" onClick={onClick} disabled={isLoading || !productId || disabled} className={className}>
      <span>{isLoading ? "Adding..." : label}</span>
    </button>
  );
};

export default AddToCartButton;
