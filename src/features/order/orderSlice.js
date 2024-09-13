import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addOrder,
  getAllOrder,
  getSingleOrder,
  updateSingleOrder,
} from "./orderApi";

const initialState = {
  isError: false,
  orders: [],
  order: "",
  isLoading: false,
  successMessage: "",
  errorMessage: "",
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

      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_all_order = createAsyncThunk(
  "order/get_all_order",
  async (
    { pageNo, perPage, orderStatus, claim, claimType, orderNumber },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const order = await getAllOrder({
        pageNo,
        perPage,
        orderStatus,
        claim,
        claimType,
        orderNumber,
      });

      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const update_single_order = createAsyncThunk(
  "order/update_single_order",
  async ({ orderNumber, data }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await updateSingleOrder({ orderNumber, data });
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
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
        state.successMessage = payload.message;
      })
      .addCase(create_order.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
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
        state.errorMessage = action.payload?.message;
      })
      .addCase(get_single_order.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.order = action.payload.order;
      })
      .addCase(update_single_order.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.order = action.payload.order;
        state.successMessage = action.payload.message;
      })
      .addCase(update_single_order.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action?.payload?.message;
      })
      .addCase(update_single_order.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
  },
});
export const { messageClear } = orderSlice.actions
export default orderSlice.reducer;
