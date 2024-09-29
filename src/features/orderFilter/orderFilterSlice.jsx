import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderStatus: [],
  claim: [],
  claimStatus: [],
  settled: [],
  dateFilter: {}, // Field for dynamic date filters
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
    setClaim: (state, action) => {
      state.claim = action.payload;
    },
    setClaimStatus: (state, action) => {
      state.claimStatus = action.payload;
    },
    setSettled: (state, action) => {
      state.settled = action.payload;
    },
    setDateFilter: (state, action) => {
      const { key, value } = action.payload;
      state.dateFilter = { [key]: value };
    },
  },
});

export const {
  setOrderStatus,
  setClaim,
  setClaimStatus,
  setSettled,
  setDateFilter,
} = dropdownSlice.actions;

export default dropdownSlice.reducer;
