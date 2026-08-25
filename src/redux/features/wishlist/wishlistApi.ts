"use client";

import { baseApi } from "@/redux/api/baseApi";
import type { Product } from "@/redux/features/products/productApi";

type WishlistListResponse = {
  success: boolean;
  message?: string;
  data: Product[];
};

type WishlistIdsResponse = {
  success: boolean;
  message?: string;
  data: string[];
};

type WishlistItemResponse = {
  success: boolean;
  message?: string;
  data: Product | null;
};

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistListResponse, void>({
      query: () => "/wishlist",
      providesTags: ["wishlist"],
    }),
    getWishlistIds: builder.query<WishlistIdsResponse, void>({
      query: () => "/wishlist/ids",
      providesTags: ["wishlist"],
    }),
    addToWishlist: builder.mutation<WishlistItemResponse, string>({
      query: (productId) => ({
        url: "/wishlist",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["wishlist"],
    }),
    removeFromWishlist: builder.mutation<WishlistItemResponse, string>({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useGetWishlistIdsQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
