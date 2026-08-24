"use client";

import { baseApi } from "@/redux/api/baseApi";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  countryCode?: string;
  avatar?: string;
  role?: string;
  status?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type AdminUserListParams = {
  page?: number;
  limit?: number;
  search?: string;
};

type AdminUserListResponse = {
  success: boolean;
  message?: string;
  data: AdminUser[];
  meta?: PaginationMeta;
};

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<AdminUserListResponse, AdminUserListParams | void>({
      query: (arg) => ({
        url: "/admin/users",
        params: {
          page: arg?.page ?? 1,
          limit: arg?.limit ?? 10,
          ...(arg?.search ? { search: arg.search } : {}),
        },
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useGetAdminUsersQuery } = userApi;
