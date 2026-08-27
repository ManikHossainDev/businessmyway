"use client";

import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { baseApi } from "@/redux/api/baseApi";
import {
  useConfirmOrderMutation,
  useGetOrderQuery,
  type ShopOrder,
} from "@/redux/features/orders/orderApi";

const OrderSuccessContent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const sessionId = searchParams.get("session_id") || "";
  const isDirect = searchParams.get("direct") === "1";
  const [confirmOrder, { data, isLoading, isError, error }] = useConfirmOrderMutation();
  const {
    data: directData,
    isLoading: isDirectLoading,
    isError: isDirectError,
  } = useGetOrderQuery(orderId, { skip: !isDirect || !orderId });
  const started = useRef(false);
  const redirected = useRef(false);

  useEffect(() => {
    if (isDirect || !orderId || !sessionId || started.current) return;
    started.current = true;
    confirmOrder({ orderId, sessionId });
  }, [confirmOrder, isDirect, orderId, sessionId]);

  const order = (isDirect ? directData?.data : data?.data) as ShopOrder | undefined;

  useEffect(() => {
    if (!order) return;
    dispatch(baseApi.util.invalidateTags(["cart", "order"]));
  }, [dispatch, order]);

  useEffect(() => {
    if (!order || redirected.current) return;
    redirected.current = true;
    router.replace("/orderhistory?review=1");
  }, [order, router]);

  const loading = isDirect ? isDirectLoading : isLoading || (!order && !isError);
  const failed = isDirect ? isDirectError || !order : isError || !order;
  const message =
    (error as { data?: { message?: string } })?.data?.message ||
    "We could not confirm this order.";

  if (!orderId || (!isDirect && !sessionId)) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold">Missing order details</h1>
        <p className="mt-3 text-gray-500">Return to the shop and complete checkout again.</p>
        <Link href="/" className="mt-6 inline-block text-[#BF8D2F] underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (loading && !order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center text-gray-500">
        {isDirect ? "Loading your order..." : "Confirming your payment..."}
      </div>
    );
  }

  if (failed || !order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold">Order not confirmed</h1>
        <p className="mt-3 text-gray-500">{message}</p>
        <Link href="/orderhistory" className="mt-6 inline-block text-[#BF8D2F] underline">
          View order history
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center text-gray-500">
      Redirecting to order history...
    </div>
  );
};

const OrderSuccessPage = () => (
  <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading...</div>}>
    <OrderSuccessContent />
  </Suspense>
);

export default OrderSuccessPage;
