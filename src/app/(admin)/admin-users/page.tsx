"use client";

import { useEffect, useState } from "react";
import { ConfigProvider, Input, Modal, Pagination, Spin, Tooltip } from "antd";
import Swal from "sweetalert2";
import { FiUser, FiImage } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import {
  useApproveAdminUserMutation,
  useGetAdminUsersQuery,
  type AdminUser,
} from "@/redux/features/user/userApi";
import { resolveMediaUrl } from "@/utils/media";

const PAGE_SIZE = 10;

const formatDob = (value?: string) => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getAge = (value?: string) => {
  if (!value) return null;
  const birth = new Date(value);
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
};

const formatPhone = (countryCode?: string, phone?: string) => {
  const number = phone?.trim();
  if (!number) return "—";
  const code = countryCode?.trim();
  return code ? `${code} ${number}` : number;
};

const formatDocumentType = (type?: string) => {
  if (type === "driving_license") return "Driving License";
  if (type === "nid") return "NID";
  return "ID Document";
};

const isApproved = (user: AdminUser) =>
  user.onboardingStep === "APPROVED" || user.isOnboardingCompleted;

const isPdf = (url?: string | null, mime?: string | null) =>
  Boolean(
    mime?.includes("pdf") ||
      (url && /\.pdf($|\?)/i.test(url)) ||
      (url && /\.bin($|\?)/i.test(url)),
  );

const isImage = (url?: string | null, mime?: string | null) =>
  Boolean(
    mime?.startsWith("image/") ||
      (url && /\.(jpe?g|png|webp|gif|bmp|heic)($|\?)/i.test(url)),
  );

const AdminUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [previewUser, setPreviewUser] = useState<AdminUser | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewMime, setPreviewMime] = useState<string>("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const { data, isLoading, isFetching } = useGetAdminUsersQuery({
    page: currentPage,
    limit: PAGE_SIZE,
    search,
  });
  const [approveUser, { isLoading: isApproving }] = useApproveAdminUserMutation();

  const users = data?.data || [];
  const total = data?.meta?.total ?? 0;
  const documentUrl = resolveMediaUrl(previewUser?.identityDocument);
  const previewAge = getAge(previewUser?.dateOfBirth);
  const previewIsAdult = previewAge !== null && previewAge >= 18;

  useEffect(() => {
    if (!documentUrl) {
      setPreviewSrc(null);
      setPreviewMime("");
      return;
    }

    let objectUrl = "";
    let cancelled = false;
    setPreviewLoading(true);

    const loadDocument = async () => {
      try {
        const response = await fetch(documentUrl);
        const blob = await response.blob();
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setPreviewSrc(objectUrl);
        setPreviewMime(blob.type || "");
      } catch {
        if (!cancelled) {
          setPreviewSrc(documentUrl);
          setPreviewMime("");
        }
      } finally {
        if (!cancelled) setPreviewLoading(false);
      }
    };

    void loadDocument();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [documentUrl]);

  const handleSearch = (value: string) => {
    setSearch(value.trim());
    setCurrentPage(1);
  };

  const handleApprove = async (user: AdminUser) => {
    const confirmed = await Swal.fire({
      title: "Approve this account?",
      text: `${user.name} will be able to log in after approval.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#C1892F",
      confirmButtonText: "Approve",
    });
    if (!confirmed.isConfirmed) return;

    try {
      const res = await approveUser(user.id).unwrap();
      setPreviewUser(null);
      Swal.fire({
        title: "Approved",
        text: res.message || "This user can now log in.",
        icon: "success",
      });
    } catch (error) {
      const message =
        error && typeof error === "object" && "data" in error
          ? (error as { data?: { message?: string } }).data?.message
          : undefined;
      Swal.fire({
        title: "Error",
        text: message || "Failed to approve this user.",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Users</h2>
          <p className="mt-1 text-sm text-[#8A8174]">
            {total} registered {total === 1 ? "user" : "users"} · Check ID PDF to confirm 18+ before approve
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
                <th className="px-5 py-3">Age</th>
                <th className="px-5 py-3">ID PDF</th>
                <th className="px-5 py-3">OTP</th>
                <th className="px-5 py-3">Approval</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const avatar = resolveMediaUrl(user.avatar);
                const approved = isApproved(user);
                const isAdmin = user.role?.toLowerCase() === "superadmin";
                const fileUrl = resolveMediaUrl(user.identityDocument);
                const age = getAge(user.dateOfBirth);
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
                    <td className="px-5 py-3 text-[#5C564C]">
                      {age === null ? "—" : `${age} yrs`}
                    </td>
                    <td className="px-5 py-3">
                      {fileUrl ? (
                        <Tooltip title={`View ${formatDocumentType(user.identityDocumentType)}`}>
                          <button
                            type="button"
                            onClick={() => setPreviewUser(user)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8E0D4] text-[#C1892F] hover:bg-[#F6F3EE]"
                            aria-label="View ID document"
                          >
                            {isPdf(fileUrl) ? <FaFilePdf size={18} /> : <FiImage size={18} />}
                          </button>
                        </Tooltip>
                      ) : (
                        <span className="text-xs text-[#8A8174]">None</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {user.isEmailVerified ? (
                        <span className="rounded-full bg-[#EEF6EA] px-3 py-1 text-xs font-medium text-[#3B7A2A]">
                          Verified
                        </span>
                      ) : (
                        <span className="text-xs text-[#8A8174]">Pending</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {isAdmin ? (
                        <span className="text-xs text-[#8A8174]">Admin</span>
                      ) : approved ? (
                        <span className="rounded-full bg-[#EEF6EA] px-3 py-1 text-xs font-medium text-[#3B7A2A]">
                          Approved
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#F8EEDC] px-3 py-1 text-xs font-medium text-[#C1892F]">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {!isAdmin && !approved ? (
                        <button
                          type="button"
                          disabled={isApproving}
                          onClick={() => handleApprove(user)}
                          className="rounded-lg bg-[#C1892F] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#AD7A28] disabled:opacity-50"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-xs text-[#8A8174]">—</span>
                      )}
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

      <Modal
        open={Boolean(previewUser)}
        onCancel={() => setPreviewUser(null)}
        footer={null}
        centered
        destroyOnClose
        width={720}
        title={previewUser ? `${formatDocumentType(previewUser.identityDocumentType)} — ${previewUser.name}` : "ID Document"}
      >
        {previewUser ? (
          <div className="space-y-4">
            <div className="grid gap-3 rounded-lg border border-[#E8E0D4] bg-[#FBF8F4] p-4 text-sm sm:grid-cols-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A8174]">Date of birth</p>
                <p className="mt-1 font-medium text-[#1A1A1A]">{formatDob(previewUser.dateOfBirth)}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A8174]">Age</p>
                <p className="mt-1 font-medium text-[#1A1A1A]">
                  {previewAge === null ? "—" : `${previewAge} years`}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#8A8174]">18+ check</p>
                <p className={`mt-1 font-semibold ${previewIsAdult ? "text-[#3B7A2A]" : "text-[#B42318]"}`}>
                  {previewAge === null ? "Unknown" : previewIsAdult ? "18 or older" : "Under 18"}
                </p>
              </div>
            </div>

            {documentUrl ? (
              <div className="space-y-3">
                <a
                  href={previewSrc || documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#C1892F] hover:underline"
                >
                  <FaFilePdf />
                  Open ID file in new tab
                </a>
                {previewLoading ? (
                  <div className="flex h-[62vh] items-center justify-center rounded-lg border border-[#E8E0D4]">
                    <Spin />
                  </div>
                ) : isImage(documentUrl, previewMime) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewSrc || documentUrl}
                    alt={previewUser.name || "ID document"}
                    className="max-h-[62vh] w-full rounded-lg object-contain"
                  />
                ) : (
                  <iframe
                    src={previewSrc || documentUrl}
                    title="ID document PDF"
                    className="h-[62vh] w-full rounded-lg border border-[#E8E0D4] bg-white"
                  />
                )}
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-[#8A8174]">No document uploaded.</p>
            )}

            {!isApproved(previewUser) && previewUser.role?.toLowerCase() !== "superadmin" ? (
              <button
                type="button"
                disabled={isApproving}
                onClick={() => handleApprove(previewUser)}
                className="w-full rounded-lg bg-[#C1892F] py-2.5 text-sm font-semibold text-white hover:bg-[#AD7A28] disabled:opacity-50"
              >
                Approve account
              </button>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
