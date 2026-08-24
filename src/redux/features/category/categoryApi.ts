"use client";

import { baseApi } from "@/redux/api/baseApi";

export type Category = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

type CategoryListResponse = {
  success: boolean;
  message?: string;
  data: Category[];
};

type CategoryResponse = {
  success: boolean;
  message?: string;
  data: Category | null;
};

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryListResponse, void>({
      query: () => "/categories",
      providesTags: ["category"],
    }),
    getAdminCategories: builder.query<CategoryListResponse, void>({
      query: () => "/admin/categories",
      providesTags: ["category"],
    }),
    createCategory: builder.mutation<CategoryResponse, { name: string }>({
      query: (body) => ({
        url: "/admin/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation<CategoryResponse, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/admin/categories/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
