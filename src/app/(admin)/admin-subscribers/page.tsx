"use client";

import { Spin } from "antd";
import { FiUser } from "react-icons/fi";
import { useGetAdminSubscribersQuery } from "@/redux/features/subscribers/subscriberApi";
import { resolveMediaUrl } from "@/utils/media";

const formatDate = (value?: string) => {
  if (!value) return "—";
  return new Date(value).toLocaleString();
};

const AdminSubscribersPage = () => {
  const { data, isLoading } = useGetAdminSubscribersQuery();
  const subscribers = data?.data || [];

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Subscribers</h2>
        <p className="text-sm text-[#8A8174]">Stay Informed list with user details</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#E8E0D4] bg-white">
        {isLoading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Spin />
          </div>
        ) : subscribers.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-[#8A8174]">
            No subscribers yet.
          </p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F6F3EE] text-xs font-semibold uppercase tracking-[0.06em] text-[#5C564C]">
              <tr>
                <th className="px-5 py-3">Image</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Agreed</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => {
                const avatar = resolveMediaUrl(subscriber.avatar);
                return (
                  <tr
                    key={subscriber.id}
                    className="border-t border-[#F0EAE2] text-[#1A1A1A]"
                  >
                    <td className="px-5 py-3">
                      {avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={avatar}
                          alt={subscriber.name || subscriber.email}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F3EE] text-[#C1892F]">
                          <FiUser size={18} />
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium">
                      {subscriber.name || "Guest subscriber"}
                    </td>
                    <td className="px-5 py-3 text-[#5C564C]">{subscriber.email}</td>
                    <td className="px-5 py-3 text-[#5C564C]">
                      {subscriber.phone || "—"}
                    </td>
                    <td className="px-5 py-3">
                      {subscriber.agreed ? (
                        <span className="rounded-full bg-[#F6F3EE] px-3 py-1 text-xs font-medium text-[#C1892F]">
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-[#8A8174]">No</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-[#8A8174]">
                      {formatDate(subscriber.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSubscribersPage;
