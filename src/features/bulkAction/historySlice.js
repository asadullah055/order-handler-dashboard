import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../util/axios";
const initialState = {
  isError: false,
  isLoading: false,
  orderNumbers: "",
  successMessage: "",
  errorMessage: "",
};
export const bulk_history = createAsyncThunk(
  "bulkHistory/bulk_history",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await axiosInstance.post("bulk-action", data);

      return fulfillWithValue(order.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const single_history = createAsyncThunk(
  "singleHistory/single_history",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await axiosInstance.post("bulk-action", data);
      console.log(order);
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bulk_history.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(bulk_history.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.orderNumbers = payload.results;
      })
      .addCase(bulk_history.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(single_history.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(single_history.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.orderNumbers = payload.result;
      })
      .addCase(single_history.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      });
  },
});
export const { messageClear } = historySlice.actions;
export default historySlice.reducer;
