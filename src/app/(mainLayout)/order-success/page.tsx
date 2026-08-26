"use client";

import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { baseApi } from "@/redux/api/baseApi";
import {
  useConfirmOrderMutation,
  useGetOrderQuery,
  type ShopOrder,
} from "@/redux/features/orders/orderApi";
import ProductPhoto from "@/components/UI/ProductPhoto";
import WriteReviewForm from "@/components/UI/WriteReviewForm";
import { resolveMediaUrl } from "@/utils/media";

const OrderSuccessView = ({
  order,
  isDirect,
}: {
  order: ShopOrder;
  isDirect: boolean;
}) => (
  <section className="mx-auto max-w-2xl px-4 py-14">
    <div className="rounded-lg border border-[#E8E4DA] bg-white px-6 py-10 text-center shadow-sm">
      <CheckCircle2 className="mx-auto h-14 w-14 text-[#3f9a5c]" />
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#BF8D2F]">
        {isDirect ? "Direct order placed" : "Order confirmed"}
      </p>
      <h1 className="mt-2 font-serif text-4xl font-bold text-[#1A1A1A]">Thank you</h1>
      <p className="mt-3 text-gray-500">
        {isDirect
          ? "Your Case In Delivery order is confirmed. Pay on delivery."
          : "Payment received. Your order is now being prepared."}{" "}
        Order <span className="font-semibold text-[#1A1A1A]">#{order.orderNumber}</span>
      </p>
    </div>

    <div className="mt-8 rounded-lg border border-[#EDEDED] bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide">Items</h2>
      <div className="space-y-4">
        {order.items.map((item) => (
          <div key={`${item.product}-${item.name}`} className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded border border-[#E5E5E5]">
              <ProductPhoto
                src={resolveMediaUrl(item.image) || ""}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-[#1A1A1A]">{item.name}</p>
              <p className="text-sm text-gray-500">Qty {item.qty}</p>
            </div>
            <p className="font-semibold">£{(item.price * item.qty).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[#E5E5E5] pt-4">
        <span className="font-semibold">{isDirect ? "Total due" : "Total paid"}</span>
        <span className="text-xl font-bold text-[#BF8D2F]">
          £{Number(order.total ?? order.subtotal).toFixed(2)}
        </span>
      </div>
      <div className="mt-5 rounded-md bg-[#FAFAF8] p-4 text-sm text-gray-600">
        <p className="font-semibold text-[#1A1A1A]">Deliver to</p>
        <p className="mt-1">{order.customer.name}</p>
        <p>{order.customer.phone}</p>
        <p>{order.customer.email}</p>
        <p>{order.customer.location}</p>
        <p className="mt-2 text-[#1A1A1A]">
          {order.deliveryType === "paid_delivery" ? "Paid Delivery" : "Case In Delivery"}
          {order.deliveryFee ? ` · £${Number(order.deliveryFee).toFixed(2)}` : ""}
        </p>
      </div>
    </div>

    <div className="mt-8">
      <WriteReviewForm compact />
    </div>

    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Link href="/" className="rounded-sm bg-[#BF8D2F] px-6 py-3 font-semibold text-white hover:opacity-90">
        Continue shopping
      </Link>
      <Link
        href="/orderhistory"
        className="rounded-sm border border-[#E5E5E5] px-6 py-3 font-semibold text-[#1A1A1A] hover:border-[#BF8D2F]"
      >
        View order history
      </Link>
    </div>
  </section>
);

const OrderSuccessContent = () => {
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

  useEffect(() => {
    if (isDirect || !orderId || !sessionId || started.current) return;
    started.current = true;
    confirmOrder({ orderId, sessionId });
  }, [confirmOrder, isDirect, orderId, sessionId]);

  const order = (isDirect ? directData?.data : data?.data) as ShopOrder | undefined;

  useEffect(() => {
    if (!order) return;
    dispatch(baseApi.util.invalidateTags(["cart"]));
  }, [dispatch, order]);
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

  return <OrderSuccessView order={order} isDirect={isDirect || order.deliveryType === "in_delivery"} />;
};

const OrderSuccessPage = () => (
  <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading...</div>}>
    <OrderSuccessContent />
  </Suspense>
);

export default OrderSuccessPage;
