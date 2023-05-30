import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { content } from "../data";

const initialState = {
  allContent: [],
};

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const data = content;
    return data;
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.allContent = action.payload;
    });
  },
});

//export const {} = contentSlice.actions;
export default contentSlice.reducer;
