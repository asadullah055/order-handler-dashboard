import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOrders: [],
};

const selectedOrderSlice = createSlice({
  name: "selectedOrder",
  initialState,
  reducers: {
    setSelectedOrders: (state, action) => {
      state.selectedOrders = action.payload;
    },
    clearSelectedOrders: (state) => {
      state.selectedOrders = [];
    },
  },
});
export const { setSelectedOrders, clearSelectedOrders } =
  selectedOrderSlice.actions;

export default selectedOrderSlice.reducer;
