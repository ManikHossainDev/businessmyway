import React from "react";

// Types
interface OrderItem {
  name: string;
  qty: number;
}

type OrderStatus = "On the way" | "Delivered";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}

// JSON data source for the order history list
const ordersData: Order[] = [
  {
    id: "NC-20241203-1",
    orderNumber: "NC-20241203",
    date: "3 December 2024",
    items: [
      { name: "Reserve No. 12", qty: 1 },
      { name: "Gold Edition Reserve", qty: 1 },
      { name: "Robusto Claro", qty: 1 },
    ],
    total: 456.0,
    status: "On the way",
  },
  {
    id: "NC-20241203-2",
    orderNumber: "NC-20241203",
    date: "3 December 2024",
    items: [
      { name: "Reserve No. 12", qty: 1 },
      { name: "Gold Edition Reserve", qty: 1 },
      { name: "Robusto Claro", qty: 1 },
    ],
    total: 456.0,
    status: "Delivered",
  },
  {
    id: "NC-20241203-3",
    orderNumber: "NC-20241203",
    date: "3 December 2024",
    items: [
      { name: "Reserve No. 12", qty: 1 },
      { name: "Gold Edition Reserve", qty: 1 },
      { name: "Robusto Claro", qty: 1 },
    ],
    total: 456.0,
    status: "Delivered",
  },
  {
    id: "NC-20241203-4",
    orderNumber: "NC-20241203",
    date: "3 December 2024",
    items: [
      { name: "Reserve No. 12", qty: 1 },
      { name: "Gold Edition Reserve", qty: 1 },
      { name: "Robusto Claro", qty: 1 },
    ],
    total: 456.0,
    status: "Delivered",
  },
];

// Tailwind class sets per status (replaces the old statusStyles inline-style map)
const statusClasses: Record<OrderStatus, string> = {
  "On the way": "text-[#c9822a] bg-[#fdf1e2] border border-[#f3d9ae]",
  Delivered: "text-[#3f9a5c] bg-white border border-[#bfe3c8]",
};

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const classes = statusClasses[status] || statusClasses["Delivered"];
  return (
    <span
      className={`inline-block px-4 py-[5px] rounded-full text-[13px] font-medium whitespace-nowrap ${classes}`}
    >
      {status}
    </span>
  );
};

const OrderRow: React.FC<{ order: Order }> = ({ order }) => {
  const itemsText = order.items
    .map((item: OrderItem) => `${item.name} × ${item.qty}`)
    .join("  ·  ");

  return (
    <div className="bg-white border border-[#e9e6df] rounded-[10px] px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex-[1_1_320px] min-w-0">
        <div className="text-[15px] font-semibold text-[#2b2b2b] mb-1">
          Order #{order.orderNumber}
        </div>
        <div className="text-[13px] text-[#9a958c] mb-2.5">{order.date}</div>
        <div className="text-sm text-[#4d4a44]">{itemsText}</div>
      </div>

      <div className="flex flex-col items-end gap-2.5 flex-none">
        <StatusBadge status={order.status} />
        <div className="text-xl font-bold text-[#c9822a]">
          £{order.total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

const OrderHistory = () => {
  const orders = ordersData;
  return (
    <div className="font-sans mb-7">
      <div className="">
        <h1 className="font-serif text-[32px] font-bold mb-2">
          <span className="text-[#1a1a1a]">Order </span>
          <span className="text-[#c9822a]">History</span>
        </h1>

        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;