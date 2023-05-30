import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    user: userReducer,
  },
});
