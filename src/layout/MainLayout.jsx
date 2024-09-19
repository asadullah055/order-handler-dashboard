import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { role, token } = useSelector((state) => state.auth);

  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="ml-0 lg:ml-[260px] pt-[80px] pb-[30px] pl-4 pr-4 transition-all">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
