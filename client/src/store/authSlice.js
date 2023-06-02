import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {};

export const IS_USER_EXIST = createAsyncThunk(
  "auth/userexist",
  async (data) => {
    try {
      let response = axiosInstance.post("auth/userexist", data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const SIGN_IN = createAsyncThunk("auth/signin", async (data) => {
  try {
    let response = axiosInstance.post("auth/signin", data);
    return response;
  } catch (error) {
    console.log(error);
  }
});
