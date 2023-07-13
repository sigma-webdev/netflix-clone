import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  loading: false,
  moviesCount: 0,
  seriesCount: 0,
  usersData: {},
  salesStats: 0,
};

export const getMoviesData = createAsyncThunk(
  "/dashboard/get/movies",
  async () => {
    try {
      const response = await axiosInstance.get("/admin/movies-stats");
      return response.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

export const getSeriesData = createAsyncThunk(
  "/dashboard/get/series",
  async () => {
    try {
      const response = await axiosInstance.get("/admin/series-stats");
      return response.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

export const getUsersData = createAsyncThunk(
  "/dashboard/get/users",
  async () => {
    try {
      const response = await axiosInstance.get("/admin/users-stats");
      return response.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //for moviesCount
      .addCase(getMoviesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMoviesData.fulfilled, (state, action) => {
        state.moviesCount = action?.payload;
        state.loading = false;
      })
      .addCase(getMoviesData.rejected, (state) => {
        state.loading = false;
      })
      //for seriesCount
      .addCase(getSeriesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSeriesData.fulfilled, (state, action) => {
        state.seriesCount = action?.payload;
        state.loading = false;
      })
      .addCase(getSeriesData.rejected, (state) => {
        state.loading = false;
      })

      //for usersCount
      .addCase(getUsersData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.usersData = action?.payload;
        state.loading = false;
      })
      .addCase(getUsersData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
