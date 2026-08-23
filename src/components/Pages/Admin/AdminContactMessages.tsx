"use client";

import Link from "next/link";
import { Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiArrowLeft } from "react-icons/fi";
import { useGetAdminContactsQuery } from "@/redux/features/settings/settingsApi";

type ContactRow = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
};

const AdminContactMessages = () => {
  const { data, isLoading, isError } = useGetAdminContactsQuery();
  const contacts = data?.data || [];

  const columns: ColumnsType<ContactRow> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
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
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        Could not load contact messages. Please try again.
      </p>
    );
  }

  return (
    <div>
      <Link
        href="/settings"
        className="mb-4 inline-flex items-center gap-2 text-sm text-[#8A8174] hover:text-[#1A1A1A]"
      >
        <FiArrowLeft />
        Back to settings
      </Link>
      <h2 className="mb-1 text-2xl font-semibold">Contact</h2>
      <p className="mb-6 text-[#8A8174]">Messages submitted from the contact form.</p>

      <div className="overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
        <Table
          rowKey={(row) => row.id || row._id || `${row.email}-${row.createdAt}`}
          columns={columns}
          dataSource={contacts}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default AdminContactMessages;
