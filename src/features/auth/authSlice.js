import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { jwtDecode } from "jwt-decode";
import {
  getSeller,
  logout,
  sellerLogin,
  sellerRegistration,
  updateSellerProfile,
} from "./authAPI";
const returnRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const seller = await sellerRegistration(data);
      localStorage.setItem("accessToken", seller.token);

      return fulfillWithValue(seller);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const seller = await sellerLogin(data);
      localStorage.setItem("accessToken", seller.token);

      return fulfillWithValue(seller);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const seller_logout = createAsyncThunk(
  "auth/seller_logout",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const seller = await logout(data);
      localStorage.removeItem('accessToken')
      return fulfillWithValue(seller);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_seller = createAsyncThunk(
  "auth/get_seller",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const seller = await getSeller();

      return fulfillWithValue(seller);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const update_seller_profile = createAsyncThunk(
  "auth/update_seller_profile",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const seller = await updateSellerProfile(data);

      return fulfillWithValue(seller);
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  isError: false,
  seller: "",
  userInfo: "",
  isLoading: false,
  successMessage: "",
  errorMessage: "",
  error: "",
  token: localStorage.getItem("accessToken") || "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(seller_register.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.seller = payload.sellerWithoutPassword;
        state.token = payload.token;
        state.successMessage = payload.message;
      })
      .addCase(seller_register.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(seller_login.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.seller = payload.sellerWithoutPassword;
        state.token = payload.token;
        state.successMessage = payload.message;
      })
      .addCase(seller_login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(get_seller.fulfilled, (state, { payload }) => {
        state.userInfo = payload.seller;
      });
  },
});
export const { messageClear } = authSlice.actions;
export default authSlice.reducer;
