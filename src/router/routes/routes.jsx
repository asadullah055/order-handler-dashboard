/* eslint-disable react-refresh/only-export-components */

import { lazy } from "react";
import DeliveryFailed from "../../pages/orders/DeliveryFailed";
import DetailsOrder from "../../pages/orders/DetailsOrder";
import HistoryPage from "../../pages/orders/HistoryPage";
import ReturnOrder from "../../pages/orders/ReturnOrder";
import UnSettledOrders from "../../pages/orders/UnSettledOrders";
import UpdateOrder from "../../pages/orders/UpdateOrder";
import Profile from "../../pages/users/Profile";
import UpdateBulkOrders from "./../../pages/orders/UpdateBulkOrders";

const Dashboard = lazy(() => import("../../pages/Dashboard"));
const AddOrder = lazy(() => import("../../pages/AddOrder"));
const AllOrders = lazy(() => import("../../pages/orders/AllOrders"));

export const allRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/add-order",
    element: <AddOrder />,
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
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/un-settled-order",
    element: <UnSettledOrders />,
  },
  {
    path: "/return-order",
    element: <ReturnOrder />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
];
