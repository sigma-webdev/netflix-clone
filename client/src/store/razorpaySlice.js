import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  razorpaykey: null,
  razorpayKeyLoading: false,
  subscriptionId: null,
  createSbuscriptionLoading: false,
  verifySubscriptionLoading: false,
  isPaymentVerified: false
};

export const GET_RAZORPAY_KEY = createAsyncThunk(
  "payment/razorpaykey",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("payment/razorpaykey");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const CREATE_SUBSCRIPTION = createAsyncThunk(
  "payment/subscribe",
  async (data, { rejectWithValue }) => {
    // data = {planeName : planeName}
    try {
      const response = await axiosInstance.post("payment/subscribe", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const VERIFY_SUBSCRIPTION = createAsyncThunk(
  "payment/verifysubscription",
  async (data, { rejectWithValue }) => {
    // data = {planeName : planeName}

    try {
      const response = await axiosInstance.post(
        "payment/verifysubscription",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const razoreSlice = createSlice({
  name: "razorpay",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get razorpay key
      .addCase(GET_RAZORPAY_KEY.pending, (state, action) => {
        state.razorpayKeyLoading = true;
      })
      .addCase(GET_RAZORPAY_KEY.fulfilled, (state, action) => {
        state.razorpaykey = action.payload.key;
        state.razorpayKeyLoading = false;
      })
      .addCase(GET_RAZORPAY_KEY.rejected, (state, action) => {
        state.razorpayKeyLoading = false;
      })

      // create subscription
      .addCase(CREATE_SUBSCRIPTION.pending, (state, action) => {
        state.createSbuscriptionLoading = true;
      })
      .addCase(CREATE_SUBSCRIPTION.fulfilled, (state, action) => {
        state.subscriptionId = action.payload.subscription_id;
        state.createSbuscriptionLoading = false;
      })
      .addCase(CREATE_SUBSCRIPTION.rejected, (state, action) => {
        state.createSbuscriptionLoading = false;
      })

      // verify subscription
      .addCase(VERIFY_SUBSCRIPTION.pending, (state, action) => {
        state.verifySubscriptionLoading = true;
      })
      .addCase(VERIFY_SUBSCRIPTION.fulfilled, (state, action) => {
        state.isPaymentVerified = action.payload.success;
        state.verifySubscriptionLoading = false;
      })
      .addCase(VERIFY_SUBSCRIPTION.rejected, (state, action) => {
        state.verifySubscriptionLoading = false;
      });
  }
});

export const {} = razoreSlice.actions;
export default razoreSlice.reducer;
