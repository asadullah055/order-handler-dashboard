import { lazy } from "react";
import Order from "../../pages/Order";

const Dashboard = lazy(() => import("../../pages/Dashboard"));

export const allRoutes = [
  {
    path: "/home",
    element: <Dashboard />,
  },
  {
    path: "/order",
    element: <Order />,
  },
];
