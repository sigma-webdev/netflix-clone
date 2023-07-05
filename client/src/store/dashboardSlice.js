import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
const initialState = {
  loading: false,
  moviesCount: 0,
  seriesCount: 0,
  usersData: {},
  salesStats: 0
};

export const getMoviesData = createAsyncThunk(
  "/dashboard/get/movies",
  async () => {
    try {
      const response = await axiosInstance.get("/admin/movies-stats");
      return response;
    } catch (error) {
      //   return rejectWithValue(error);
    }
  }
);

export const getSeriesData = createAsyncThunk(
  "/dashboard/get/series",
  async () => {
    try {
      const response = await axiosInstance.get("/admin/series-stats");
      console.log(response, "ppp");
      return response;
    } catch (error) {
      //   return rejectWithValue(error);
    }
  }
);

export const getUsersData = createAsyncThunk(
  "/dashboard/get/users",
  async () => {
    try {
      const response = await axiosInstance.get("/admin/users-stats");
     
      return response;
    } catch (error) {
      //   return rejectWithValue(error);
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

// export const {} = adminSlice.actions;
export default dashboardSlice.reducer;
