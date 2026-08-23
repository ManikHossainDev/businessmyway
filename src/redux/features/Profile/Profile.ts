"use client";

import { baseApi } from "@/redux/api/baseApi";

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
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = Profile;