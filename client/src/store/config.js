import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice.js";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    user: userReducer,
    auth: authReducer
  }
});
