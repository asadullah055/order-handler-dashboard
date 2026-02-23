import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { totalStatus } from "./filterApi";

const STATUS_CACHE_TTL_MS = 60 * 1000;

const initialState = {
  allOrder: 0,
  totalDF: 0,
  totalUnSettled: 0,
  totalReturn: 0,
  totalTransit: 0,
  totalNotDrop: 0,
  totalItemLoss: 0,
  totalScraped: 0,
  totalNRY: 0,
  totalDelivered: 0,
  statusFetchedAt: 0,
  isStatusLoading: false,
};

export const get_status_number = createAsyncThunk(
  "filter/get_status_number",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const status = await totalStatus();

      return fulfillWithValue(status);
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  },
  {
    condition: (payload, { getState }) => {
      const { filter } = getState();
      const force = Boolean(payload?.force);

      if (force) return true;
      if (filter.isStatusLoading) return false;

      const isCacheFresh =
        filter.statusFetchedAt &&
        Date.now() - filter.statusFetchedAt < STATUS_CACHE_TTL_MS;

      return !isCacheFresh;
    },
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(get_status_number.pending, (state) => {
        state.isStatusLoading = true;
      })
      .addCase(get_status_number.fulfilled, (state, { payload }) => {
        state.allOrder = payload.totalOrders;
        state.totalReturn = payload.totalReturn;
        state.totalUnSettled = payload.totalUnSettled;
        state.totalDF = payload.totalDF;
        state.totalTransit = payload.totalTransit;
        state.totalNotDrop = payload.totalNotDrop;
        state.totalItemLoss = payload.totalItemLoss;
        state.totalScraped = payload.totalScraped;
        state.totalNRY = payload.totalNRY;
        state.totalDelivered = payload.totalDelivered;
        state.statusFetchedAt = Date.now();
        state.isStatusLoading = false;
      })
      .addCase(get_status_number.rejected, (state) => {
        state.isStatusLoading = false;
      });
  },
});
export default filterSlice.reducer;
