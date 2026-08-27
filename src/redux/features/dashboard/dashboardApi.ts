"use client";

import { baseApi } from "@/redux/api/baseApi";
import type { ShopOrder } from "@/redux/features/orders/orderApi";
import type { AdminUser } from "@/redux/features/user/userApi";

export type DashboardStats = {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalEarnings: number;
  recentOrders: ShopOrder[];
  recentUsers: AdminUser[];
};

type DashboardStatsResponse = {
  success: boolean;
  message?: string;
  data: DashboardStats;
};

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => "/admin/dashboard",
      providesTags: ["product", "order", "user"],
    }),
  }),
});

export const { useGetAdminDashboardStatsQuery } = dashboardApi;
