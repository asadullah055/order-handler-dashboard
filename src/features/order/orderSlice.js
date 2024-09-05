import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./orderApi";

const initialState = {
  isError: false,
  orders: [],
  isLoading: false,
  error: "",
};

export const create_order = createAsyncThunk(
  "order/create_order",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await addOrder(data);
      console.log("data===", order);
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(create_order.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(create_order.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.orders = payload.insertedOrders;
      })
      .addCase(create_order.rejected, (state, action) => {

        
        state.isError = true;
        state.isLoading = false;
        state.error = action.payload?.message;
      });
  },
});
export default orderSlice.reducer;
