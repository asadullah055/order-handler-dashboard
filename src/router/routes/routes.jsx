/* eslint-disable react-refresh/only-export-components */

import { lazy } from "react";
import DetailsOrder from "../../pages/orders/DetailsOrder";
import UpdateOrder from "../../pages/orders/UpdateOrder";

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
  {
    path: "/order/:orderNumber",
    element: <DetailsOrder />,
  },
  {
    path: "/update/:orderNumber",
    element: <UpdateOrder />,
  },
];
