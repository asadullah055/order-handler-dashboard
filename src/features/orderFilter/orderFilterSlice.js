import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderStatus: [],
  claim: [],
  claimStatus: [],
  settled: [],
  dateFilter: {
    dateType: "",
    startDate: "",
    endDate: "",
  },
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
      const { key, startDate, endDate } = action.payload;
      state.dateFilter.dateType = key;
      state.dateFilter.startDate = startDate;
      state.dateFilter.endDate = endDate;
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
