"use client";

import { baseApi } from "@/redux/api/baseApi";

export type SettingSlug =
  | "privacy_policy"
  | "terms_and_conditions"
  | "about_us"
  | "refund_policy"
  | "shipping_policy";

export type PublicSetting = {
  slug: SettingSlug;
  title: string;
  content: string;
  updatedAt?: string;
  metadata?: {
    emails?: string;
    phones?: string;
    address?: string;
  } | null;
};

export type ContactFormBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type PublicSettingResponse = {
  success: boolean;
  data: PublicSetting | null;
};

type ContactResponse = {
  success: boolean;
  message?: string;
  data: null;
};

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicSetting: builder.query<PublicSettingResponse, SettingSlug>({
      query: (slug) => `/settings/public/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "settings", id: slug }],
    }),
    submitContact: builder.mutation<ContactResponse, ContactFormBody>({
      query: (body) => ({
        url: "/settings/contact",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPublicSettingQuery, useSubmitContactMutation } = settingsApi;
