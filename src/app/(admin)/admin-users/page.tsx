"use client";

import { useState } from "react";
import { ConfigProvider, Input, Pagination, Spin } from "antd";
import { FiUser } from "react-icons/fi";
import { useGetAdminUsersQuery } from "@/redux/features/user/userApi";
import { resolveMediaUrl } from "@/utils/media";

const PAGE_SIZE = 10;

const formatDate = (value?: string) => {
  if (!value) return "—";
  return new Date(value).toLocaleString();
};

const formatPhone = (countryCode?: string, phone?: string) => {
  const number = phone?.trim();
  if (!number) return "—";
  const code = countryCode?.trim();
  return code ? `${code} ${number}` : number;
};

const formatRole = (role?: string) => {
  if (!role) return "User";
  if (role.toLowerCase() === "superadmin") return "Super Admin";
  return role;
};

const AdminUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching } = useGetAdminUsersQuery({
    page: currentPage,
    limit: PAGE_SIZE,
    search,
  });

  const users = data?.data || [];
  const total = data?.meta?.total ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value.trim());
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Users</h2>
          <p className="mt-1 text-sm text-[#8A8174]">
            {total} registered {total === 1 ? "user" : "users"}
          </p>
        </div>
        <Input.Search
          allowClear
          placeholder="Search name or email"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onSearch={handleSearch}
          className="sm:max-w-xs"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#E8E0D4] bg-white">
        {isLoading || isFetching ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <Spin />
          </div>
        ) : users.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-[#8A8174]">
            {search ? "No users match your search." : "No users yet."}
          </p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F6F3EE] text-xs font-semibold uppercase tracking-[0.06em] text-[#5C564C]">
              <tr>
                <th className="px-5 py-3">Image</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Verified</th>
                <th className="px-5 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const avatar = resolveMediaUrl(user.avatar);
                return (
                  <tr
                    key={user.id}
                    className="border-t border-[#F0EAE2] text-[#1A1A1A]"
                  >
                    <td className="px-5 py-3">
                      {avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={avatar}
                          alt={user.name || user.email}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F3EE] text-[#C1892F]">
                          <FiUser size={18} />
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium">{user.name || "—"}</td>
                    <td className="px-5 py-3 text-[#5C564C]">{user.email}</td>
                    <td className="px-5 py-3 text-[#5C564C]">
                      {formatPhone(user.countryCode, user.phone)}
                    </td>
                    <td className="px-5 py-3 text-[#5C564C]">{formatRole(user.role)}</td>
                    <td className="px-5 py-3 capitalize text-[#5C564C]">
                      {user.status || "—"}
                    </td>
                    <td className="px-5 py-3">
                      {user.isEmailVerified ? (
                        <span className="rounded-full bg-[#F6F3EE] px-3 py-1 text-xs font-medium text-[#C1892F]">
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-[#8A8174]">No</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-[#8A8174]">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {total > PAGE_SIZE && (
        <div className="flex justify-center">
          <ConfigProvider theme={{ token: { colorPrimary: "#C1892F" } }}>
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={total}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </ConfigProvider>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
