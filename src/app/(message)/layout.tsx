import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2]">
      <Header />
      <main className="flex-1 py-6">{children}</main>
      <Footer />
    </div>
  );
}
