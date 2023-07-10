import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  loading: false,
  updateLoader: false,
  allPlans: [],
  updatePlan: false,
};
export const getAllPlans = createAsyncThunk(
  "adminPlans/getAllPlans",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.get("/payment/plan/");
      return response?.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
    }
  }
);

export const updatePlanStatus = createAsyncThunk(
  "adminPlans/updatePlanStatus",
  async ({ id, active }, { rejectWithValue, dispatch }) => {
    console.log(id, active);
    try {
      let response = await axiosInstance.patch("/payment/plan/" + id, {
        active,
      });
      console.log(response);
      dispatch(getAllPlans());
      return response.data;
    } catch (error) {
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
      })
      //  update plam
      .addCase(updatePlanStatus.pending, (state) => {
        state.updateLoader = true;
      })
      .addCase(updatePlanStatus.fulfilled, (state, action) => {
        state.updatePlan = action.payload;
        state.updateLoader = false;
      })
      .addCase(updatePlanStatus.rejected, (state) => {
        state.updatePlan = false;
        state.updateLoader = false;
      });
  },
});

export default adminPlansSlice.reducer;
