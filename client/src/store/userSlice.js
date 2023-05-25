import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  currentUser: {
    name: "Mangesh Thakare",
    role: "USER",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.currentUser = action.payload.user;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
