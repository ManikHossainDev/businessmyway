"use client";

import { baseApi } from "@/redux/api/baseApi";

export type DeliveryOption = {
  day: string;
  price: number;
};

export type DeliveryConfig = {
  id?: string;
  maximumPrice: number;
  standardDelivery: DeliveryOption;
  expressDelivery: DeliveryOption;
  createdAt?: string;
  updatedAt?: string;
};

type DeliveryResponse = {
  success: boolean;
  message?: string;
  data: DeliveryConfig;
};

export const deliveryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDelivery: builder.query<DeliveryResponse, void>({
      query: () => ({
        url: "/delivery",
      }),
      providesTags: ["delivery"],
    }),
    updateDelivery: builder.mutation<
      DeliveryResponse,
      {
        maximumPrice: number;
        standardDelivery: DeliveryOption;
        expressDelivery: DeliveryOption;
      }
    >({
      query: (body) => ({
        url: "/admin/delivery",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["delivery"],
    }),
  }),
});

export const { useGetDeliveryQuery, useUpdateDeliveryMutation } = deliveryApi;
