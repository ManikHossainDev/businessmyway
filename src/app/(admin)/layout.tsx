"use client";

import { useState } from "react";
import AuthGuard from "@/components/Auth/AuthGuard";
import AdminHeader from "@/components/Header/AdminHeader";
import AdminSidebar from "@/components/Sidebar/Adminsidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-[#F6F3EE] text-[#1A1A1A]">
        <AdminSidebar
          mobileOpen={mobileOpen}
          collapsed={collapsed}
          onClose={() => setMobileOpen(false)}
          onToggleCollapse={() => setCollapsed((value) => !value)}
        />

        <div
          className={`min-h-screen  bg-[#FFFFFF] flex flex-col transition-[padding] duration-300 ${
            collapsed ? "lg:pl-20" : "lg:pl-64"
          }`}
        >
          <AdminHeader
            onMenuClick={() => setMobileOpen(true)}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed((value) => !value)}
          />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminLayout;
