"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, selectToken } from "@/redux/features/auth/authSlice";
import { isAdminRole } from "@/utils/role";
import { Spin } from "antd";

type AuthGuardProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
};

const AuthGuard = ({
  children,
  requireAdmin = false,
  requireUser = false,
}: AuthGuardProps) => {
  const token = useAppSelector(selectToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isAdmin = isAdminRole(currentUser?.role);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }
    if (requireAdmin && !isAdmin) {
      router.replace("/");
      return;
    }
    if (requireUser && isAdmin) {
      router.replace("/admin-dashboard");
      return;
    }
    setReady(true);
  }, [token, isAdmin, requireAdmin, requireUser, router]);

  if (!token || !ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
