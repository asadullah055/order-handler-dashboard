import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, getAllOrder, getSingleOrder } from "./orderApi";

const initialState = {
  isError: false,
  orders: [],
  order: '',
  isLoading: false,
  error: "",
};

export const create_order = createAsyncThunk(
  "order/create_order",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await addOrder(data);

      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_single_order = createAsyncThunk(
  "order/get_single_order",
  async (orderNumber, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await getSingleOrder(orderNumber);
      console.log("data===", order);
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_all_order = createAsyncThunk(
  "order/get_all_order",
  async ({ pageNo, perPage }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await getAllOrder({ pageNo, perPage });
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
      })
      .addCase(get_all_order.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(get_all_order.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.orders = payload;
      })
      .addCase(get_all_order.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.payload?.message;
      });
  },
});
export default orderSlice.reducer;
