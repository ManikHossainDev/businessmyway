"use client";

import { baseApi } from "@/redux/api/baseApi";

export type BrandCategory = {
  id: string;
  name: string;
};

export type Brand = {
  id: string;
  title: string;
  description: string;
  subtitles: string[];
  category: BrandCategory;
  createdAt?: string;
  updatedAt?: string;
};

export type BrandPayload = {
  category: string;
  title: string;
  description: string;
  subtitles: string[];
};

type BrandListResponse = {
  success: boolean;
  message?: string;
  data: Brand[];
};

type BrandResponse = {
  success: boolean;
  message?: string;
  data: Brand | null;
};

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<BrandListResponse, { category?: string } | void>({
      query: (arg) => ({
        url: "/brands",
        params: arg?.category ? { category: arg.category } : undefined,
      }),
      providesTags: ["brand"],
    }),
    getAdminBrands: builder.query<BrandListResponse, void>({
      query: () => "/admin/brands",
      providesTags: ["brand"],
    }),
    createBrand: builder.mutation<BrandResponse, BrandPayload>({
      query: (body) => ({
        url: "/admin/brands",
        method: "POST",
        body,
      }),
      invalidatesTags: ["brand"],
    }),
    updateBrand: builder.mutation<BrandResponse, BrandPayload & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/admin/brands/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetAdminBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
} = brandApi;
