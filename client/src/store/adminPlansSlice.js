import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  loading: false,
  allPlans: [],
};
export const getAllPlans = createAsyncThunk(
  "/plans",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.get("/payment/plan/");
      console.log(response, "allPlans");
      return response?.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
    }
  }
);

const adminPlansSlice = createSlice({
  name: "Plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //
      .addCase(getAllPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.allPlans = action.payload;
      })
      .addCase(getAllPlans.rejected, (state) => {
        state.loading = false;
        state.allPlans = [];
      });
  },
});

export default adminPlansSlice.reducer;
