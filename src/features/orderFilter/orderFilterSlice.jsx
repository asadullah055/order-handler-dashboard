import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderStatus: [],
  claim: [],
  claimStatus: [],
  settled: [],
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
  },
});

export const { setOrderStatus, setClaim, setClaimStatus, setSettled } =
  dropdownSlice.actions;

export default dropdownSlice.reducer;
