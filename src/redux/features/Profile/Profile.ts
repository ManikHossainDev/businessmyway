"use client";

import { baseApi } from "@/redux/api/baseApi";

export type SavedAddress = {
  id: string;
  label: string;
  houseNumber: string;
  area: string;
  location: string;
  postcode?: string;
  isDefault: boolean;
};

export type SavedAddressPayload = {
  label: string;
  houseNumber: string;
  area: string;
  location: string;
  postcode?: string;
  isDefault?: boolean;
};

type ProfileResponse = {
  success: boolean;
  message?: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    savedAddresses?: SavedAddress[];
  };
};

const Profile = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    UpdateProfile: builder.mutation({
      query: (data: FormData | Record<string, unknown>) => ({
        url: "/users/me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    deleteProfile: builder.mutation<unknown, void>({
      query: () => ({
        url: `/users/me`,
        method: "DELETE",
      }),
    }),
    addAddress: builder.mutation<ProfileResponse, SavedAddressPayload>({
      query: (body) => ({
        url: "/users/me/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateAddress: builder.mutation<ProfileResponse, SavedAddressPayload & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/users/me/addresses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    removeAddress: builder.mutation<ProfileResponse, string>({
      query: (id) => ({
        url: `/users/me/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
    setDefaultAddress: builder.mutation<ProfileResponse, string>({
      query: (id) => ({
        url: `/users/me/addresses/${id}/default`,
        method: "PATCH",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useRemoveAddressMutation,
  useSetDefaultAddressMutation,
} = Profile;
