import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="pb-[79px]">
        <Header />
      </div>
      {children}
      <Footer />
    </section>
  );
};

export default MainLayout;
