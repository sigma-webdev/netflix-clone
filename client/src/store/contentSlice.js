import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { content } from "../data";
import axiosInstance from "../helpers/axiosInstance";
import { convertResponseToContentObject } from "../helpers/constants";

const initialState = {
  allContent: [],
  currentContent: null,
  filteredContent: [],
  trendingContent: [],
  latestContent: [],
  trendingContentLoading: [],
  latestContentLoading: false,
  loading: false,
};

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/contents?contentType=movie");

      const data = response.data.data.contents;
      const contentsObject = data.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentsObject;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentById = createAsyncThunk(
  "content/fetchContentById",
  async ({ contentId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/contents/${contentId}`);
      const data = response.data.data;
      const contentObject = convertResponseToContentObject(data, userId);

      return contentObject;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentBySearch = createAsyncThunk(
  "content/fetchContentBySearch",
  async ({ searchText, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/contents?search=${searchText}`
      );

      const data = response.data.data.contents;
      const contentsObject = data.map((item) => {
        return convertResponseToContentObject(item, userId);
      });
      return contentsObject;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentByContentType = createAsyncThunk(
  "content/fetchContentByCategory",
  async ({ contentType, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/contents?contentType=${contentType}`
      );

      const data = response.data.data.contents;

      const contentsObject = data.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentsObject;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentByTrending = createAsyncThunk(
  "content/fetchContentByTrending",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/contents?trending=true");

      const data = response.data.data.contents;
      const contentsObject = data.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentsObject;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentByLatest = createAsyncThunk(
  "content/fetchContentByLatest",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/contents?latest=true");

      const data = response.data.data.contents;
      const contentsObject = data.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentsObject;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewContent = createAsyncThunk(
  "content/addNewContent",
  async (newContent, { rejectWithValue }) => {
    console.log("reached", newContent);
    try {
      const response = await axiosInstance.post(`/contents`, newContent);
      const data = response.data.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateContentById = createAsyncThunk(
  "content/updateContentById",
  async ({ id, sentFormData }, { rejectWithValue }) => {
    let progress = 0;
    console.log("called updar", sentFormData, "//////", id);
    try {
      const response = await axiosInstance.put(
        `/contents/${id}`,
        sentFormData,
        {
          onUploadProgress: (progressEvent) => {
            progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
          },
        }
      );
      const data = response.data.data;

      return { ...data, progress };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContentById = createAsyncThunk(
  "content/deleteContentById",
  async (contentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/contents/${contentId}`);
      const data = response.data.contentData;

      return { data, contentId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeContent = createAsyncThunk(
  "content/likeContent",
  async ({ contentId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/contents/${contentId}/like`);

      const data = response.data.data;

      const contentObject = convertResponseToContentObject(data, userId);
      const contenId = data._id;

      return { contenId, contentObject };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dislikeContent = createAsyncThunk(
  "content/dislikeContent",
  async ({ contentId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/contents/${contentId}/dislike`
      );

      const data = response.data.data;
      const contentObject = convertResponseToContentObject(data, userId);
      const contenId = data._id;

      return { contenId, contentObject };
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
        state.allContent = action.payload;
        state.filteredContent = action.payload;
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
        state.currentContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContentById.rejected, (state) => {
        state.currentContent = null;
        state.loading = false;
      })

      .addCase(fetchContentByContentType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContentByContentType.fulfilled, (state, action) => {
        state.filteredContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContentByContentType.rejected, (state) => {
        state.filteredContent = [];
        state.loading = false;
      })

      //fetch content by search
      .addCase(fetchContentBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContentBySearch.fulfilled, (state, action) => {
        state.filteredContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContentBySearch.rejected, (state) => {
        state.filteredContent = [];
        state.loading = false;
      })

      //fetch content by trending
      .addCase(fetchContentByTrending.pending, (state) => {
        state.trendingContentLoading = true;
      })
      .addCase(fetchContentByTrending.fulfilled, (state, action) => {
        state.trendingContent = action.payload;
        state.trendingContentLoading = false;
      })
      .addCase(fetchContentByTrending.rejected, (state) => {
        state.trendingContent = [];
        state.trendingContentLoading = false;
      })

      //fetch content by latest
      .addCase(fetchContentByLatest.pending, (state) => {
        state.latestContentLoading = true;
      })
      .addCase(fetchContentByLatest.fulfilled, (state, action) => {
        state.latestContent = action.payload;
        state.latestContentLoading = false;
      })
      .addCase(fetchContentByLatest.rejected, (state) => {
        state.latestContent = [];
        state.latestContentLoading = false;
      })
      // add new content

      .addCase(addNewContent.pending, (state) => {
        state.contentLoading = true;
      })
      .addCase(addNewContent.fulfilled, (state, action) => {
        state.allContent = [...state.allContent, action.payload];
        state.contentLoading = false;
      })
      .addCase(addNewContent.rejected, (state) => {
        state.currentContent = null;
        state.contentLoading = false;
      })

      // delete content by id
      .addCase(deleteContentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContentById.fulfilled, (state, action) => {
        const deletedContentId = action.payload.contentId;
        const filteredContent = state.allContent.filter(
          (item) => item._id !== deletedContentId
        );
        state.allContent = filteredContent;
        state.loading = false;
      })
      .addCase(deleteContentById.rejected, (state) => {
        state.allContent = [];
        state.loading = false;
      })

      // update content by id
      .addCase(updateContentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContentById.fulfilled, (state, action) => {
        const updatedContent = action.payload;
        const newAllContent = state.allContent.map((content) =>
          content._id === updatedContent._id ? updatedContent : content
        );
        state.allContent = newAllContent;
        state.loading = false;
      })
      .addCase(updateContentById.rejected, (state) => {
        state.allContent = [];
        state.loading = false;
      })

      //like content
      .addCase(likeContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        const likedContentId = action.payload.contenId;
        const likedContent = action.payload.contentObject;
        const newAllContent = state.filteredContent.map((content) =>
          content.contentId === likedContentId ? likedContent : content
        );

        state.filteredContent = newAllContent;
        state.loading = false;
      })
      .addCase(likeContent.rejected, (state) => {
        state.loading = false;
      })

      //dislike content
      .addCase(dislikeContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(dislikeContent.fulfilled, (state, action) => {
        const dislikedContentId = action.payload.contenId;
        const dislikedContent = action.payload.contentObject;

        const newAllContent = state.filteredContent.map((content) =>
          content.contentId === dislikedContentId ? dislikedContent : content
        );

        state.filteredContent = newAllContent;
        state.loading = false;
      })
      .addCase(dislikeContent.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default contentSlice.reducer;
