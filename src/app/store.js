import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import filterSlice from "../features/filter/filterSlice";
import orderSlice from "../features/order/orderSlice";

const store = configureStore({
    reducer:{
        order: orderSlice,
        filter: filterSlice, 
        auth: authSlice 
    }
})


export default store