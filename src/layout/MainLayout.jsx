import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="ml-0 lg:ml-[260px] h-screen pt-[80px] pl-4 pr-4 transition-all bg-slate-100">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
