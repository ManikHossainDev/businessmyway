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

import { AiOutlineMenu } from "react-icons/ai";

const navLink = [
  {
    href: "/",
    label: "Discover",
  },
  {
    href: "/Venues",
    label: "Venues",
  },
  {
    href: "/Services",
    label: "Services",
  },
  {
    href: "/My Events",
    label: "My Events",
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
    router.push('/login');
  };

  const menuItems = [
    {
      key: "3",
      label: <div className="cursor-pointer px-4 py-1" onClick={handleLogout}>Logout</div>,
    },
  ];

  return (
    <nav>
      <div className="lg:container flex justify-between items-center  py-2 px-3 ">
        {/* logo */}
        <Link href="/">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="rounded-md lg:mr-20 w-[80px] h-[80px]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-1">
          {navLink.map((link) => (
            <li key={link.href}>
              <ActiveLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        {/* Create job button */}
        {user ? (
          <div className="flex justify-between items-center mg:gap-4 lg:gap-8 gap-2">
            {/* Create Job Button */}
            <Link
              href="#"
              className="rounded-[4px] md:px-6 px-2 md:py-5 py-2  text-white border-none"
            >
              Switch to Hosting
            </Link>

            {/* User Avatar Dropdown */}
            <Dropdown menu={{ items: menuItems }} placement="top" arrow>
              {user?.avatar && (
                <div className="flex items-center gap-2 bg-white p-2 px-3 rounded-full cursor-pointer">
                  <AiOutlineMenu className="w-6 h-6" /> {/* 6 × 4 = 24px */}
                  <Image
                    width={24}
                    height={24}
                    src={user.avatar}
                    alt="User Image"
                    className="rounded-full ring ring-[#d75b3fad]  w-8 h-8"
                  />
                </div>
              )}
            </Dropdown>
          </div>
        ) : (
          <div>
            <Link href="/login" className="w-full">
              <Button>Login</Button>
            </Link>
          </div>
        )}

        {/* Mobile Drawer Button */}
        <Button
          type="text"
          className="md:hidden"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

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
          <div className="flex flex-col gap-4 mt-4">
            {user.name ? (
              <>
                {/* <Link href="/profile">
                  <button className="px-8 py-3 border border-red-500 text-red-500 rounded">
                    Profile
                  </button>
                </Link> */}
                <button 
                  className="text-white bg-red-500 px-10 py-3 rounded"
                  onClick={() => {
                    dispatch(logout());
                    router.push('/login');
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
