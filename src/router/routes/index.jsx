import React from "react";
import MainLayout from "../../layout/MainLayout";
import { allRoutes } from "./routes";

export const getRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: allRoutes,
  };
};
