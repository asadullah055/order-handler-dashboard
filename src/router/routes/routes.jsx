/* eslint-disable react-refresh/only-export-components */

import { lazy } from "react";

const Dashboard = lazy(() => import("../../pages/Dashboard"));
const Order = lazy(() => import("../../pages/Order"));
const AllOrders = lazy(() => import("../../pages/orders/AllOrders"));

export const allRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/all-orders",
    element: <AllOrders />,
  },
];
