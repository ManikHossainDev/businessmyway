"use client";

import { Modal, Tag } from "antd";
import type { ShopOrder } from "@/redux/features/orders/orderApi";
import ProductPhoto from "@/components/UI/ProductPhoto";
import { resolveMediaUrl } from "@/utils/media";

type OrderDetailModalProps = {
  open: boolean;
  order: ShopOrder | null;
  onClose: () => void;
  onReview?: (order: ShopOrder) => void;
};

const statusMeta = (order: ShopOrder) => {
  if (order.status === "paid") return { label: "Paid", color: "green" as const };
  if (order.status === "cancelled") return { label: "Cancelled", color: "default" as const };
  if (order.deliveryType === "in_delivery") return { label: "Direct order", color: "gold" as const };
  return { label: "Awaiting payment", color: "gold" as const };
};

const OrderDetailModal = ({ open, order, onClose, onReview }: OrderDetailModalProps) => {
  if (!order) return null;
  const status = statusMeta(order);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      width={640}
      title={null}
    >
      <div className="pt-1">
        <p className="mb-1 text-xs uppercase tracking-[0.16em] text-[#BF8D2F]">Order details</p>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">#{order.orderNumber}</h3>
          <Tag color={status.color}>{status.label}</Tag>
        </div>

        <div className="mb-5 grid gap-3 rounded-lg border border-[#EDEDED] bg-[#FAFAF8] p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-400">Date</p>
            <p className="mt-1 font-medium text-[#1A1A1A]">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-400">Total</p>
            <p className="mt-1 text-lg font-bold text-[#BF8D2F]">
              £{Number(order.total ?? order.subtotal).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-400">Delivery</p>
            <p className="mt-1 font-medium text-[#1A1A1A]">
              {order.deliveryType === "paid_delivery" ? "Paid Delivery" : "Case In Delivery"}
              {order.deliveryFee ? ` · £${Number(order.deliveryFee).toFixed(2)}` : ""}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-400">Customer</p>
            <p className="mt-1 font-medium text-[#1A1A1A]">{order.customer.name}</p>
            <p className="text-xs text-neutral-500">{order.customer.phone}</p>
            <p className="text-xs text-neutral-500">{order.customer.email}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-400">Location</p>
            <p className="mt-1 leading-relaxed text-[#1A1A1A]">{order.customer.location}</p>
          </div>
        </div>

        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
          Items
        </p>
        <div className="mb-6 max-h-56 space-y-3 overflow-y-auto">
          {order.items.map((item) => (
            <div
              key={`${item.product}-${item.name}`}
              className="flex items-center gap-3 rounded-sm border border-[#EDEDED] px-3 py-2"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded border border-[#E5E5E5] bg-white">
                <ProductPhoto
                  src={resolveMediaUrl(item.image) || ""}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#1A1A1A]">{item.name}</p>
                <p className="text-xs text-neutral-500">Qty {item.qty}</p>
              </div>
              <p className="text-sm font-semibold text-[#1A1A1A]">
                £{(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#5C564C] hover:bg-[#F6F3EE]"
          >
            Close
          </button>
          {onReview ? (
            <button
              type="button"
              onClick={() => onReview(order)}
              className="rounded-sm bg-[#BF8D2F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a67809]"
            >
              Write review
            </button>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
