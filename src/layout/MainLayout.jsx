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
      <div className="ml-0 lg:ml-[260px] pt-[80px] pb-[30px] pl-4 pr-4 transition-al">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
