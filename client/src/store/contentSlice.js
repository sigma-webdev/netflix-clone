import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import { convertResponseToContentObject } from "../helpers/constants";

const initialState = {
  currentContent: null,
  allContent: [],
  searchContent: [],
  filteredContent: [],
  trendingContent: [],
  latestContent: [],
  mostLikedContent: [],
  contentByCountryOrigin: {},
  watchedContent: [],
  loading: false,
  trendingContentLoading: false,
  latestContentLoading: false,
  mostLikedContentLoading: false,
  countryOriginContentLoading: false,
  watchContentLoading: false,
  likeDisLikeLoading: false,
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
      const url = `/contents?search=${searchText}`;
      let contentsObject;

      if (!searchText) {
        return [];
      } else {
        const response = await axiosInstance.get(url);

        const data = response.data.data.contents;
        contentsObject = data.map((item) => {
          return convertResponseToContentObject(item, userId);
        });
      }

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

export const fetchContentByMostLiked = createAsyncThunk(
  "content/fetchContentByMostLiked",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/contents?mostLikes=true");

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

export const fetchContentByCountryOrigin = createAsyncThunk(
  "content/fetchContentByCountryOrigin",
  async ({ countryOrigin, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/contents?originCountry=${countryOrigin}`
      );

      const data = response.data.data.contents;
      const contentsObject = data.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return { countryOrigin, contentsObject };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentByWatch = createAsyncThunk(
  "content/fetchContentByWatch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/watch-history`);

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

      //fetch content by contentType
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
        state.searchContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContentBySearch.rejected, (state) => {
        state.searchContent = [];
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

      //fetch content by most liked
      .addCase(fetchContentByMostLiked.pending, (state) => {
        state.mostLikedContentLoading = true;
      })
      .addCase(fetchContentByMostLiked.fulfilled, (state, action) => {
        state.mostLikedContent = action.payload;
        state.mostLikedContentLoading = false;
      })
      .addCase(fetchContentByMostLiked.rejected, (state) => {
        state.mostLikedContent = [];
        state.mostLikedContentLoading = false;
      })

      //fetch content by country origin
      .addCase(fetchContentByCountryOrigin.pending, (state) => {
        state.countryOriginContentLoading = true;
      })
      .addCase(fetchContentByCountryOrigin.fulfilled, (state, action) => {
        const countryOrigin = action.payload.countryOrigin;
        const currentContent = state.contentByCountryOrigin;

        const updatedContent = {
          ...currentContent,
          [countryOrigin]: action.payload.contentsObject,
        };

        state.contentByCountryOrigin = updatedContent;
        state.countryOriginContentLoading = false;
      })
      .addCase(fetchContentByCountryOrigin.rejected, (state) => {
        state.contentByCountryOrigin = {};
        state.countryOriginContentLoading = false;
      })

      //fetch watch content
      .addCase(fetchContentByWatch.pending, (state) => {
        state.watchContentLoading = true;
      })
      .addCase(fetchContentByWatch.fulfilled, (state, action) => {
        state.watchedContent = action.payload;
        state.watchContentLoading = false;
      })
      .addCase(fetchContentByWatch.rejected, (state) => {
        state.watchedContent = [];
        state.watchContentLoading = false;
      })

      //like content
      .addCase(likeContent.pending, (state) => {
        state.likeDisLikeLoading = true;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        const likedContentId = action.payload.contenId;
        const likedContent = action.payload.contentObject;

        const newFilteredContent = state.filteredContent.map((content) =>
          content.contentId === likedContentId ? likedContent : content
        );

        const newLatestContent = state.latestContent.map((content) =>
          content.contentId === likedContentId ? likedContent : content
        );

        const newtrendingContent = state.trendingContent.map((content) =>
          content.contentId === likedContentId ? likedContent : content
        );

        const newMostLikedContent = state.mostLikedContent.map((content) =>
          content.contentId === likedContentId ? likedContent : content
        );

        const newContentByCountryOrigin = {};
        Object.keys(state.contentByCountryOrigin).map((countryOrigin) => {
          newContentByCountryOrigin[countryOrigin] =
            state.contentByCountryOrigin[countryOrigin].map((content) =>
              content.contentId === likedContentId ? likedContent : content
            );
        });

        state.filteredContent = newFilteredContent;
        state.latestContent = newLatestContent;
        state.trendingContent = newtrendingContent;
        state.mostLikedContent = newMostLikedContent;
        state.contentByCountryOrigin = newContentByCountryOrigin;
        state.likeDisLikeLoading = false;
      })
      .addCase(likeContent.rejected, (state) => {
        state.likeDisLikeLoading = false;
      })

      //dislike content
      .addCase(dislikeContent.pending, (state) => {
        state.likeDisLikeLoading = true;
      })
      .addCase(dislikeContent.fulfilled, (state, action) => {
        const dislikedContentId = action.payload.contenId;
        const dislikedContent = action.payload.contentObject;

        const newFilteredContent = state.filteredContent.map((content) =>
          content.contentId === dislikedContentId ? dislikedContent : content
        );

        const newLatestContent = state.latestContent.map((content) =>
          content.contentId === dislikedContentId ? dislikedContent : content
        );

        const newtrendingContent = state.trendingContent.map((content) =>
          content.contentId === dislikedContentId ? dislikedContent : content
        );

        const newMostLikedContent = state.mostLikedContent.map((content) =>
          content.contentId === dislikedContentId ? dislikedContent : content
        );

        const newContentByCountryOrigin = {};
        Object.keys(state.contentByCountryOrigin).map((countryOrigin) => {
          newContentByCountryOrigin[countryOrigin] =
            state.contentByCountryOrigin[countryOrigin].map((content) =>
              content.contentId === dislikedContentId
                ? dislikedContent
                : content
            );
        });

        state.filteredContent = newFilteredContent;
        state.latestContent = newLatestContent;
        state.trendingContent = newtrendingContent;
        state.mostLikedContent = newMostLikedContent;
        state.contentByCountryOrigin = newContentByCountryOrigin;
        state.likeDisLikeLoading = false;
      })
      .addCase(dislikeContent.rejected, (state) => {
        state.likeDisLikeLoading = false;
      });
  },
});

export default contentSlice.reducer;
