"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
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
    "category",
    "brand",
    "subscriber",
  ],
  endpoints: () => ({}),
});
