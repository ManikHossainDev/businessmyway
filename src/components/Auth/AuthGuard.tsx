"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/features/auth/authSlice";
import { Spin } from "antd";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector(selectToken);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [token, router]);

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
