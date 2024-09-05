import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../features/order/orderSlice";

const store = configureStore({
    reducer:{
        order: orderSlice 
    }
})


export default store