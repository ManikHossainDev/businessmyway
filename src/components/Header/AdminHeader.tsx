"use client";

import Link from "next/link";
import { useState } from "react";
import { FiBell, FiChevronsLeft, FiChevronsRight, FiMenu, FiX } from "react-icons/fi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, selectToken } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/Profile/Profile";
import { resolveMediaUrl } from "@/utils/media";

const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop";

const notifications = [
  { id: 1, title: "New order received", time: "2 minutes ago" },
  { id: 2, title: "Inventory running low", time: "1 hour ago" },
  { id: 3, title: "New customer registered", time: "3 hours ago" },
];

const formatRole = (role?: string) => {
  if (!role) return "Admin";
  return role
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

type AdminHeaderProps = {
  onMenuClick: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

const AdminHeader = ({ onMenuClick, collapsed, onToggleCollapse }: AdminHeaderProps) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const token = useAppSelector(selectToken);
  const cookieUser = useAppSelector(selectCurrentUser);
  const { data } = useGetProfileQuery(undefined, { skip: !token });
  const profile = data?.data || cookieUser;
  const avatar = resolveMediaUrl(profile?.avatar) || FALLBACK_AVATAR;
  const role = formatRole(profile?.role);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[#E8E0D4] bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onMenuClick}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E0D4] text-[#5C564C] hover:bg-[#F6F3EE]"
              aria-label="Open menu"
            >
              <FiMenu size={20} />
            </button>
            <button
              type="button"
              onClick={onToggleCollapse}
              className="inline-flex  items-center justify-center  text-[#5C564C]"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
            </button>
            
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setNotificationOpen(true)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#5C564C] hover:bg-[#F6F3EE]"
              aria-label="Notifications"
            >
              <FiBell size={26} />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-[#BF8D2F]" />
            </button>

            <Link href="/adminProfile" className="flex items-center gap-3 rounded-xl pr-3 hover:bg-[#F6F3EE]">
              <img
                src={avatar}
                alt={profile?.name || "Admin"}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-medium truncate max-w-[140px]">
                  {profile?.name || "Admin"}
                </p>
                <p className="text-xs text-[#8A8174] truncate max-w-[140px]">{role}</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {notificationOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close notifications"
            className="absolute inset-0 bg-black/40"
            onClick={() => setNotificationOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-1/2 sm:w-full sm:max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between border-b border-[#E8E0D4] px-5 py-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button
                type="button"
                onClick={() => setNotificationOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#5C564C] hover:bg-[#F6F3EE]"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[#F0EAE2] px-5 py-4 hover:bg-[#FBF8F4]"
                >
                  <p className="text-sm font-medium text-[#1A1A1A]">{item.title}</p>
                  <p className="mt-1 text-xs text-[#8A8174]">{item.time}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
