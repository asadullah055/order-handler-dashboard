import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { get_order_number } from "./features/filter/filterSlice";
import Router from "./router/Router";
import { getRoutes } from "./router/routes/index";
function App() {
  const [allRoutes, setAllRoutes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);
  useEffect(() => {
    dispatch(get_order_number());
  }, [dispatch]);
  return (
    <>
      <Router allRoutes={allRoutes} />
    </>
  );
}

export default App;
