import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { content } from "../data";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  allContent: [],
  watchContent: null,
  loading: false,
  contentLoading: true,
};

export const fetchContentById = createAsyncThunk(
  "content/fetchContentById",
  async (contentId, { rejectWithValue }) => {
    console.log("hhh");
    try {
      const response = await axiosInstance.get(`/content/posts/${contentId}`);
      const data = response.data.contentData;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    try {
      const response = await axiosInstance.get("/content/posts");

      const data = response.data.contents;
      return data;
    } catch (error) {
      console.error(error);
    }
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
      })
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.allContent = [...action.payload];
        state.loading = false;
      })
      .addCase(fetchContent.rejected, (state) => {
        state.allContent = [];
        state.loading = false;
      })
      .addCase(fetchContentById.pending, (state) => {
        state.contentLoading = true;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.watchContent = action.payload;
        state.contentLoading = false;
      })
      .addCase(fetchContentById.rejected, (state) => {
        state.watchContent = null;
        state.contentLoading = false;
      });
  },
});

//export const {} = contentSlice.actions;
export default contentSlice.reducer;
