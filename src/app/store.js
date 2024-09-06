import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../features/filter/filterSlice";
import orderSlice from "../features/order/orderSlice";

const store = configureStore({
    reducer:{
        order: orderSlice,
        filter: filterSlice 
    }
})


export default store