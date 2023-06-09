import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  isLoggedIn: false,
  user: {},
  signInLoading: false,
  signOutLoading: false,
  getUserLoading: false
};

export const IS_USER_EXIST = createAsyncThunk(
  "auth/userexist",
  async (data) => {
    try {
      let response = await axiosInstance.post("auth/userexist", data);
      return response.data;
    } catch (error) {
      return error.response.data;
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
        state.user = action.payload.data;
        state.isLoggedIn = true;
        state.signInLoading = false;
      })
      .addCase(SIGN_IN.rejected, (state) => {
        state.signInLoading = false;
      })

      // get user
      .addCase(GET_USER.pending, (state) => {
        state.getUserLoading = true;
      })
      .addCase(GET_USER.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.getUserLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(GET_USER.rejected, (state) => {
        state.getUserLoading = false;
      })

      // sign out
      .addCase(SIGN_OUT.pending, (state) => {
        state.signOutLoading = true;
      })
      .addCase(SIGN_OUT.fulfilled, (state) => {
        state.signOutLoading = false;
        state.user = {};
        state.isLoggedIn = false;
      })
      .addCase(SIGN_OUT.rejected, (state) => {
        state.signOutLoading = false;
      });
  }
});

export const {} = authSlice.actions;
export default authSlice.reducer;
