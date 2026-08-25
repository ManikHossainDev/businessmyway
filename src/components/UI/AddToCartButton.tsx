"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";

type AddToCartButtonProps = {
  productId?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
};

const AddToCartButton = ({
  productId,
  label = "Add to Cart",
  disabled = false,
  className = "flex h-full w-full items-center justify-center rounded-sm bg-[#BF8D2F] px-3 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#a67809] disabled:opacity-60 md:text-sm",
}: AddToCartButtonProps) => {
  const router = useRouter();
  const token = useAppSelector(selectToken);
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!productId || isLoading || disabled) return;
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await addToCart({ productId, qty: 1 }).unwrap();
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
