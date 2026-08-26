"use client";

import { baseApi } from "@/redux/api/baseApi";

export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  tag: string;
  createdAt?: string;
};

type ReviewListResponse = {
  success: boolean;
  message?: string;
  data: Review[];
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
};

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewListResponse, void>({
      query: () => "/reviews",
      providesTags: ["review"],
    }),
    createReview: builder.mutation<ReviewResponse, CreateReviewBody>({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["review"],
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
  useCreateReviewMutation,
  useGetAdminReviewsQuery,
  useDeleteAdminReviewMutation,
} = reviewApi;
