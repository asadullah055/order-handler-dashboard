import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_seller } from "./features/auth/authSlice";
import { get_order_number } from "./features/filter/filterSlice";
import Router from "./router/Router";
import { getRoutes } from "./router/routes/index";
import publicRoutes from "./router/routes/publicRoutes";
function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);
  useEffect(() => {
    dispatch(get_order_number());
  }, [dispatch]);
  useEffect(() => {
    if (token) {
      dispatch(get_seller());
    }
  }, [token, dispatch]);
  return (
    <>
      <Router allRoutes={allRoutes} />
    </>
  );
}

export default App;
