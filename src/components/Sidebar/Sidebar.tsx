"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Modal } from "antd";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

// Profile photo (from the reference design). Swap this for the logged-in
// user's real avatar URL once that's available from your auth/user state.


// Static copy for the profile header — replace with real user data
// (e.g. from redux/auth state) once available.
const USER = {
  firstName: "James",
  lastName: "Whitmore",
  memberSince: 2021,
};

const NAV_ITEMS = [
  { key: "orders", label: "Order History", href: "/orderhistory" },
  { key: "details", label: "Personal Details", href: "/profile" },
  { key: "addresses", label: "Saved Addresses", href: "/addresses" },
];

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const closeDrawer = () => setDrawerOpen(false);

  const showLogoutModal = () => setLogoutModalVisible(true);
  const handleLogoutCancel = () => setLogoutModalVisible(false);
  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    dispatch(logout());
    router.push("/login");
  };

  const SidebarContent = () => (
    <div className="w-64 bg-white  overflow-hidden">
      {/* Profile header */}
      <div className="flex flex-col items-center text-center pt-6 pb-5 px-4 rounded-md border border-gray-100 shadow-sm">
        <div className="w-20 h-20 rounded-full overflow-hidden relative">
          <Image
            src='https://i.ibb.co/9kGRkyzV/profile1.png'
            alt="Profile"
            fill
            // sizes="100px"
            className="object-cover"
          />
        </div>
        <h2 className="mt-3 text-xl font-serif">
          <span className="text-gray-900">{USER.firstName}</span>{" "}
          <span className="text-amber-600">{USER.lastName}</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Member since {USER.memberSince}
        </p>

        {/* <hr className="my-4 border-gray-200 w-full" /> */}
      </div>

      {/* Nav list */}
      <nav className="pb-4 rounded-md border border-gray-100 shadow-sm mt-5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={closeDrawer}
              className={`block px-5 py-3 text-base ${
                isActive
                  ? "bg-[#BF8D2F1A] text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={showLogoutModal}
          className="block w-full font-medium text-left px-5  pt-10 text-sm text-red-500 hover:text-red-600"
        >
          Sign Out
        </button>
      </nav>
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile Drawer Button */}
      <button
        type="button"
        className="md:hidden rounded fixed"
        onClick={() => setDrawerOpen(true)}
      >
        <MenuOutlined />
      </button>

      {/* Drawer for Mobile */}
      <Drawer
        placement="left"
        closable
        onClose={closeDrawer}
        open={drawerOpen}
        className="p-0"
        width={300}
      >
        <SidebarContent />
      </Drawer>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:block">
        <SidebarContent />
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={logoutModalVisible}
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
    </div>
  );
};

export default Sidebar;