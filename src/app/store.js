import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import historySlice from "../features/bulkAction//historySlice";
import selectedOrderSlice from "../features/collectOrder/collectOrderSlice";
import filterSlice from "../features/filter/filterSlice";
import orderSlice from "../features/order/orderSlice";
import dropdownSlice from "../features/orderFilter/orderFilterSlice";

const store = configureStore({
  reducer: {
    order: orderSlice,
    filter: filterSlice,
    auth: authSlice,
    dropdown: dropdownSlice,
    selectedOrder: selectedOrderSlice,
    history: historySlice,
  },
});

export default store;
