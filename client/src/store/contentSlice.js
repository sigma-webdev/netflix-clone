import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import { convertResponseToContentObject } from "../helpers/constants";

const initialState = {
  currentContent: null,
  searchContent: null,
  allContent: [],
  trendingContent: [],
  latestContent: [],
  mostLikedContent: [],
  contentByCountryOrigin: {},
  watchHistoryContent: [],
  watchListContent: [],
  loading: false,
  searchLoading: false,
  trendingContentLoading: false,
  latestContentLoading: false,
  mostLikedContentLoading: false,
  countryOriginContentLoading: false,
  watchHistoryLoading: false,
  watchListLoading: false,
  likeDisLikeLoading: false,
};

// fetch all content
export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get("/contents");

      const contentResponseArray = response.data?.data?.contents;
      console.log(contentResponseArray);
      const contentNormalizedArray = contentResponseArray?.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentNormalizedArray;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message || "Failed to load content data";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// fetch content by id
export const fetchContentById = createAsyncThunk(
  "content/fetchContentById",
  async ({ contentId, userId }) => {
    try {
      const response = await axiosInstance.get(`/contents/${contentId}`);
      const contentResponseObject = response.data.data;
      const contentNormalizedObject = convertResponseToContentObject(
        contentResponseObject,
        userId
      );

      return contentNormalizedObject;
    } catch (error) {
      const errMessage =
        error?.response?.data?.message || "Failed to load content data by id";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// fetch content by search text
export const fetchContentBySearch = createAsyncThunk(
  "content/fetchContentBySearch",
  async ({ searchText, userId }) => {
    try {
      if (!searchText) {
        return null;
      }

      const response = await axiosInstance.get(
        `/contents?search=${searchText}`
      );
      const contentResponseArray = response.data.data?.contents;
      const contentNormalizedArray = contentResponseArray?.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentNormalizedArray;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message ||
        "Failed to load content data by search";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// fetch trending content
export const fetchContentByTrending = createAsyncThunk(
  "content/fetchContentByTrending",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get("/contents?trending=true");

      const contentResponseArray = response.data.data?.contents;
      const contentNormalizedArray = contentResponseArray?.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentNormalizedArray;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message || "Failed to load trending content";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// fetch latest content
export const fetchContentByLatest = createAsyncThunk(
  "content/fetchContentByLatest",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get("/contents?latest=true");

      const contentResponseArray = response.data.data?.contents;
      const contentNormalizedArray = contentResponseArray?.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentNormalizedArray;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message || "Failed to load latest content";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// fetch mostLiked content
export const fetchContentByMostLiked = createAsyncThunk(
  "content/fetchContentByMostLiked",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get("/contents?mostLikes=true");

      const contentResponseArray = response.data.data?.contents;
      const contentNormalizedArray = contentResponseArray?.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentNormalizedArray;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message || "Failed to load Most Like content";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// fetch content by country origin
export const fetchContentByCountryOrigin = createAsyncThunk(
  "content/fetchContentByCountryOrigin",
  async ({ countryOrigin, userId }) => {
    try {
      const response = await axiosInstance.get(
        `/contents?originCountry=${countryOrigin}`
      );

      const contentResponseArray = response.data.data?.contents;
      const contentNormalizedArray = contentResponseArray?.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return { countryOrigin, contentNormalizedArray };
    } catch (error) {
      let errMessage =
        error?.response?.data?.message ||
        "Failed to load country origin content";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// fetch watch history content
export const fetchContentByWatchHistory = createAsyncThunk(
  "content/fetchContentByWatchHistory",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get(`/users/watch-history`);

      const contentResponseArray = response.data.data?.contents;
      const contentNormalizedArray = contentResponseArray?.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentNormalizedArray;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message ||
        "Failed to load watch history content";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// add content to watch history
export const addContentToWatchHistory = createAsyncThunk(
  "content/addContentToWatchHistory",
  async ({ contentId }) => {
    try {
      await axiosInstance.patch(`/users/watch-history/${contentId}`);

      return contentId;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message ||
        "Failed to add content to watch history";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// fetch watch list content
export const fetchContentByWatchList = createAsyncThunk(
  "content/fetchContentByWatchList",
  async ({ userId }) => {
    try {
      const response = await axiosInstance.get(`/users/watch-list`);

      const contentResponseArray = response.data.data?.contents;
      const contentNormalizedArray = contentResponseArray?.map((item) => {
        return convertResponseToContentObject(item, userId);
      });

      return contentNormalizedArray;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message || "Failed to fetch watch list content";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// add content to watch list
export const addContentToWatchList = createAsyncThunk(
  "content/addContentToWatchList",
  async ({ contentId }) => {
    try {
      await axiosInstance.patch(`/users/watch-list/${contentId}`);

      return contentId;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message || "Failed to add content to watch list";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// delete content to watch list
export const removeContentFromWatchList = createAsyncThunk(
  "content/removeContentFromWatchList",
  async ({ contentId }) => {
    try {
      await axiosInstance.delete(`/users/watch-list/${contentId}`);

      return contentId;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message ||
        "Failed to remove content from watch list";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// like content
export const likeContent = createAsyncThunk(
  "content/likeContent",
  async ({ contentId, userId }) => {
    try {
      const response = await axiosInstance.patch(`/contents/${contentId}/like`);

      const contentResponseObject = response.data.data;
      const contentNormalizedObject = convertResponseToContentObject(
        contentResponseObject,
        userId
      );

      return contentNormalizedObject;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message || "Failed to like content";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

// dislike content
export const dislikeContent = createAsyncThunk(
  "content/dislikeContent",
  async ({ contentId, userId }) => {
    try {
      const response = await axiosInstance.patch(
        `/contents/${contentId}/dislike`
      );

      const contentResponseObject = response.data.data;
      const contentNormalizedObject = convertResponseToContentObject(
        contentResponseObject,
        userId
      );

      return contentNormalizedObject;
    } catch (error) {
      let errMessage =
        error?.response?.data?.message || "Failed to dislike content";
      console.log(errMessage);
      return errMessage;
      // ? toast.error(error?.response?.data?.message)
      // : toast.error("Failed to load data");
    }
  }
);

//content slice
export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Store all content
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.allContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContent.rejected, (state) => {
        state.allContent = [];
        state.loading = false;
      })

      // Store content by id
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

      // Store search content
      .addCase(fetchContentBySearch.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(fetchContentBySearch.fulfilled, (state, action) => {
        state.searchContent = action.payload;
        state.searchLoading = false;
      })
      .addCase(fetchContentBySearch.rejected, (state) => {
        state.searchContent = null;
        state.searchLoading = false;
      })

      // Store trending content
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

      // Store latest content
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

      // Store mostliked content
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

      // Store country origin content
      .addCase(fetchContentByCountryOrigin.pending, (state) => {
        state.countryOriginContentLoading = true;
      })
      .addCase(fetchContentByCountryOrigin.fulfilled, (state, action) => {
        const countryOrigin = action.payload?.countryOrigin;
        const currentContent = state.contentByCountryOrigin;
        const updatedOriginContent = action.payload?.contentNormalizedArray;

        const updatedContent = {
          ...currentContent,
          [countryOrigin]: updatedOriginContent,
        };

        state.contentByCountryOrigin = updatedContent;
        state.countryOriginContentLoading = false;
      })
      .addCase(fetchContentByCountryOrigin.rejected, (state) => {
        state.contentByCountryOrigin = {};
        state.countryOriginContentLoading = false;
      })

      // Store watch history content
      .addCase(fetchContentByWatchHistory.pending, (state) => {
        state.watchHistoryLoading = true;
      })
      .addCase(fetchContentByWatchHistory.fulfilled, (state, action) => {
        state.watchHistoryContent = action.payload;
        state.watchHistoryLoading = false;
      })
      .addCase(fetchContentByWatchHistory.rejected, (state) => {
        state.watchHistoryContent = [];
        state.watchHistoryLoading = false;
      })

      // Add watch history content
      .addCase(addContentToWatchHistory.pending, (state) => {
        state.watchHistoryLoading = true;
      })
      .addCase(addContentToWatchHistory.fulfilled, (state, action) => {
        const watchContentId = action.payload;

        const isWatchContentExists = state.watchHistoryContentM?.find(
          (item) => item.contentId === watchContentId
        );

        if (!isWatchContentExists) {
          const watchContent = state.allContent?.find(
            (item) => item.contentId === watchContentId
          );

          if (!watchContent) {
            state.watchHistoryContent.push(watchContent);
          }
        }

        state.watchHistoryLoading = false;
      })
      .addCase(addContentToWatchHistory.rejected, (state) => {
        state.watchHistoryContent = [];
        state.watchHistoryLoading = false;
      })

      // Store watch list content
      .addCase(fetchContentByWatchList.pending, (state) => {
        state.watchListLoading = true;
      })
      .addCase(fetchContentByWatchList.fulfilled, (state, action) => {
        state.watchListContent = action.payload;
        state.watchListLoading = false;
      })
      .addCase(fetchContentByWatchList.rejected, (state) => {
        state.watchListContent = [];
        state.watchListLoading = false;
      })

      // Add watch list content
      .addCase(addContentToWatchList.pending, (state) => {
        state.watchListLoading = true;
      })
      .addCase(addContentToWatchList.fulfilled, (state, action) => {
        const watchContentId = action.payload;

        const isWatchContentExists = state.watchListContent?.find(
          (item) => item.contentId === watchContentId
        );

        if (!isWatchContentExists) {
          const watchContent = state.allContent?.find(
            (item) => item.contentId === watchContentId
          );

          if (watchContent) {
            state.watchListContent.push(watchContent);
          }
        }

        state.watchListLoading = false;
      })
      .addCase(addContentToWatchList.rejected, (state) => {
        state.watchListContent = [];
        state.watchListLoading = false;
      })

      // Delete watch list content
      .addCase(removeContentFromWatchList.pending, (state) => {
        state.watchListLoading = true;
      })
      .addCase(removeContentFromWatchList.fulfilled, (state, action) => {
        const removedWatchContentId = action.payload;

        state.watchListContent = state.watchListContent.filter(
          (item) => item.contentId !== removedWatchContentId
        );

        state.watchListLoading = false;
      })
      .addCase(removeContentFromWatchList.rejected, (state) => {
        state.watchListContent = [];
        state.watchListLoading = false;
      })

      // Update liked content in store
      .addCase(likeContent.pending, (state) => {
        state.likeDisLikeLoading = true;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        const likedContent = action.payload;

        const newAllContent = state.allContent?.map((content) =>
          content.contentId === likedContent.contentId ? likedContent : content
        );

        const newLatestContent = state.latestContent?.map((content) =>
          content.contentId === likedContent.contentId ? likedContent : content
        );

        const newtrendingContent = state.trendingContent?.map((content) =>
          content.contentId === likedContent.contentId ? likedContent : content
        );

        const newMostLikedContent = state.mostLikedContent?.map((content) =>
          content.contentId === likedContent.contentId ? likedContent : content
        );

        const newSearchedContent = state.searchContent?.map((content) =>
          content.contentId === likedContent.contentId ? likedContent : content
        );

        const newContentByCountryOrigin = {};
        // eslint-disable-next-line array-callback-return
        Object.keys(state.contentByCountryOrigin)?.map((countryOrigin) => {
          newContentByCountryOrigin[countryOrigin] =
            state.contentByCountryOrigin[countryOrigin]?.map((content) =>
              content.contentId === likedContent.contentId
                ? likedContent
                : content
            );
        });

        const newWatchHistoryContent = state.watchHistoryContent?.map(
          (content) =>
            content.contentId === likedContent.contentId
              ? likedContent
              : content
        );

        const newWatchListContent = state?.watchListContent?.map((content) =>
          content.contentId === likedContent.contentId ? likedContent : content
        );

        state.allContent = newAllContent;
        state.latestContent = newLatestContent;
        state.trendingContent = newtrendingContent;
        state.mostLikedContent = newMostLikedContent;
        state.contentByCountryOrigin = newContentByCountryOrigin;
        state.watchHistoryContent = newWatchHistoryContent;
        state.watchListContent = newWatchListContent;
        state.searchContent = newSearchedContent;
        state.likeDisLikeLoading = false;
      })
      .addCase(likeContent.rejected, (state) => {
        state.likeDisLikeLoading = false;
      })

      // Update disliked content in store
      .addCase(dislikeContent.pending, (state) => {
        state.likeDisLikeLoading = true;
      })
      .addCase(dislikeContent.fulfilled, (state, action) => {
        const dislikedContent = action.payload;

        const newallContent = state.allContent?.map((content) =>
          content.contentId === dislikedContent.contentId
            ? dislikedContent
            : content
        );

        const newLatestContent = state.latestContent?.map((content) =>
          content.contentId === dislikedContent.contentId
            ? dislikedContent
            : content
        );

        const newtrendingContent = state.trendingContent?.map((content) =>
          content.contentId === dislikedContent.contentId
            ? dislikedContent
            : content
        );

        const newMostLikedContent = state.mostLikedContent?.map((content) =>
          content.contentId === dislikedContent.contentId
            ? dislikedContent
            : content
        );

        const newSearchedContent = state.searchContent?.map((content) =>
          content.contentId === dislikedContent.contentId
            ? dislikedContent
            : content
        );

        const newContentByCountryOrigin = {};
        // eslint-disable-next-line array-callback-return
        Object.keys(state.contentByCountryOrigin)?.map((countryOrigin) => {
          newContentByCountryOrigin[countryOrigin] =
            state.contentByCountryOrigin[countryOrigin]?.map((content) =>
              content.contentId === dislikedContent.contentId
                ? dislikedContent
                : content
            );
        });

        const newWatchHistoryContent = state.watchHistoryContent?.map(
          (content) =>
            content.contentId === dislikedContent.contentId
              ? dislikedContent
              : content
        );

        const newWatchListContent = state.watchListContent?.map((content) =>
          content.contentId === dislikedContent.contentId
            ? dislikedContent
            : content
        );

        state.allContent = newallContent;
        state.latestContent = newLatestContent;
        state.trendingContent = newtrendingContent;
        state.mostLikedContent = newMostLikedContent;
        state.contentByCountryOrigin = newContentByCountryOrigin;
        state.watchHistoryContent = newWatchHistoryContent;
        state.watchListContent = newWatchListContent;
        state.searchContent = newSearchedContent;
        state.likeDisLikeLoading = false;
      })
      .addCase(dislikeContent.rejected, (state) => {
        state.likeDisLikeLoading = false;
      });
  },
});

export default contentSlice.reducer;
