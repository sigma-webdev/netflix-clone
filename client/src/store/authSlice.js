import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  isLoggedIn: false,
  user: {}
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
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const SIGN_OUT = createAsyncThunk("/auth/signout", async () => {
  try {
    const response = await axiosInstance.get("auth/signout");
    return response;
  } catch (error) {
    console.log(error);
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
      .addCase(GET_USER.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data;
          state.isLoggedIn = true;
        }
      })
      .addCase(SIGN_OUT.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoggedIn = false;
        }
      });
  }
});

export const {} = authSlice.actions;
export default authSlice.reducer;
