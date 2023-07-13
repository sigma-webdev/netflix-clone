import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  loading: false,
  updateLoader: false,
  allPlans: [],
};

export const getAllPlans = createAsyncThunk(
  "adminPlans/getAllPlans",
  async () => {
    try {
      let response = await axiosInstance.get("/payment/plan/");
      console.log(response?.data?.data, "getAllPlans");
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to load data");
    }
  }
);

export const createPlan = createAsyncThunk(
  "adminPlans/createPlan",
  async ({ planName, amount, description, active }, { dispatch }) => {
    try {
      let response = await axiosInstance.post("/payment/plan", {
        planName,
        amount,
        description,
        active,
      });
      dispatch(getAllPlans());
      console.log(response.data.data);
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to create plan");
    }
  }
);

export const updatePlanStatus = createAsyncThunk(
  "adminPlans/updatePlanStatus",
  async ({ id, active }, { dispatch }) => {
    try {
      let response = await axiosInstance.patch("/payment/plan/" + id, {
        active,
      });
      return response?.data?.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to update plan status");
    }
  }
);

export const deletePlan = createAsyncThunk(
  "adminPlans/deletePlan",
  async (id, { dispatch }) => {
    try {
      let response = axiosInstance.delete("/payment/plan/" + id);
      // dispatch(getAllPlans());
      console.log(response, "delete");
      return { res: response.data, id };
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to delete plan");
    }
  }
);

const adminPlansSlice = createSlice({
  name: "Plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all plans
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
      //  update plan
      .addCase(updatePlanStatus.pending, (state) => {
        state.updateLoader = true;
      })
      .addCase(updatePlanStatus.fulfilled, (state, action) => {
        state.updateLoader = false;
        const updatedId = action.payload._id;
        state.allPlans = state.allPlans.map((plan) =>
          updatedId === plan._id ? action.payload : plan
        );
        toast.success(
          `Plan ${
            action?.payload?.active ? "enabled" : "disabled"
          } successfully`
        );
      })
      .addCase(updatePlanStatus.rejected, (state) => {
        state.updatePlan = false;
        state.updateLoader = false;
      })
      // add plan
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.allPlans = [...state.allPlans, action.payload];
        toast.success("Plan Added Successfully");
      })
      .addCase(createPlan.rejected, (state) => {
        state.loading = false;
      })
      // delete plan
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, "payload");
        // const deleteId = action.payload.id;
        // state.allPlans = state.allPlans.filter();
        toast.success("Plan Deleted Successfully");
      })
      .addCase(deletePlan.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default adminPlansSlice.reducer;
