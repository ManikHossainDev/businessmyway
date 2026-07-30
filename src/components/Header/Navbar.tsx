"use client";
import { useState } from "react";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import ActiveLink from "./ActiveLink"; // Assuming this component works fine
import Link from "next/link";
import { Drawer, Button, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiPhone } from "react-icons/fi";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const navLink = [
  {
    href: "/",
    label: "Cigarettes",
  },
  {
    href: "/Cigars",
    label: "Cigars",
  },
  {
    href: "/Tobacco",
    label: "Tobacco",
  },
  {
    href: "/Accessories",
    label: "Accessories",
  },
  {
    href: "/Brands",
    label: "Brands",
  },
  {
    href: "/New-Arrivals",
    label: "New Arrivals",
  },
];

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = {
    name: "John Doe",
    avatar: "", // Replace with actual avatar URL
    email: "john.doe@example.com",
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = () => {
    // Dispatch logout action to clear Redux state and cookies
    dispatch(logout());
    // Redirect to login page
    router.push("/login");
  };

  const menuItems = [
    {
      key: "3",
      label: (
        <div className="cursor-pointer px-4 py-1" onClick={handleLogout}>
          Logout
        </div>
      ),
    },
  ];

  return (
    <nav className="border-b border-[#E5E5E5] shadow-[0px_4px_16px_0px_#00000026]">
      <div className="xl:container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo + Brand name */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={logo}
            width={50}
            height={50}
            alt="logo"
            className="w-10 h-8"
          />
          <span className="text-[12px] md:text-[20px] lg:text-[22px] tracking-wide font-medium text-[#BF8D2F]">
            SMKR
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-2  xl:gap-6">
          {navLink.map((link) => (
            <li key={link.href}>
              <ActiveLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        {/* Right section */}
        <div className="flex items-center gap-2  xl:gap-6">
          {/* Order phone number */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-700">    
            <div className="flex flex-col leading-tight">
              <TfiHeadphoneAlt className="w-5 h-5  mx-auto" />
              <span className=" text-gray-500 md:text-[10px] lg:text-sm text-center">Order on</span>
              <span className="font-semibold text-center md:text-[10px] lg:text-xs">0113 217 7723</span>
            </div>
          </div>

          {/* Icon actions */}
          <div className="flex items-center gap-4">
            <button aria-label="Search">
              <FiSearch className="w-5 h-5 xl:w-8 xl:h-8 text-gray-700" />
            </button>
            <button aria-label="Wishlist">
              <FiHeart className="w-5 h-5 xl:w-8 xl:h-8 text-gray-700" />
            </button>
            <button aria-label="Bag">
              <FiShoppingBag className="w-5 h-5 xl:w-8 xl:h-8 text-gray-700" />
            </button>

            {user ? (
              <Dropdown menu={{ items: menuItems }} placement="top" arrow>
                <button aria-label="Account" className="cursor-pointer">
                  <FiUser className="w-5 h-5 xl:w-8 xl:h-8 text-gray-700" />
                </button>
              </Dropdown>
            ) : (
              <Link href="/login">
                <FiUser className="w-5 h-5 xl:w-8 xl:h-8 text-gray-700" />
              </Link>
            )}
          </div>

          {/* Mobile Drawer Button */}
          <Button
            type="text"
            className="md:hidden"
            icon={<MenuOutlined />}
            onClick={showDrawer}
          />
        </div>

        {/* Drawer for Mobile Navigation */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeDrawer}
          open={isDrawerOpen}
        >
          <ul className="flex flex-col gap-4">
            {navLink.map((link) => (
              <li key={link.href}>
                <ActiveLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-sm text-gray-700 mt-4">
            <FiPhone className="w-5 h-5" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm text-gray-500 font-semibold">Order on</span>
              <span className="text-xs">0113 217 7723</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {user.name ? (
              <>
                <button
                  className="text-white bg-red-500 px-10 py-3 rounded"
                  onClick={() => {
                    dispatch(logout());
                    router.push("/login");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-white bg-red-500 hover:bg-red-500 px-10 py-3 rounded">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-8 py-3 border border-red-500 text-red-500 rounded">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;