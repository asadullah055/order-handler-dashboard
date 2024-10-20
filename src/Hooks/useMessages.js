import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { get_single_order, messageClear } from "../features/order/orderSlice";

const useMessages = (orderNumber) => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useSelector((state) => state.order);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_single_order(orderNumber));
    }

    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);
};

export default useMessages;
