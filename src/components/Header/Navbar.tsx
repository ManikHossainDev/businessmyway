"use client";
import { useState } from "react";
import logo from "@/assets/logo/logo.png";
import Image from "next/image";
import ActiveLink from "./ActiveLink"; // Assuming this component works fine
import Link from "next/link";
import { Drawer, Button,  } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiPhone } from "react-icons/fi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import CartDrawer from "../UI/CartDrawer";



const navLink = [
  { href: "/cigarettes", label: "Cigarettes" },
  { href: "/cigars", label: "Cigars" },
  { href: "/tobacco", label: "Tobacco" },
  { href: "/accessories", label: "Accessories" },
  { href: "/brands", label: "Brands" },
  { href: "/newarrivals", label: "New Arrivals" },
];

// Replace with your real cart data / API call
const initialCartItems= [
  {
    id: 1,
    image: "/images/zino-cigar.png",
    title: "Zino Honduras Robusto Cigars - Bof of 25",
    price: 456.0,
    qty: 1,
  },
  {
    id: 2,
    image: "/images/zino-cigar.png",
    title: "Zino Honduras Robusto Cigars - Bof of 25",
    price: 456.0,
    qty: 1,
  },
  {
    id: 3,
    image: "/images/zino-cigar.png",
    title: "Zino Honduras Robusto Cigars - Bof of 25",
    price: 456.0,
    qty: 1,
  },
];

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = {
    name: "John Doe",
    avatar: "",
    email: "john.doe@example.com",
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);

  const showDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const showCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const updateQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  return (
    <nav className="border-b border-[#E5E5E5] shadow-[0px_4px_16px_0px_#00000026]">
      <div className="xl:container mx-auto flex justify-between items-center py-3 px-2 xl:px-0">
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
            <Link href="/searchresult" aria-label="Search">
              <FiSearch className="w-5 h-5 xl:w-7 xl:h-7 text-gray-700" />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist">
              <FiHeart className="w-5 h-5 xl:w-7 xl:h-7 text-gray-700" />
            </Link>
            <button aria-label="Bag" onClick={showCart} className="relative">
              <FiShoppingBag className="w-5 h-5 xl:w-7 xl:h-7 text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#BF8D2F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {user ? (
                <Link href="/profile" aria-label="Account" className="cursor-pointer">
                  <FiUser className="w-5 h-5 xl:w-7 xl:h-7 text-gray-700" />
                </Link>
            ) : (
              <Link href="/login">
                <FiUser className="w-5 h-5 xl:w-7 xl:h-7 text-gray-700" />
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
          width={200}
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
              <button
                className="text-white bg-red-500 px-10 py-3 rounded"
                onClick={() => {
                  dispatch(logout());
                  router.push("/login");
                }}
              >
                Logout
              </button>
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

        {/* Cart Drawer - now a separate component */}
        <CartDrawer
          open={isCartOpen}
          onClose={closeCart}
          cartItems={cartItems}
          onUpdateQty={updateQty}
        />
      </div>
    </nav>
  );
};

export default Navbar;