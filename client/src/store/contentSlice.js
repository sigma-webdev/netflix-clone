import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { content } from "../data";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  allContent: [],
  filteredContent: [],
  watchContent: null,
  loading: true,
};

export const fetchContentBySearch = createAsyncThunk(
  "content/fetchContentByCategory",
  async (searchText, { rejectWithValue }) => {
    try {
      console.log("dsad");
      const response = await axiosInstance.get(
        `/content/posts?search=${searchText}`
      );

      console.log("dsad", response.data.contentData);
      const data = response.data.contentData;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentByCategory = createAsyncThunk(
  "content/fetchContentByCategory",

  async (category, { rejectWithValue }) => {
    try {
      console.log("dsad");
      const response = await axiosInstance.get(
        `/content/posts?category=${category}`
      );

      console.log("dsad", response.data.contentData);
      const data = response.data.contentData;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentById = createAsyncThunk(
  "content/fetchContentById",
  async (contentId, { rejectWithValue }) => {
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
  async (rejectWithValue) => {
    try {
      const response = await axiosInstance.get("/content/posts");

      const data = response.data.contents;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch all content
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

      //fetch content by id
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.watchContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContentById.rejected, (state) => {
        state.watchContent = null;
        state.loading = false;
      })

      //fetch content by category
      .addCase(fetchContentByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContentByCategory.fulfilled, (state, action) => {
        state.filteredContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContentByCategory.rejected, (state) => {
        state.filteredContent = [];
        state.loading = false;
      });
  },
});

//export const {} = contentSlice.actions;
export default contentSlice.reducer;
