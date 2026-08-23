"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { ADMIN_INFO_LINKS } from "@/constants/adminInfoLinks";

const SettingsPage = () => {
  return (
    <div className="max-w-3xl">
      <h2 className="mb-1 text-2xl font-semibold">Settings</h2>
      <p className="mb-6 text-[#8A8174]">Manage site pages and contact messages.</p>

      <ul className="overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
        {ADMIN_INFO_LINKS.map((item) => (
          <li key={item.href} className="border-b border-[#F0EAE2] last:border-b-0">
            <Link
              href={item.href}
              className="flex items-center justify-between px-5 py-4 text-[#1A1A1A] hover:bg-[#F6F3EE]"
            >
              <span className="text-sm font-medium">{item.label}</span>
              <FiChevronRight className="text-[#8A8174]" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPage;
