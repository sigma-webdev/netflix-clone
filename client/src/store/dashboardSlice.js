import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  moviesData: [],
  seriesData: [],
  userData: [],
};

export const getMoviesData= createAsyncThunk('/dashboard/get/movies', async()=>{
    try {
        const response = await axiosInstance.get("/admin/movies-stats");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})



const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMoviesData.pending,(state)=>{
         state.loading= true
    })
    .addCase(getMoviesData.fulfilled,(state,action)=>{
        console.log(action?.payload?.data)
        state.moviesData= action?.payload?.data
        state.loading= false
    })
    .addCase(getMoviesData.rejected,(state)=>{
        state.loading= false
    })
  },
});

export const {} = adminSlice.actions
export default adminSlice.reducer