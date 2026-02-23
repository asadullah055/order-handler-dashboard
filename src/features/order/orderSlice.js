import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addOrder,
  getAllOrder,
  getDfOrder,
  getReturnOrder,
  getSingleOrder,
  getTransitOrder,
  getUnsettledOrder,
  updateBulkOrder,
  updateSingleOrder
} from "./orderApi";

const ORDER_CACHE_TTL_MS = 60 * 1000;

const getCacheKey = (payload) => JSON.stringify(payload || {});

const shouldFetchFromApi = (cacheEntry, payload) => {
  if (payload?.force) return true;
  if (!cacheEntry?.key || !cacheEntry?.fetchedAt) return true;

  const key = getCacheKey(payload);
  const isFresh = Date.now() - cacheEntry.fetchedAt < ORDER_CACHE_TTL_MS;

  return !(cacheEntry.key === key && isFresh);
};

const initialState = {
  isError: false,
  orders: [],
  unsettledOrder: [],
  dfOrder: [],
  returnOrder: [],
  transitOrder: [],
  order: "",
  missingOrders: [],
  isLoading: false,
  successMessage: "",
  errorMessage: "",
  error: "",
  uniqueOrderCount: 0,
  cacheMeta: {
    all: null,
    transit: null,
    df: null,
    returnOrder: null,
    unsettled: null,
  },
};

export const create_order = createAsyncThunk(
  "order/create_order",
  async (
    { newOrders, confirmInsert = false },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const order = await addOrder({ newOrders, confirmInsert });

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
    {
      pageNo,
      perPage,
      orderStatus,
      claim,
      orderNumber,
      date,
      receivedDate,
      dfMailDate,
      settled,
    },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const order = await getAllOrder({
        pageNo,
        perPage,
        orderStatus,
        claim,
        orderNumber,
        date,
        receivedDate,
        dfMailDate,
        settled,
      });

      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
  {
    condition: (payload, { getState }) => {
      const { cacheMeta } = getState().order;
      return shouldFetchFromApi(cacheMeta.all, payload);
    },
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
export const update_Bulk_order = createAsyncThunk(
  "order/update_Bulk_order",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await updateBulkOrder(data);
      console.log(order);
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_return_order = createAsyncThunk(
  "order/get_return_order",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await getReturnOrder(data);
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
  {
    condition: (payload, { getState }) => {
      const { cacheMeta } = getState().order;
      return shouldFetchFromApi(cacheMeta.returnOrder, payload);
    },
  }
);
export const get_transit_order = createAsyncThunk(
  "order/get_transit_order",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await getTransitOrder(data);
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
  {
    condition: (payload, { getState }) => {
      const { cacheMeta } = getState().order;
      return shouldFetchFromApi(cacheMeta.transit, payload);
    },
  }
);
export const get_df_order = createAsyncThunk(
  "order/get_df_order",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await getDfOrder(data);
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
  {
    condition: (payload, { getState }) => {
      const { cacheMeta } = getState().order;
      return shouldFetchFromApi(cacheMeta.df, payload);
    },
  }
);
export const get_unsettled_order = createAsyncThunk(
  "order/get_unsettled_order",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const order = await getUnsettledOrder(data);
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
  {
    condition: (payload, { getState }) => {
      const { cacheMeta } = getState().order;
      return shouldFetchFromApi(cacheMeta.unsettled, payload);
    },
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
        state.cacheMeta = {
          all: null,
          transit: null,
          df: null,
          returnOrder: null,
          unsettled: null,
        };
        if (payload.uniqueOrderCount !== undefined) {
          state.uniqueOrderCount = payload.uniqueOrderCount;
        }

        // If orders were inserted, update orders and success message
        if (payload.insertedOrders) {
          state.orders = payload.insertedOrders;
          state.successMessage = payload.message;
        }
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
      .addCase(get_all_order.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.orders = action.payload;
        state.cacheMeta.all = {
          key: getCacheKey(action.meta.arg),
          fetchedAt: Date.now(),
        };
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
      .addCase(get_single_order.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.order = "";
      })
      .addCase(update_single_order.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.order = action.payload.updatedOrder;
        state.successMessage = action.payload.message;
        state.cacheMeta = {
          all: null,
          transit: null,
          df: null,
          returnOrder: null,
          unsettled: null,
        };
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
      .addCase(update_Bulk_order.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(update_Bulk_order.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.missingOrders = action.payload.missingOrders;
        state.successMessage = action.payload.message;
        state.cacheMeta = {
          all: null,
          transit: null,
          df: null,
          returnOrder: null,
          unsettled: null,
        };
      })
      .addCase(update_Bulk_order.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action?.payload?.message;
      })
      .addCase(get_unsettled_order.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(get_unsettled_order.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.unsettledOrder = action.payload;
        state.cacheMeta.unsettled = {
          key: getCacheKey(action.meta.arg),
          fetchedAt: Date.now(),
        };
      })
      .addCase(get_return_order.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(get_return_order.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.returnOrder = action.payload;
        state.cacheMeta.returnOrder = {
          key: getCacheKey(action.meta.arg),
          fetchedAt: Date.now(),
        };
      })
      .addCase(get_transit_order.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(get_transit_order.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transitOrder = action.payload;
        state.cacheMeta.transit = {
          key: getCacheKey(action.meta.arg),
          fetchedAt: Date.now(),
        };
      })
      .addCase(get_df_order.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(get_df_order.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.dfOrder = action.payload;
        state.cacheMeta.df = {
          key: getCacheKey(action.meta.arg),
          fetchedAt: Date.now(),
        };
      });
  },
});
export const { messageClear } = orderSlice.actions;
export default orderSlice.reducer;
