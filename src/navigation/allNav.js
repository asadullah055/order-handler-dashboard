import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHistory } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { RiFileEditLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: RxDashboard,
    path: "/",
  },
  {
    id: 4,
    title: "Orders",
    icon: AiOutlineShoppingCart,
    children: [
      {
        id: "4-1",
        title: "All Orders",
        path: "/all-orders",
      },
      {
        id: "4-2",
        title: "Delivery Failed",
        path: "/delivery-failed",
      },
      {
        id: "4-3",
        title: "Return",
        path: "/return-order",
      },
      {
        id: "4-5",
        title: "Unsettled order",
        path: "/un-settled-order",
      },
    ],
  },
  {
    id: 2,
    title: "Add Orders",
    icon: MdAdd,
    path: "/add-order",
  },
  {
    id: 3,
    title: "Bulk Update",
    icon: RiFileEditLine,
    path: "/update-orders",
  },
  {
    id: 5,
    title: "History",
    icon: GoHistory,
    path: "/history",
  },
];
