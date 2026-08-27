"use client";

import { baseApi } from "@/redux/api/baseApi";

export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  tag: string;
  productId?: string | null;
  productName?: string | null;
  userId?: string | null;
  userName?: string | null;
  userAvatar?: string | null;
  userLocation?: string | null;
  createdAt?: string;
};

export type ProductReviewMeta = {
  count: number;
  averageRating: number;
};

type ReviewListResponse = {
  success: boolean;
  message?: string;
  data: Review[];
  meta?: ProductReviewMeta;
};

type ReviewResponse = {
  success: boolean;
  message?: string;
  data: Review | null;
};

type CreateReviewBody = {
  name: string;
  text: string;
  rating: number;
  tag?: string;
  productId?: string;
};

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewListResponse, void>({
      query: () => "/reviews",
      providesTags: ["review"],
    }),
    getProductReviews: builder.query<ReviewListResponse, string>({
      query: (productId) => `/reviews/product/${productId}`,
      providesTags: (_result, _error, productId) => [
        "review",
        { type: "review", id: productId },
      ],
    }),
    createReview: builder.mutation<ReviewResponse, CreateReviewBody>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, arg) =>
        arg.productId
          ? ["review", { type: "review", id: arg.productId }]
          : ["review"],
    }),
    getAdminReviews: builder.query<ReviewListResponse, void>({
      query: () => "/admin/reviews",
      providesTags: ["review"],
    }),
    deleteAdminReview: builder.mutation<{ success: boolean; message?: string }, string>({
      query: (id) => ({
        url: `/admin/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  useGetAdminReviewsQuery,
  useDeleteAdminReviewMutation,
} = reviewApi;
