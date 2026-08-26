"use client";

import { baseApi } from "@/redux/api/baseApi";

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  metadata?: Record<string, unknown>;
  createdAt?: string;
};

type NotificationListResponse = {
  success: boolean;
  message?: string;
  data: AppNotification[];
};

type UnreadCountResponse = {
  success: boolean;
  data: { count: number };
};

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationListResponse, void>({
      query: () => ({
        url: "/notifications",
        params: { limit: 30, sort: "-createdAt" },
      }),
      providesTags: ["notification"],
    }),
    getUnreadNotificationCount: builder.query<UnreadCountResponse, void>({
      query: () => "/notifications/unread-count",
      providesTags: ["notification"],
    }),
    markNotificationRead: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
    markAllNotificationsRead: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = notificationApi;
