import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderFormData from "../../components/updateOrder/OrderFormData";
import OrderSearch from "../../components/updateOrder/OrderSearch";
import { get_single_order } from "../../features/order/orderSlice";

const UpdateOrder = () => {
  const { order } = useSelector((state) => state.order);
  const { orderNumber } = useParams();
  const dispatch = useDispatch();
  const [searchOrderNumber, setSearchOrderNumber] = useState(orderNumber);

  useEffect(() => {
    dispatch(get_single_order(orderNumber));
  }, [orderNumber, dispatch]);

  return (
    <div
      className="rounded-md w-full lg:w-[80%] mx-auto bg-white p-2 relative"
      // added styles
    >
      <h1 className="text-3xl font-semibold text-center p-3 bg-teal-50 text-teal-500">
        Update Order
      </h1>

      <OrderSearch
        searchOrderNumber={searchOrderNumber}
        setSearchOrderNumber={setSearchOrderNumber}
      />

      {order ? (
        <OrderFormData orderNumber={orderNumber} />
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
};

export default UpdateOrder;
