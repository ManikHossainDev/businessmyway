"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiMessageSquare } from "react-icons/fi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, selectToken } from "@/redux/features/auth/authSlice";
import { getFromCookies } from "@/utils/cookies-storage";
import { isAdminRole } from "@/utils/role";
import ChatDrawer from "./ChatDrawer";

const FloatingSupportChat: React.FC = () => {
  const router = useRouter();
  const token = useAppSelector(selectToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let userRole = currentUser?.role;
  if (!userRole && typeof window !== "undefined") {
    try {
      const rawUser = getFromCookies("user");
      if (rawUser) {
        const parsed = typeof rawUser === "string" ? JSON.parse(decodeURIComponent(rawUser)) : rawUser;
        userRole = parsed?.role;
      }
    } catch {
      // ignore
    }
  }

  const isAdmin = isAdminRole(userRole);

  if (isAdmin) {
    return null;
  }

  const handleClick = () => {
    const activeToken = token || getFromCookies("token");
    if (!activeToken) {
      router.push("/login");
      return;
    }
    setChatOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 group">
        <button
          type="button"
          onClick={handleClick}
          aria-label="Customer Support Chat"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#C1892F] text-white shadow-xl shadow-[#C1892F]/30 hover:bg-[#AD7A28] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
        >
          <FiMessageSquare size={24} />
          {/* Subtle online pulse */}
          <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>

        {/* Hover Tooltip */}
        <div className="pointer-events-none absolute bottom-full right-0 mb-2 hidden group-hover:block transition-all">
          <div className="whitespace-nowrap rounded-lg bg-[#1A1A1A] px-3 py-1.5 text-xs font-medium text-white shadow-lg">
            {mounted && token ? "Chat with Support" : "Login to Chat"}
          </div>
        </div>
      </div>

      {mounted && <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />}
    </>
  );
};

export default FloatingSupportChat;
