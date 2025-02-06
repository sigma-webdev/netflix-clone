import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  razorPayKey: null,
  razorpayKeyLoading: false,
  subscriptionId: null,
  createSubscriptionLoading: false,
  verifySubscriptionLoading: false,
  isPaymentVerified: false,
  getPlanLoading: true,
  plan: [{}],
};

export const GET_RAZORPAY_KEY = createAsyncThunk(
  "/payment/razorpaykey",
  async () => {
    try {
      let response = axiosInstance.get("/payment/rasorpaykey");
      toast.promise(response, {
        loading: "Please wait! while we get your razorpay key",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to gets Plan",
      });
      response = await response;
      return response.data;
    } catch (error) {
      let errorMassage = error?.response?.data?.message;
      toast.error(errorMassage);
    }
  }
);

// pass the plan id
export const CREATE_SUBSCRIPTION = createAsyncThunk(
  "payment/subscribe",
  async (data) => {
    // data = {planeName : planeName}
    console.log(data);
    try {
      let response = await axiosInstance.post(
        `/payment/subscribe/${data.planId}`,
        data
      );
      // toast.promise(response, {
      //   loading: "Creating the subscription",
      //   success: (data) => {
      //     return data?.data?.message;
      //   },
      //   error: "Failed to get subscription",
      // });
      // response = await response;
      // console.log(response.data);

      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to create subscription");
    }
  }
);

//
export const GET_PLANS = createAsyncThunk("payment/plan", async (data) => {
  try {
    let response = await axiosInstance.get(`/payment/plan/`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    error?.response?.data?.message
      ? toast.error(error?.response?.data?.message)
      : toast.error("Failed to create subscription");
  }
});

export const VERIFY_SUBSCRIPTION = createAsyncThunk(
  "payment/verifySubscription",
  async (data) => {
    try {
      let response = axiosInstance.post("payment/verifySubscription", data);

      toast.promise(response, {
        loading: "Verifying the subscription plan",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to get plans",
      });
      response = await response;
      return response;
    } catch (error) {
      console.log("error", error);
      error?.response?.data?.message
        ? // ? toast.error(error?.response?.data?.message)
          toast.error("Failed to verify subscription1")
        : toast.error("Failed to verify subscription2");
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
        state.razorPayKey = action.payload?.data?.key;
        state.razorpayKeyLoading = false;
      })
      .addCase(GET_RAZORPAY_KEY.rejected, (state, action) => {
        state.razorpayKeyLoading = false;
      })
      // get plan
      .addCase(GET_PLANS.pending, (state, action) => {
        state.getPlanLoading = true;
      })
      .addCase(GET_PLANS.fulfilled, (state, action) => {
        state.plan = action.payload.data;
        state.getPlanLoading = false;
      })
      .addCase(GET_PLANS.rejected, (state, action) => {
        state.getPlanLoading = false;
      })

      // create subscription
      .addCase(CREATE_SUBSCRIPTION.pending, (state, action) => {
        state.createSubscriptionLoading = true;
      })
      .addCase(CREATE_SUBSCRIPTION.fulfilled, (state, action) => {
        console.log(action.payload);

        state.subscriptionId = action?.payload?.data?.subscription_id;
        state.createSubscriptionLoading = false;
      })
      .addCase(CREATE_SUBSCRIPTION.rejected, (state, action) => {
        state.createSbuscriptionLoading = false;
      })

      // verify subscription
      .addCase(VERIFY_SUBSCRIPTION.pending, (state, action) => {
        state.verifySubscriptionLoading = true;
      })
      .addCase(VERIFY_SUBSCRIPTION.fulfilled, (state, action) => {
        console.log("acton", action);
        state.isPaymentVerified = action.payload?.data?.success;
        state.verifySubscriptionLoading = false;
      })
      .addCase(VERIFY_SUBSCRIPTION.rejected, (state, action) => {
        state.verifySubscriptionLoading = false;
      });
  },
});

export default razoreSlice.reducer;
