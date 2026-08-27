"use client";

import { baseApi } from "@/redux/api/baseApi";

export type CartItem = {
  id: string;
  qty: number;
  title: string;
  image: string;
  price: number;
  stockQty: number;
};

type CartResponse = {
  success: boolean;
  message?: string;
  data: CartItem[];
};

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => "/cart",
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation<CartResponse, { productId: string; qty?: number }>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cart"],
    }),
    updateCartQty: builder.mutation<CartResponse, { productId: string; qty: number }>({
      query: ({ productId, qty }) => ({
        url: `/cart/${productId}`,
        method: "PATCH",
        body: { qty },
      }),
      invalidatesTags: ["cart"],
    }),
    removeFromCart: builder.mutation<CartResponse, string>({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    clearCart: builder.mutation<CartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            draft.data = [];
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          dispatch(baseApi.util.invalidateTags(["cart"]));
        }
      },
      invalidatesTags: ["cart"],
    }),
  }),
});

export { cartApi };

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartQtyMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
