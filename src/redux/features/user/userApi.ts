"use client";

import { baseApi } from "@/redux/api/baseApi";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  countryCode?: string;
  avatar?: string;
  identityDocument?: string;
  identityDocumentType?: "nid" | "driving_license";
  role?: string;
  status?: string;
  onboardingStep?: string;
  isOnboardingCompleted?: boolean;
  isEmailVerified?: boolean;
  dateOfBirth?: string;
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

type AdminUserMutationResponse = {
  success: boolean;
  message?: string;
  data: AdminUser;
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
    approveAdminUser: builder.mutation<AdminUserMutationResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetAdminUsersQuery, useApproveAdminUserMutation } = userApi;
