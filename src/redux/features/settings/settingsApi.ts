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

export type AdminContactMessage = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
};

type AdminSettingResponse = {
  success: boolean;
  message?: string;
  data: PublicSetting | null;
};

type AdminContactsResponse = {
  success: boolean;
  message?: string;
  data: AdminContactMessage[];
};

type UpdateAdminSettingBody = {
  title?: string;
  content?: string;
  metadata?: {
    emails?: string;
    phones?: string;
    address?: string;
  };
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
    getAdminSetting: builder.query<AdminSettingResponse, SettingSlug>({
      query: (slug) => `/admin/settings/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "settings", id: slug }],
    }),
    updateAdminSetting: builder.mutation<
      AdminSettingResponse,
      { slug: SettingSlug; body: UpdateAdminSettingBody }
    >({
      query: ({ slug, body }) => ({
        url: `/admin/settings/${slug}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { slug }) => [{ type: "settings", id: slug }],
    }),
    getAdminContacts: builder.query<AdminContactsResponse, void>({
      query: () => "/admin/settings/contacts",
    }),
  }),
});

export const {
  useGetPublicSettingQuery,
  useSubmitContactMutation,
  useGetAdminSettingQuery,
  useUpdateAdminSettingMutation,
  useGetAdminContactsQuery,
} = settingsApi;
