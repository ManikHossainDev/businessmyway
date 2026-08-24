"use client";

import { baseApi } from "@/redux/api/baseApi";

export type Subscriber = {
  id: string;
  email: string;
  agreed: boolean;
  name?: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
};

type SubscriberListResponse = {
  success: boolean;
  message?: string;
  data: Subscriber[];
};

type SubscriberResponse = {
  success: boolean;
  message?: string;
  data: Subscriber | null;
};

const subscriberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<
      SubscriberResponse,
      { email: string; agreed: boolean }
    >({
      query: (body) => ({
        url: "/subscribers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["subscriber"],
    }),
    getAdminSubscribers: builder.query<SubscriberListResponse, void>({
      query: () => "/admin/subscribers",
      providesTags: ["subscriber"],
    }),
    sendSubscriberEmail: builder.mutation<
      { success: boolean; message?: string },
      { id: string; subject: string; message: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/admin/subscribers/${id}/email`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSubscribeNewsletterMutation,
  useGetAdminSubscribersQuery,
  useSendSubscriberEmailMutation,
} = subscriberApi;
