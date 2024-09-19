import Login from "../../pages/users/Login";
import Registration from "../../pages/users/Registration";

const publicRoutes = [
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
export default publicRoutes;
