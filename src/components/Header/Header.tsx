import React from "react";
import Navbar from "./Navbar";
import TopNav from "./TopNav";

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0  z-10">
     <TopNav />
    <div className=" w-full bg-[#FAFAFA]  ">
      <Navbar />
    </div>
    </header>
  );
};

export default Header;
