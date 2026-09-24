"use client";

import { baseApi } from "@/redux/api/baseApi";

export type OrderItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  qty: number;
};

export type OrderCustomer = {
  name: string;
  phone: string;
  email: string;
  location: string;
};

export type ShopOrder = {
  id: string;
  orderNumber: string;
  status: "pending" | "paid" | "cancelled";
  deliveryType?: "standard" | "express" | "free_delivery" | "in_delivery" | "paid_delivery" | string;
  deliveryFee?: number;
  subtotal: number;
  total?: number;
  items: OrderItem[];
  customer: OrderCustomer;
  paidAt?: string;
  createdAt?: string;
};

type CheckoutPayload = {
  name: string;
  phone: string;
  email: string;
  location: string;
  deliveryType?: "standard" | "express" | "free_delivery" | "paid_delivery" | string;
  origin: string;
};

type CheckoutResponse = {
  success: boolean;
  message?: string;
  data: {
    url: string | null;
    direct?: boolean;
    orderId: string;
    orderNumber: string;
    orderCode?: string;
  };
};

type OrderResponse = {
  success: boolean;
  message?: string;
  data: ShopOrder;
};

type OrderListResponse = {
  success: boolean;
  message?: string;
  data: ShopOrder[];
};

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkoutOrder: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: "/orders/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["order", "cart", "product"],
    }),
    confirmOrder: builder.mutation<
      OrderResponse,
      { orderId?: string; sessionId?: string; orderCode?: string; transactionId?: string }
    >({
      query: ({ orderId, sessionId, orderCode, transactionId }) => ({
        url: `/orders/${orderId || "lookup"}/confirm`,
        method: "POST",
        body: { sessionId, orderCode, transactionId },
      }),
      invalidatesTags: ["cart", "order", "product"],
    }),
    getOrder: builder.query<OrderResponse, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ["order"],
    }),
    getOrders: builder.query<OrderListResponse, void>({
      query: () => "/orders",
      providesTags: ["order"],
    }),
    getAdminOrders: builder.query<OrderListResponse, void>({
      query: () => "/admin/orders",
      providesTags: ["order"],
    }),
  }),
});

export const {
  useCheckoutOrderMutation,
  useConfirmOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetAdminOrdersQuery,
} = orderApi;
