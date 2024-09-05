import { AiFillDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
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
    path: "/order",
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
