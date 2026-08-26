"use client";

import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAdminOrdersQuery, type ShopOrder } from "@/redux/features/orders/orderApi";

const AdminOrdersPage = () => {
  const { data, isLoading } = useGetAdminOrdersQuery();
  const orders = data?.data || [];

  const columns: ColumnsType<ShopOrder> = [
    {
      title: "Order",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (value: string) => <span className="font-semibold">#{value}</span>,
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
      title: "Customer",
      key: "customer",
      render: (_, order) => (
        <div>
          <p className="font-medium">{order.customer.name}</p>
          <p className="text-xs text-[#8A8174]">{order.customer.email}</p>
          <p className="text-xs text-[#8A8174]">{order.customer.phone}</p>
        </div>
      ),
    },
    {
      title: "Delivery",
      key: "delivery",
      render: (_, order) => (
        <div className="max-w-[240px]">
          <p className="font-medium">
            {order.deliveryType === "paid_delivery" ? "Paid Delivery" : "Case In Delivery"}
          </p>
          <p className="text-sm text-[#5C564C]">{order.customer.location}</p>
        </div>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: ShopOrder["items"]) =>
        items.map((item) => `${item.name} × ${item.qty}`).join(" · "),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_status: ShopOrder["status"], order: ShopOrder) => {
        const label =
          order.status === "paid"
            ? "Paid"
            : order.status === "cancelled"
              ? "Cancelled"
              : order.deliveryType === "in_delivery"
                ? "Direct order"
                : "Awaiting payment";
        const color = order.status === "paid" ? "green" : order.status === "cancelled" ? "default" : "gold";
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "Total",
      dataIndex: "subtotal",
      key: "subtotal",
      align: "right",
      render: (_value: number, order: ShopOrder) => (
        <span className="font-bold text-[#BF8D2F]">£{Number(order.total ?? order.subtotal).toFixed(2)}</span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Orders</h2>
        <p className="mt-1 text-sm text-[#8A8174]">
          {orders.length} {orders.length === 1 ? "order" : "orders"} from customers
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={orders}
          loading={isLoading}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          scroll={{ x: 980 }}
          locale={{ emptyText: "No orders yet." }}
        />
      </div>
    </div>
  );
};

export default AdminOrdersPage;
