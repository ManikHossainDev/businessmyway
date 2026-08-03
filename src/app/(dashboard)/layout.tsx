import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" bg-[#FFFFFF]">
      <div className="xl:container pt-[79px] px-2 xl:px-0 mx-auto">
          <div className="pt-2">
          <Header />
          </div>
          <div className="grid grid-cols-12 px-3 md:px-0 lg:grid-cols-12 md:mt-5 md:grid-cols-11 md:py-8  md:space-x-32 lg:space-x-28 xl:space-x-14">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 md:mt-4">
              <Sidebar />
            </div>
            <div className="col-span-11 md:col-span-9 lg:col-span-10">{children}</div>
          </div>
      </div>
      <Footer />
    </section>
  );
};

export default Dashboard;