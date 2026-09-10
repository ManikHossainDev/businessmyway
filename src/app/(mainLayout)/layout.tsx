import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import FloatingSupportChat from "@/components/UI/FloatingSupportChat";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="md:pb-[79px]">
        <Header />
      </div>
      {children}
      <FloatingSupportChat />
      <Footer />
    </section>
  );
};

export default MainLayout;
