import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  isLoggedIn: false,
  user: {},
  signInLoading: false
};

export const IS_USER_EXIST = createAsyncThunk(
  "auth/userexist",
  async (data) => {
    try {
      let response = await axiosInstance.post("auth/userexist", data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const SIGN_IN = createAsyncThunk("auth/signin", async (data) => {
  try {
    const response = await axiosInstance.post("auth/signin", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const SIGN_OUT = createAsyncThunk("/auth/signout", async () => {
  try {
    const response = await axiosInstance.get("auth/signout");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const GET_USER = createAsyncThunk("auth/user", async () => {
  try {
    let response = await axiosInstance.get("auth/user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   signIn
      .addCase(SIGN_IN.pending, (state) => {
        state.signInLoading = true;
      })
      .addCase(SIGN_IN.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data;
          state.isLoggedIn = true;
          state.signInLoading = false;
        } else {
          return action.payload;
        }
      })
      // get user
      .addCase(GET_USER.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data;
          state.isLoggedIn = true;
        }
      })
      // sign out
      .addCase(SIGN_OUT.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoggedIn = false;
          state.user = {};
        }
      });
  }
});

export const {} = authSlice.actions;
export default authSlice.reducer;
