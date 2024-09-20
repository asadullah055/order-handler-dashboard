import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_order_number } from "./features/filter/filterSlice";
import Router from "./router/Router";
import { getRoutes } from "./router/routes/index";
import publicRoutes from "./router/routes/publicRoutes";
function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);
  useEffect(() => {
    dispatch(get_order_number());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <Router allRoutes={allRoutes} />
    </>
  );
}

export default App;
