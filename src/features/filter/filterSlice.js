import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { totalOrder } from "./filterApi";

const initialState = {
  allOrder: 0,
  totalDF:0
};

export const get_order_number = createAsyncThunk(
  "filter/get_order_number",
  async (_,{ fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await totalOrder();

      return fulfillWithValue(order);
    } catch (error) {
        console.log(error);
        
      return rejectWithValue(error.response.data);
    }
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(get_order_number.fulfilled, (state, { payload }) => {
      state.allOrder = payload.totalOrders
      state.totalDF = payload.totalDF
    }); 
  },
});
export default filterSlice.reducer;
