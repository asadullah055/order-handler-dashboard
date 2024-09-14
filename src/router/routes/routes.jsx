/* eslint-disable react-refresh/only-export-components */

import { lazy } from "react";
import DeliveryFailed from "../../pages/orders/DeliveryFailed";
import DetailsOrder from "../../pages/orders/DetailsOrder";
import UpdateOrder from "../../pages/orders/UpdateOrder";
import UpdateBulkOrders from "./../../pages/orders/UpdateBulkOrders";

const Dashboard = lazy(() => import("../../pages/Dashboard"));
const Order = lazy(() => import("../../pages/Order"));
const AllOrders = lazy(() => import("../../pages/orders/AllOrders"));

export const allRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/add-order",
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
  {
    path: "/update-orders",
    element: <UpdateBulkOrders />,
  },
  {
    path: "/delivery-failed",
    element: <DeliveryFailed />,
  },
];
