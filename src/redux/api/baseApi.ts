"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.recoverylink.co",
    prepareHeaders: (headers, { getState }) => {
      // Extract the token correctly by parsing the stringified token object
      const token = (getState() as RootState).auth.token?.replace(/['"]+/g, "");
      // console.log(`here's the token: `,token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "agreement",
    "Profile",
    "user",
    "product",
    "rating",
    "Payment",
    "PricingPlans",
    "RestorationApplication",
    "User",
    "settings",
  ],
  endpoints: () => ({}),
});
