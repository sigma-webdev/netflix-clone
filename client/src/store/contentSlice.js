import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { content } from "../data";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  allContent: [],
  loading: false,
};

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    try {
      const response = await axiosInstance.get("/content/posts");
      console.log(response.data.contents);
      const data = response.data.contents;
      return data;
    } catch (error) {
      console.error(error);
    }
    // const data = content;
    // return data;
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.allContent = [...action.payload];
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(fetchContent.rejected, (state) => {
        state.loading = false;
        state.movies = [];
      });
  },
});

//export const {} = contentSlice.actions;
export default contentSlice.reducer;
