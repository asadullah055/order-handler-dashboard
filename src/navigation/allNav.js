import { AiFillDashboard, AiOutlineShoppingCart } from "react-icons/ai";
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
    id: 2,
    title: "Add Orders",
    icon: MdAdd,
    path: "/add-order",
  },
  {
    id: 3,
    title: "Update Orders",
    icon: RiFileEditLine ,
    path: "/update-orders",
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
        path: "/",
      },
      {
        id: "4-5",
        title: "Unsettled order",
        path: "/",
      },
      {
        id: "4-3",
        title: "Return",
        path: "/",
      },
    ],
  },
  {
    id: 5,
    title: "Dashboard",
    icon: AiFillDashboard,
    children: [
      {
        id: "4-1",
        title: "Sub Order 1",
        path: "/nai/sub1",
      },
      {
        id: "4-2",
        title: "Sub Order 2",
        path: "/nai/sub2",
      },
      {
        id: "4-5",
        title: "Sub Order 1",
        path: "/nai/sub5",
      },
      {
        id: "4-3",
        title: "Sub Order 2",
        path: "/nai/sub",
      },
    ],
  },
  {
    id: 6,
    title: "Orders",
    icon: AiOutlineShoppingCart,
    path: "/gelo",
  },
];
