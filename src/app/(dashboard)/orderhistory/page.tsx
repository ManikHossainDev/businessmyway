"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetOrdersQuery, type ShopOrder } from "@/redux/features/orders/orderApi";
import ReviewModal from "@/components/UI/ReviewModal";
import OrderDetailModal from "@/components/UI/OrderDetailModal";
import Pagination from "@/components/UI/Pagination";

const ORDERS_PER_PAGE = 5;

const truncate = (text: string, max = 36) =>
  text.length > max ? `${text.slice(0, max).trim()}…` : text;

const statusMeta = (order: ShopOrder) => {
  if (order.status === "paid") return { label: "Paid", color: "green" as const };
  if (order.status === "cancelled") return { label: "Cancelled", color: "default" as const };
  if (order.deliveryType === "in_delivery") return { label: "Direct order", color: "gold" as const };
  return { label: "Awaiting payment", color: "gold" as const };
};

const OrderHistoryContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading } = useGetOrdersQuery();
  const orders = data?.data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [detailOpen, setDetailOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ShopOrder | null>(null);

  const totalPages = Math.max(1, Math.ceil(orders.length / ORDERS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedOrders = useMemo(
    () => orders.slice((safePage - 1) * ORDERS_PER_PAGE, safePage * ORDERS_PER_PAGE),
    [orders, safePage],
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (searchParams.get("review") !== "1") return;
    if (!orders.length) return;
    setSelectedOrder(orders[0]);
    setReviewOpen(true);
  }, [searchParams, orders]);

  const openDetail = (order: ShopOrder) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
  };

  const openReview = (order: ShopOrder) => {
    setSelectedOrder(order);
    setDetailOpen(false);
    setReviewOpen(true);
  };

  const closeReview = () => {
    setReviewOpen(false);
    if (searchParams.get("review") === "1") {
      router.replace("/orderhistory");
    }
  };

  const columns: ColumnsType<ShopOrder> = [
    {
      title: "Order",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (value: string) => (
        <span className="font-semibold text-[#2b2b2b]">#{value}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value?: string) =>
        value
          ? new Date(value).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "—",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: ShopOrder["items"]) => {
        const label = items.map((item) => `${item.name} × ${item.qty}`).join(" · ");
        return (
          <span className="block max-w-[200px] truncate text-[#4d4a44]" title={label}>
            {label}
          </span>
        );
      },
    },
    {
      title: "Location",
      key: "location",
      render: (_, order) => {
        const location = order.customer?.location || "";
        return location ? (
          <span className="block max-w-[160px] truncate text-[#4d4a44]" title={location}>
            {truncate(location)}
          </span>
        ) : (
          <span className="text-[#9a958c]">—</span>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      render: (_, order) => {
        const status = statusMeta(order);
        return <Tag color={status.color}>{status.label}</Tag>;
      },
    },
    {
      title: "Total",
      key: "total",
      align: "right",
      render: (_, order) => (
        <span className="font-bold text-[#c9822a]">
          £{Number(order.total ?? order.subtotal).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, order) => (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => openDetail(order)}
            className="rounded-sm border border-[#E5E5E5] px-3 py-1.5 text-xs font-semibold text-[#5C564C] transition-colors hover:border-[#BF8D2F] hover:text-[#BF8D2F]"
          >
            View
          </button>
          <button
            type="button"
            onClick={() => openReview(order)}
            className="rounded-sm border border-[#BF8D2F] px-3 py-1.5 text-xs font-semibold text-[#BF8D2F] transition-colors hover:bg-[#BF8D2F] hover:text-white"
          >
            Review
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="font-sans mb-7">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 mt-2">
        <h1 className="font-serif text-[32px] font-bold">
          <span className="text-[#1a1a1a]">Order </span>
          <span className="text-[#c9822a]">History</span>
        </h1>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#e9e6df] bg-white">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={paginatedOrders}
          loading={isLoading}
          pagination={false}
          scroll={{ x: 860 }}
          locale={{ emptyText: "You have not placed any orders yet." }}
        />
      </div>

      {orders.length > ORDERS_PER_PAGE ? (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : null}

      <OrderDetailModal
        open={detailOpen}
        order={selectedOrder}
        onClose={closeDetail}
        onReview={openReview}
      />
      <ReviewModal open={reviewOpen} onClose={closeReview} order={selectedOrder} />
    </div>
  );
};

const OrderHistory = () => (
  <Suspense
    fallback={
      <div className="py-16 text-center text-gray-500">Loading order history...</div>
    }
  >
    <OrderHistoryContent />
  </Suspense>
);

export default OrderHistory;
