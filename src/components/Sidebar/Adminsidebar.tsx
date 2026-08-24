"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Modal } from "antd";
import { FiAward, FiBox, FiHome, FiLayers, FiLogOut, FiSettings, FiShoppingBag } from "react-icons/fi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import logo from "@/assets/logo/logo.png";
import { ADMIN_INFO_LINKS } from "@/constants/adminInfoLinks";

type AdminSidebarProps = {
  mobileOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome, href: "/admin-dashboard" },
  { id: "orders", label: "Orders", icon: FiShoppingBag, href: "/orders" },
  { id: "category", label: "Category", icon: FiLayers, href: "/category" },
  { id: "brands", label: "Brands", icon: FiAward, href: "/admin-brands" },
  { id: "inventory", label: "Inventory", icon: FiBox, href: "/inventory" },
  { id: "settings", label: "Settings", icon: FiSettings, href: "/settings" },
];

const AdminSidebar = ({
  mobileOpen,
  collapsed,
  onClose,
}: AdminSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const showLogoutModal = () => setLogoutModalVisible(true);
  const handleLogoutCancel = () => setLogoutModalVisible(false);
  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    dispatch(logout());
    router.push("/login");
  };

  const renderNav = (compact: boolean) => (
    <>
      <div
        className={`flex items-center border-b border-[#E8E0D4] ${
          compact ? "justify-center px-3 py-5" : "gap-3 px-5 py-[14px]"
        }`}
      >
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3"
        >
          <Image
            src={logo}
            alt="SMKR"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          {!compact && (
            <div className="min-w-0">
              <p className="text-sm font-semibold lg:text-lg xl:text-xl tracking-wide text-[#1A1A1A]">British Smokes</p>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin-dashboard"
              ? pathname === item.href
              : item.href === "/settings"
                ? pathname === "/settings" ||
                  ADMIN_INFO_LINKS.some((link) => pathname === link.href)
                : pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              title={item.label}
              className={`flex items-center rounded-xl py-1 transition-colors ${
                compact ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5"
              } ${
                isActive
                  ? "bg-[#BF8D2F] text-white shadow-sm"
                  : "text-[#5C564C] hover:bg-[#F3EBE0] hover:text-[#1A1A1A]"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              {!compact && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#E8E0D4]">
        <button
          type="button"
          onClick={showLogoutModal}
          title="Logout"
          className={`w-full flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors ${
            compact ? "justify-center" : "gap-3"
          }`}
        >
          <FiLogOut size={20} className="shrink-0" />
          {!compact && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 bg-white border-r border-[#E8E0D4] transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {renderNav(collapsed)}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          <aside className="relative flex h-full w-64 flex-col bg-white shadow-xl">
            {renderNav(false)}
          </aside>
        </div>
      )}

      <Modal
        open={logoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        centered
        width={300}
        footer={[
          <button
            key="cancel"
            onClick={handleLogoutCancel}
            className="border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-100"
          >
            No
          </button>,
          <button
            key="confirm"
            onClick={handleLogoutConfirm}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 ml-5 mt-7"
          >
            Yes
          </button>,
        ]}
      >
        <div>
          <h1 className="text-3xl font-semibold">Logout</h1>
          <p className="mb-2">Are you sure you want to log out?</p>
        </div>
      </Modal>
    </>
  );
};

export default AdminSidebar;
