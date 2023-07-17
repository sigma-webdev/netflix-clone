import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice.js";
import razorpayReducer from "./razorpaySlice";
import adminManageContentsSlice from "./adminManageContentsSlice";
import adminPlansSlice from "./adminPlansSlice";
import dashboardSlice from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    adminManageContents: adminManageContentsSlice,
    content: contentReducer,
    user: userReducer,
    auth: authReducer,
    razorpay: razorpayReducer,
    plans: adminPlansSlice,
    dashboard: dashboardSlice,
  },
});
