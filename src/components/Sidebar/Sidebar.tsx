"use client";
import { useState } from "react";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Menu, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import usericon from "@/assets/Sidebar/user.png";
import work from "@/assets/Sidebar/work.png";
import job from "@/assets/Sidebar/vactor.png";
import logout from "@/assets/Sidebar/Group.png";


const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  
  const router = useRouter();
  const dispatch = useAppDispatch();

  const showDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const showLogoutModal = () => setLogoutModalVisible(true);
  const handleLogoutCancel = () => setLogoutModalVisible(false);
  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    // Dispatch logout action to clear Redux state and cookies
    dispatch(logout());
    // Redirect to login page
    router.push('/login');
  };

  const menuItems = [
    {
      key: "jobs",
      label: (
        <div className="flex items-center space-x-2">
          <Image src={work} width={40} height={40} alt="Work Icon" />
          <span>Job</span>
        </div>
      ),
      children: [
        {
          key: "jobpost",
          label: (
            <Link
              href="/jobpost"
              className="py-3 flex justify-start space-x-1 items-center"
              onClick={closeDrawer} // Close drawer when item is clicked
            >
              <h1 className="w-2 h-2 p-2 bg-red-500 rounded-full mr-2"></h1> Create Job Post
            </Link>
          ),
        },
        {
          key: "viewjobs",
          label: (
            <Link
              href="viewjobs"
              className="py-3 flex justify-start space-x-1 items-center"
              onClick={closeDrawer} // Close drawer when item is clicked
            >
              <h1 className="w-2 h-2 p-2 bg-red-500 rounded-full mr-2"></h1> View Jobs
            </Link>
          ),
        },
        {
          key: "bidjob",
          label: (
            <Link
              href="/bidjob"
              className="py-3 flex justify-start space-x-1 items-center"
              onClick={closeDrawer} // Close drawer when item is clicked
            >
              <h1 className="w-2 h-2 p-2 bg-red-500 rounded-full mr-2"></h1> Job Quotations
            </Link>
          ),
        },
        {
          key: "invoicepaper",
          label: (
            <Link
              href="/invoicepaper"
              className="py-3 flex justify-start space-x-1 items-center"
              onClick={closeDrawer} // Close drawer when item is clicked
            >
              <h1 className="w-2 h-2 p-2 bg-red-500 rounded-full mr-2"></h1> Invoices
            </Link>
          ),
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Mobile Drawer Button */}
      <button
        type="button"
        className="md:hidden   rounded fixed"
        onClick={showDrawer}
      >
        <MenuOutlined />
      </button>

      {/* Drawer for Mobile */}
      <Drawer
        placement="left"
        closable
        onClose={closeDrawer}
        open={drawerOpen}
        className="p-0 rounded-md bg-[#FBE9E9] border border-[#F4BBBB]" // Set the background color for the drawer
      >
        <nav className="h-full p-4 space-y-4 bg-[#FBE9E9]"> {/* Full height and background color */}
          <Link href="/profile">
            <div
              className="flex items-center ml-8 py-5 space-x-2"
              onClick={closeDrawer}
            >
              <Image src={usericon} width={40} height={40} alt="User Icon" />
              <span>My Profile</span>
            </div>
          </Link>
          <Menu
            mode="inline"
            defaultSelectedKeys={["profile"]}
            items={menuItems}
            className="bg-[#FBE9E9]"
          />
          <Link href="/incompletework">
            <div
              className="flex items-center ml-8 py-7 space-x-2"
              onClick={closeDrawer}
            >
              <Image src={job} width={35} height={35} alt="Job Icon" />
              <span>Job History</span>
            </div>
          </Link>
          <button onClick={showLogoutModal} className="w-full text-left">
            <div className="flex items-center ml-8 py-7 space-x-2">
              <Image src={logout} width={40} height={40} alt="Logout Icon" />
              <span>Logout</span>
            </div>
          </button>
        </nav>
      </Drawer>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:block bg-[#FBE9E9] w-64 px-4 rounded-md border border-[#F4BBBB]">
        <div className="py-5">
          <Link href="/profile">
            <div className="flex ml-8 items-center space-x-2">
              <Image src={usericon} width={40} height={40} alt="User Icon" />
              <span>My Profile</span>
            </div>
          </Link>
        </div>
        <div className="py-5">
          <Menu
            mode="inline"
            defaultSelectedKeys={["profile"]}
            items={menuItems}
            className="bg-[#FBE9E9] hover:bg-none w-full "
          />
        </div>
        <div className="py-5">
          <Link href="/incompletework">
            <div className="flex items-center ml-8 space-x-2">
              <Image src={job} width={32} height={32} alt="Job Icon" />
              <span>Job Overview</span>
            </div>
          </Link>
        </div>
        <div className="pb-7 md:mt-32 lg:mt-32 xl:mt-48">
          <button onClick={showLogoutModal} className="w-full text-left">
            <div className="flex items-center ml-8 space-x-2">
              <Image src={logout} width={40} height={40} alt="Logout Icon" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
          visible={logoutModalVisible}
          onOk={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
          centered
          width={300}  // Set the width here (in pixels)
          height={300} // Set the height here (in pixels), if necessary
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
