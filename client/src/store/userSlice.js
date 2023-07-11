import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  allUsers: [],
  userById: {},
  loading: false,
};

export const getAllUsers = createAsyncThunk(
  "/users",
  async ({ pageNo, searchValue }) => {
    try {
      const url = searchValue
        ? `/users?search=${searchValue}`
        : `/users?page=${pageNo}&limit=10`;
      let response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId) => {
    try {
      let response = await axiosInstance.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all user
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.allUsers = [];
        state.loading = false;
      })

      // get user by id
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userById = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.rejected, (state) => {
        state.userById = {};
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
